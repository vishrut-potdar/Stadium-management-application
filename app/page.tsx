import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardFooter } from "@/components/dashboard/dashboard-footer"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { StadiumHeatmap } from "@/components/dashboard/stadium-heatmap"
import { SeatOccupancy } from "@/components/dashboard/seat-occupancy"
import { ToiletWaitTimes } from "@/components/dashboard/toilet-wait-times"
import { OvercrowdingAlerts } from "@/components/dashboard/overcrowding-alerts"
import { ParticipantsList } from "@/components/dashboard/participants-list"
import { OvercrowdingWarningBanner } from "@/components/dashboard/overcrowding-warning-banner"

export default function StadiumDashboard() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <DashboardHeader />
      
      <main className="container mx-auto px-4 py-6">
        <div className="space-y-6">
          {/* Critical Warning Banner - Always visible at top */}
          <OvercrowdingWarningBanner />
          
          {/* Key Metrics */}
          <StatsCards />
          
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Heatmap takes 2 columns */}
            <div className="lg:col-span-2 space-y-6">
              <StadiumHeatmap />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SeatOccupancy />
                <ToiletWaitTimes />
              </div>
            </div>
            
            {/* Right Column - Alerts and Team */}
            <div className="space-y-6">
              <OvercrowdingAlerts />
              <ParticipantsList />
            </div>
          </div>
        </div>
      </main>
      
      <DashboardFooter />
    </div>
  )
}
