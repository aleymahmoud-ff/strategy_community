import { PrismaClient } from '@prisma/client';

const SOURCE_DB_URL = process.env.SOURCE_DATABASE_URL;

if (!SOURCE_DB_URL) {
  console.log('No SOURCE_DATABASE_URL set — skipping data migration.');
  process.exit(0);
}

const source = new PrismaClient({ datasources: { db: { url: SOURCE_DB_URL } } });
const target = new PrismaClient(); // uses DATABASE_URL (Cranl DB)

async function migrate() {
  // Check if target already has data (skip if already migrated)
  const existingMembers = await target.member.count();
  if (existingMembers > 0) {
    console.log(`Target DB already has ${existingMembers} members — skipping migration.`);
    return;
  }

  console.log('Starting data migration from Supabase to Cranl...');

  // 1. Migrate Users (except sessions)
  const users = await source.user.findMany();
  if (users.length > 0) {
    for (const user of users) {
      await target.user.upsert({
        where: { id: user.id },
        update: {},
        create: user,
      });
    }
    console.log(`Migrated ${users.length} users`);
  }

  // 2. Migrate Members
  const members = await source.member.findMany();
  if (members.length > 0) {
    for (const member of members) {
      await target.member.upsert({
        where: { id: member.id },
        update: {},
        create: member,
      });
    }
    console.log(`Migrated ${members.length} members`);
  }

  // 3. Migrate Layouts
  const layouts = await source.layout.findMany();
  if (layouts.length > 0) {
    for (const layout of layouts) {
      await target.layout.upsert({
        where: { id: layout.id },
        update: {},
        create: layout,
      });
    }
    console.log(`Migrated ${layouts.length} layouts`);
  }

  // 4. Migrate Sections
  const sections = await source.section.findMany();
  if (sections.length > 0) {
    for (const section of sections) {
      await target.section.upsert({
        where: { id: section.id },
        update: {},
        create: section,
      });
    }
    console.log(`Migrated ${sections.length} sections`);
  }

  // 5. Migrate Seats
  const seats = await source.seat.findMany();
  if (seats.length > 0) {
    for (const seat of seats) {
      await target.seat.upsert({
        where: { id: seat.id },
        update: {},
        create: seat,
      });
    }
    console.log(`Migrated ${seats.length} seats`);
  }

  // 6. Migrate Events
  const events = await source.event.findMany();
  if (events.length > 0) {
    for (const event of events) {
      await target.event.upsert({
        where: { id: event.id },
        update: {},
        create: event,
      });
    }
    console.log(`Migrated ${events.length} events`);
  }

  // 7. Migrate EventAttendees
  const attendees = await source.eventAttendee.findMany();
  if (attendees.length > 0) {
    for (const attendee of attendees) {
      await target.eventAttendee.upsert({
        where: { id: attendee.id },
        update: {},
        create: attendee,
      });
    }
    console.log(`Migrated ${attendees.length} event attendees`);
  }

  console.log('Data migration complete!');
}

migrate()
  .catch((e) => {
    console.error('Migration failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await source.$disconnect();
    await target.$disconnect();
  });
