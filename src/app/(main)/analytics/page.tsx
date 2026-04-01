import { getSummaryStats, getEventAnalytics, getMemberAnalytics, getHealthMetrics } from "@/lib/analytics";
import SummaryCards from "@/components/analytics/SummaryCards";
import AnalyticsTabs from "@/components/analytics/AnalyticsTabs";
import AttendanceLineChart from "@/components/analytics/events/AttendanceLineChart";
import StatusBreakdownChart from "@/components/analytics/events/StatusBreakdownChart";
import NoShowRateChart from "@/components/analytics/events/NoShowRateChart";
import FirstTimersChart from "@/components/analytics/events/FirstTimersChart";
import EventComparisonTable from "@/components/analytics/events/EventComparisonTable";
import EngagementDistribution from "@/components/analytics/members/EngagementDistribution";
import MembershipTypePie from "@/components/analytics/members/MembershipTypePie";
import MemberTypePie from "@/components/analytics/members/MemberTypePie";
import GuestFunnelChart from "@/components/analytics/members/GuestFunnelChart";
import SegmentConversionChart from "@/components/analytics/members/SegmentConversionChart";
import TopAttendeesTable from "@/components/analytics/members/TopAttendeesTable";
import LeastEngagedTable from "@/components/analytics/members/LeastEngagedTable";
import ChurnIndicatorCards from "@/components/analytics/health/ChurnIndicatorCards";
import GrowthAreaChart from "@/components/analytics/health/GrowthAreaChart";
import RepeatAttendanceChart from "@/components/analytics/health/RepeatAttendanceChart";
import RetentionCohortHeatmap from "@/components/analytics/health/RetentionCohortHeatmap";
import AttendanceHeatmap from "@/components/analytics/health/AttendanceHeatmap";

export const dynamic = "force-dynamic";

export default async function AnalyticsPage() {
  const [summary, eventData, memberData, healthData] = await Promise.all([
    getSummaryStats(),
    getEventAnalytics(),
    getMemberAnalytics(),
    getHealthMetrics(),
  ]);

  // Prepare event chart data
  const statusBreakdownData = eventData.map((e) => ({
    name: e.name.replace("Meetup ", "M").replace("Ramadan Gathering ", "R"),
    attended: e.attended,
    absent: e.absent,
    confirmed: e.confirmed,
    declined: e.declined,
    invitedOnly: Math.max(0, e.invited - e.confirmed - e.declined - e.attended - e.absent),
  }));

  const noShowSorted = [...eventData]
    .sort((a, b) => b.noShowRate - a.noShowRate);

  const eventsContent = (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-sm font-semibold text-[#2d3e50] mb-4">Attendance Over Time</h3>
          <AttendanceLineChart data={eventData.map((e) => ({
            name: e.name.replace("Meetup ", "M").replace("Ramadan Gathering ", "R"),
            invited: e.invited,
            confirmed: e.confirmed,
            attended: e.attended,
            absent: e.absent,
          }))} />
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-sm font-semibold text-[#2d3e50] mb-4">Status Breakdown per Event</h3>
          <StatusBreakdownChart data={statusBreakdownData} />
        </div>
      </div>
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-sm font-semibold text-[#2d3e50] mb-4">No-Show Rate per Event</h3>
          <NoShowRateChart data={noShowSorted.map((e) => ({ name: e.name, rate: e.noShowRate }))} />
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-sm font-semibold text-[#2d3e50] mb-4">First-Timers per Event</h3>
          <FirstTimersChart data={eventData.map((e) => ({ name: e.name.replace("Meetup ", "M").replace("Ramadan Gathering ", "R"), firstTimers: e.firstTimers }))} />
        </div>
      </div>
      <EventComparisonTable data={eventData} />
    </div>
  );

  const membersContent = (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-sm font-semibold text-[#2d3e50] mb-4">Engagement Distribution</h3>
          <EngagementDistribution data={memberData.engagementBuckets} />
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-sm font-semibold text-[#2d3e50] mb-4">Membership Types</h3>
          <MembershipTypePie data={memberData.membershipBreakdown} />
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-sm font-semibold text-[#2d3e50] mb-4">Member Types</h3>
          <MemberTypePie data={memberData.memberTypeBreakdown} />
        </div>
      </div>
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-sm font-semibold text-[#2d3e50] mb-4">Guest Status Funnel</h3>
          <GuestFunnelChart data={memberData.guestStatusBreakdown} />
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-sm font-semibold text-[#2d3e50] mb-4">Segment Conversion</h3>
          <SegmentConversionChart data={memberData.segmentConversion} />
        </div>
      </div>
      <TopAttendeesTable data={memberData.topAttendees} />
      <LeastEngagedTable data={memberData.leastEngaged} />
    </div>
  );

  const healthContent = (
    <div className="space-y-6">
      <ChurnIndicatorCards atRisk={healthData.atRisk} dropped={healthData.dropped} churnRate={healthData.churnRate} />
      <div className="grid lg:grid-cols-2 gap-6">
        <GrowthAreaChart data={healthData.growthByMonth} />
        <RepeatAttendanceChart data={healthData.repeatRates} />
      </div>
      <RetentionCohortHeatmap data={healthData.cohortData} />
      <AttendanceHeatmap data={healthData.heatmapData} eventNames={healthData.eventNames} />
    </div>
  );

  return (
    <div className="space-y-8">
      <div>
        <p className="text-[#d4a537] text-xs sm:text-sm font-semibold tracking-wider uppercase mb-1">Analytics</p>
        <h1 className="text-2xl sm:text-4xl font-bold text-[#2d3e50]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
          Community Analytics
        </h1>
      </div>

      <SummaryCards data={summary} />

      <AnalyticsTabs
        eventsContent={eventsContent}
        membersContent={membersContent}
        healthContent={healthContent}
      />
    </div>
  );
}
