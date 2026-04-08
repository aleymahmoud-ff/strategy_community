import { PrismaClient, AttendeeStatus } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const DATABASE_URL = "postgresql://admin:VeaWXc5nvl5NcAQA4hVYEeoGYsIgompE@38.54.59.226:40000/strategy_community_db";

const prisma = new PrismaClient({
  datasources: { db: { url: DATABASE_URL } },
});

const MEETUP_NAMES = ['Meetup 15', 'Meetup 16', 'Meetup 17', 'Meetup 18', 'Meetup 19'];

function yesCI(val: string): boolean {
  return val.toLowerCase() === 'yes';
}

function deriveFields(row: { invited: string; calendar: string; confirmed: string; came: string }): {
  invited: boolean;
  calendarResponse: boolean;
  confirmed: boolean | null;
  attended: boolean;
  status: AttendeeStatus;
} {
  const invited = true; // all rows are invited
  const calendarResponse = yesCI(row.calendar);
  const attended = yesCI(row.came);

  let confirmed: boolean | null;
  if (calendarResponse) {
    confirmed = yesCI(row.confirmed);
  } else {
    // calendarResponse is false
    if (yesCI(row.confirmed)) {
      confirmed = true;
    } else if (row.confirmed.toLowerCase() === 'no') {
      confirmed = null;
    } else {
      confirmed = null;
    }
  }

  let status: AttendeeStatus;
  if (attended) {
    status = 'ATTENDED';
  } else if (confirmed === true && !attended) {
    status = 'ABSENT';
  } else if (calendarResponse && confirmed !== true) {
    status = 'TENTATIVE';
  } else {
    status = 'INVITED';
  }

  return { invited, calendarResponse, confirmed, attended, status };
}

async function main() {
  const dataPath = path.join(__dirname, '..', 'migration_data.json');
  const rows: Array<{ db_name: string; meetup: string; invited: string; calendar: string; confirmed: string; came: string }> = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

  console.log(`Loaded ${rows.length} attendee records`);

  // Step 1: Look up existing events (do NOT create)
  const eventMap: Record<string, string> = {};
  for (const name of MEETUP_NAMES) {
    const existing = await prisma.event.findFirst({ where: { name } });
    if (existing) {
      console.log(`Found event "${name}" (${existing.id})`);
      eventMap[name] = existing.id;
    } else {
      console.warn(`WARNING: Event "${name}" not found in DB — rows for this event will be skipped`);
    }
  }

  // Step 2: Build member name -> id map
  const allMembers = await prisma.member.findMany({ select: { id: true, name: true } });
  const memberMap: Record<string, string> = {};
  for (const m of allMembers) {
    memberMap[m.name] = m.id;
  }
  console.log(`Loaded ${allMembers.length} members`);

  // Step 3: Upsert attendees with all new fields
  let upserted = 0;
  const errors: string[] = [];

  for (const row of rows) {
    const memberId = memberMap[row.db_name];
    const eventId = eventMap[row.meetup];

    if (!memberId) {
      errors.push(`Member not found: "${row.db_name}"`);
      continue;
    }
    if (!eventId) {
      errors.push(`Event not found: "${row.meetup}"`);
      continue;
    }

    const fields = deriveFields(row);

    try {
      await prisma.eventAttendee.upsert({
        where: { memberId_eventId: { memberId, eventId } },
        update: {
          status: fields.status,
          invited: fields.invited,
          calendarResponse: fields.calendarResponse,
          confirmed: fields.confirmed,
          attended: fields.attended,
        },
        create: {
          memberId,
          eventId,
          status: fields.status,
          invited: fields.invited,
          calendarResponse: fields.calendarResponse,
          confirmed: fields.confirmed,
          attended: fields.attended,
        },
      });
      upserted++;
    } catch (e: any) {
      errors.push(`Failed for "${row.db_name}" @ "${row.meetup}": ${e.message}`);
    }
  }

  console.log(`\n=== RESULTS ===`);
  console.log(`Attendees upserted: ${upserted}`);
  console.log(`Errors: ${errors.length}`);
  if (errors.length > 0) {
    for (const err of errors) {
      console.log(`  - ${err}`);
    }
  }

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
