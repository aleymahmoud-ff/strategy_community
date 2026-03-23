import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { execFileSync } from 'child_process';

export async function POST(request: NextRequest) {
  const { action, secret } = await request.json();

  if (secret !== 'cranl-setup-2026') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    if (action === 'push-schema') {
      const output = execFileSync('npx', ['prisma', 'db', 'push', '--accept-data-loss'], {
        encoding: 'utf-8',
        timeout: 60000,
        env: { ...process.env },
      });
      return NextResponse.json({ success: true, output });
    }

    if (action === 'seed') {
      const output = execFileSync('npx', ['tsx', 'prisma/seed.ts'], {
        encoding: 'utf-8',
        timeout: 30000,
        env: { ...process.env },
      });
      return NextResponse.json({ success: true, output });
    }

    if (action === 'migrate-data') {
      const sourceUrl = process.env.SOURCE_DATABASE_URL;
      if (!sourceUrl) {
        return NextResponse.json({ error: 'SOURCE_DATABASE_URL not set' }, { status: 400 });
      }

      const source = new PrismaClient({ datasources: { db: { url: sourceUrl } } });
      const target = new PrismaClient();

      const existingMembers = await target.member.count();
      if (existingMembers > 0) {
        await source.$disconnect();
        await target.$disconnect();
        return NextResponse.json({ message: `Already has ${existingMembers} members, skipping.` });
      }

      const users = await source.user.findMany();
      for (const u of users) {
        await target.user.upsert({ where: { id: u.id }, update: {}, create: u });
      }

      const members = await source.member.findMany();
      for (const m of members) {
        await target.member.upsert({ where: { id: m.id }, update: {}, create: m });
      }

      const layouts = await source.layout.findMany();
      for (const l of layouts) {
        await target.layout.upsert({ where: { id: l.id }, update: {}, create: l });
      }

      const sections = await source.section.findMany();
      for (const s of sections) {
        await target.section.upsert({ where: { id: s.id }, update: {}, create: s });
      }

      const seats = await source.seat.findMany();
      for (const s of seats) {
        await target.seat.upsert({ where: { id: s.id }, update: {}, create: s });
      }

      const events = await source.event.findMany();
      for (const e of events) {
        await target.event.upsert({ where: { id: e.id }, update: {}, create: e });
      }

      const attendees = await source.eventAttendee.findMany();
      for (const a of attendees) {
        await target.eventAttendee.upsert({ where: { id: a.id }, update: {}, create: a });
      }

      await source.$disconnect();
      await target.$disconnect();

      return NextResponse.json({
        success: true,
        migrated: { users: users.length, members: members.length, layouts: layouts.length, sections: sections.length, seats: seats.length, events: events.length, attendees: attendees.length },
      });
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
