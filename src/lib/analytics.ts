import prisma from "@/lib/prisma";

export async function getSummaryStats() {
  const [totalMembers, totalEvents, allAttendees, recentMembers] =
    await Promise.all([
      prisma.member.count(),
      prisma.event.count(),
      prisma.eventAttendee.findMany({
        select: { status: true, memberId: true, eventId: true },
      }),
      prisma.member.count({
        where: {
          joinDate: { gte: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000) },
        },
      }),
    ]);

  const attendedSet = new Set(
    allAttendees.filter((a) => a.status === "ATTENDED").map((a) => a.memberId)
  );

  const events = await prisma.event.findMany({
    orderBy: { date: "desc" },
    take: 3,
    select: { id: true },
  });
  const last3EventIds = new Set(events.map((e) => e.id));
  const activeMembers = new Set(
    allAttendees
      .filter(
        (a) => a.status === "ATTENDED" && last3EventIds.has(a.eventId)
      )
      .map((a) => a.memberId)
  ).size;

  const totalInvited = allAttendees.length;
  const totalAttended = allAttendees.filter(
    (a) => a.status === "ATTENDED"
  ).length;

  return {
    totalMembers,
    totalEvents,
    activeMembers,
    activePct: totalMembers > 0 ? Math.round((activeMembers / totalMembers) * 100 * 10) / 10 : 0,
    avgAttendanceRate:
      totalInvited > 0
        ? Math.round((totalAttended / totalInvited) * 100 * 10) / 10
        : 0,
    conversionRate:
      totalInvited > 0
        ? Math.round((totalAttended / totalInvited) * 100 * 10) / 10
        : 0,
    newMembers90d: recentMembers,
  };
}

export async function getEventAnalytics() {
  const events = await prisma.event.findMany({
    orderBy: { date: "asc" },
    select: {
      id: true,
      name: true,
      date: true,
      attendees: {
        select: { status: true, memberId: true },
      },
    },
  });

  // Track first-time attendees
  const seenMembers = new Set<string>();

  return events.map((event) => {
    const statuses = event.attendees.map((a) => a.status);
    const invited = statuses.length;
    const confirmed = statuses.filter((s) => s === "CONFIRMED").length;
    const attended = statuses.filter((s) => s === "ATTENDED").length;
    const absent = statuses.filter((s) => s === "ABSENT").length;
    const declined = statuses.filter((s) => s === "DECLINED").length;

    // First-timers: members who attended this event but never attended before
    let firstTimers = 0;
    event.attendees.forEach((a) => {
      if (a.status === "ATTENDED" && !seenMembers.has(a.memberId)) {
        firstTimers++;
        seenMembers.add(a.memberId);
      }
    });

    const confirmPlusAttend = confirmed + attended + absent;
    const noShowRate =
      confirmPlusAttend > 0 ? Math.round((absent / confirmPlusAttend) * 100) : 0;
    const attendanceRate =
      invited > 0 ? Math.round((attended / invited) * 100) : 0;

    return {
      name: event.name,
      date: event.date.toISOString().split("T")[0],
      invited,
      confirmed,
      attended,
      absent,
      declined,
      firstTimers,
      noShowRate,
      attendanceRate,
    };
  });
}

export async function getMemberAnalytics() {
  const [members, attendees] = await Promise.all([
    prisma.member.findMany({
      select: {
        id: true,
        name: true,
        company: true,
        membership: true,
        memberType: true,
        guestStatus: true,
      },
    }),
    prisma.eventAttendee.findMany({
      select: { memberId: true, status: true, eventId: true },
    }),
  ]);

  const totalEvents = await prisma.event.count();

  // Membership breakdown
  const membershipBreakdown: Record<string, number> = {};
  const memberTypeBreakdown: Record<string, number> = {};
  const guestStatusBreakdown: Record<string, number> = {};

  members.forEach((m) => {
    const mship = m.membership || "UNKNOWN";
    membershipBreakdown[mship] = (membershipBreakdown[mship] || 0) + 1;

    const mtype = m.memberType || "UNKNOWN";
    memberTypeBreakdown[mtype] = (memberTypeBreakdown[mtype] || 0) + 1;

    const gs = m.guestStatus || "UNKNOWN";
    guestStatusBreakdown[gs] = (guestStatusBreakdown[gs] || 0) + 1;
  });

  // Engagement scores per member
  const memberAttendance: Record<string, { invited: number; attended: number }> = {};
  attendees.forEach((a) => {
    if (!memberAttendance[a.memberId]) {
      memberAttendance[a.memberId] = { invited: 0, attended: 0 };
    }
    memberAttendance[a.memberId].invited++;
    if (a.status === "ATTENDED") memberAttendance[a.memberId].attended++;
  });

  // Engagement distribution
  const buckets = [0, 0, 0, 0, 0]; // 0%, 1-25%, 26-50%, 51-75%, 76-100%
  members.forEach((m) => {
    const data = memberAttendance[m.id];
    if (!data || data.invited === 0) {
      buckets[0]++;
      return;
    }
    const pct = (data.attended / data.invited) * 100;
    if (pct === 0) buckets[0]++;
    else if (pct <= 25) buckets[1]++;
    else if (pct <= 50) buckets[2]++;
    else if (pct <= 75) buckets[3]++;
    else buckets[4]++;
  });

  // Top attendees
  const topAttendees = members
    .map((m) => {
      const data = memberAttendance[m.id] || { invited: 0, attended: 0 };
      return {
        name: m.name,
        company: m.company || "—",
        membership: m.membership,
        eventsAttended: data.attended,
        rate:
          data.invited > 0
            ? Math.round((data.attended / data.invited) * 100)
            : 0,
      };
    })
    .sort((a, b) => b.eventsAttended - a.eventsAttended)
    .slice(0, 20);

  // Least engaged
  const leastEngaged = members
    .map((m) => {
      const data = memberAttendance[m.id] || { invited: 0, attended: 0 };
      // Find last attended event
      const memberEvents = attendees.filter(
        (a) => a.memberId === m.id && a.status === "ATTENDED"
      );
      return {
        name: m.name,
        company: m.company || "—",
        eventsInvited: data.invited,
        eventsAttended: data.attended,
        lastAttended: memberEvents.length > 0 ? "Has attended" : "Never",
      };
    })
    .filter((m) => m.eventsInvited >= 2)
    .sort((a, b) => a.eventsAttended - b.eventsAttended)
    .slice(0, 10);

  // Segment conversion
  const segmentData: Record<string, { invited: number; confirmed: number; attended: number }> = {};
  attendees.forEach((a) => {
    const member = members.find((m) => m.id === a.memberId);
    const seg = member?.membership || "UNKNOWN";
    if (!segmentData[seg]) segmentData[seg] = { invited: 0, confirmed: 0, attended: 0 };
    segmentData[seg].invited++;
    if (a.status === "CONFIRMED" || a.status === "ATTENDED" || a.status === "ABSENT") {
      segmentData[seg].confirmed++;
    }
    if (a.status === "ATTENDED") segmentData[seg].attended++;
  });

  const segmentConversion = Object.entries(segmentData)
    .filter(([key]) => key !== "UNKNOWN")
    .map(([segment, data]) => ({
      segment,
      invitationRate: 100,
      confirmationRate: data.invited > 0 ? Math.round((data.confirmed / data.invited) * 100) : 0,
      attendanceRate: data.invited > 0 ? Math.round((data.attended / data.invited) * 100) : 0,
    }));

  return {
    membershipBreakdown,
    memberTypeBreakdown,
    guestStatusBreakdown,
    engagementBuckets: buckets,
    topAttendees,
    leastEngaged,
    segmentConversion,
  };
}

export async function getHealthMetrics() {
  const [members, events, attendees] = await Promise.all([
    prisma.member.findMany({
      select: { id: true, joinDate: true, guestStatus: true },
      orderBy: { joinDate: "asc" },
    }),
    prisma.event.findMany({
      orderBy: { date: "asc" },
      select: { id: true, name: true, date: true },
    }),
    prisma.eventAttendee.findMany({
      select: { memberId: true, eventId: true, status: true },
    }),
  ]);

  // Growth over time (cumulative by month)
  const growthByMonth: { month: string; total: number }[] = [];
  let cumulative = 0;
  const monthMap = new Map<string, number>();
  members.forEach((m) => {
    const key = `${m.joinDate.getFullYear()}-${String(m.joinDate.getMonth() + 1).padStart(2, "0")}`;
    monthMap.set(key, (monthMap.get(key) || 0) + 1);
  });
  const sortedMonths = [...monthMap.keys()].sort();
  sortedMonths.forEach((month) => {
    cumulative += monthMap.get(month)!;
    growthByMonth.push({ month, total: cumulative });
  });

  // Churn indicators
  const last2Events = events.slice(-2);
  const last2Ids = new Set(last2Events.map((e) => e.id));
  const memberAttendanceMap = new Map<string, Set<string>>();
  attendees.forEach((a) => {
    if (a.status === "ATTENDED") {
      if (!memberAttendanceMap.has(a.memberId)) {
        memberAttendanceMap.set(a.memberId, new Set());
      }
      memberAttendanceMap.get(a.memberId)!.add(a.eventId);
    }
  });

  let atRisk = 0;
  memberAttendanceMap.forEach((eventIds, memberId) => {
    if (eventIds.size >= 2) {
      const attendedLast2 = [...eventIds].some((eid) => last2Ids.has(eid));
      if (!attendedLast2) atRisk++;
    }
  });

  const dropped = members.filter((m) => m.guestStatus === "DROPPED_GUEST").length;
  const churnRate = members.length > 0 ? Math.round(((atRisk + dropped) / members.length) * 100 * 10) / 10 : 0;

  // Repeat attendance rate per event
  const seenBefore = new Set<string>();
  const repeatRates = events.map((event) => {
    const eventAttendees = attendees.filter(
      (a) => a.eventId === event.id && a.status === "ATTENDED"
    );
    const repeats = eventAttendees.filter((a) => seenBefore.has(a.memberId)).length;
    const rate = eventAttendees.length > 0
      ? Math.round((repeats / eventAttendees.length) * 100)
      : 0;
    eventAttendees.forEach((a) => seenBefore.add(a.memberId));
    return { name: event.name, rate };
  });

  // Retention cohort
  const memberFirstEvent = new Map<string, number>();
  events.forEach((event, idx) => {
    const eventAttendees = attendees.filter(
      (a) => a.eventId === event.id && a.status === "ATTENDED"
    );
    eventAttendees.forEach((a) => {
      if (!memberFirstEvent.has(a.memberId)) {
        memberFirstEvent.set(a.memberId, idx);
      }
    });
  });

  const cohortData = events.map((_, cohortIdx) => {
    const cohortMembers = [...memberFirstEvent.entries()]
      .filter(([, firstIdx]) => firstIdx === cohortIdx)
      .map(([mid]) => mid);
    if (cohortMembers.length === 0) return { eventName: events[cohortIdx].name, values: [] };

    const values: number[] = [];
    for (let j = cohortIdx; j < events.length; j++) {
      const eventId = events[j].id;
      const returned = cohortMembers.filter((mid) =>
        attendees.some(
          (a) => a.memberId === mid && a.eventId === eventId && a.status === "ATTENDED"
        )
      ).length;
      values.push(Math.round((returned / cohortMembers.length) * 100));
    }
    return { eventName: events[cohortIdx].name, values };
  });

  // Attendance heatmap (top 30 members by attendance)
  const memberTotals = [...memberAttendanceMap.entries()]
    .map(([mid, eids]) => ({ memberId: mid, count: eids.size }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 30);

  const allMembers = await prisma.member.findMany({
    where: { id: { in: memberTotals.map((m) => m.memberId) } },
    select: { id: true, name: true },
  });

  const memberNameMap = new Map(allMembers.map((m) => [m.id, m.name]));
  const attendeeMap = new Map<string, Map<string, string>>();
  attendees.forEach((a) => {
    if (!attendeeMap.has(a.memberId)) attendeeMap.set(a.memberId, new Map());
    attendeeMap.get(a.memberId)!.set(a.eventId, a.status);
  });

  const heatmapData = memberTotals.map((mt) => ({
    name: memberNameMap.get(mt.memberId) || "Unknown",
    events: events.map((e) => ({
      eventName: e.name,
      status: attendeeMap.get(mt.memberId)?.get(e.id) || null,
    })),
  }));

  return {
    growthByMonth,
    atRisk,
    dropped,
    churnRate,
    repeatRates,
    cohortData,
    heatmapData,
    eventNames: events.map((e) => e.name),
  };
}
