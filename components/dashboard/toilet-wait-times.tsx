"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, AlertTriangle } from "lucide-react"

interface ToiletFacility {
  id: string
  location: string
  waitTime: number
  queueLength: number
  status: "low" | "moderate" | "high" | "critical"
}

const facilities: ToiletFacility[] = [
  { id: "T1", location: "North Stand - Level 1", waitTime: 2, queueLength: 8, status: "low" },
  { id: "T2", location: "North Stand - Level 2", waitTime: 5, queueLength: 22, status: "moderate" },
  { id: "T3", location: "East Stand - Level 1", waitTime: 12, queueLength: 45, status: "high" },
  { id: "T4", location: "East Stand - Level 2", waitTime: 3, queueLength: 12, status: "low" },
  { id: "T5", location: "South Stand - Level 1", waitTime: 18, queueLength: 68, status: "critical" },
  { id: "T6", location: "South Stand - Level 2", waitTime: 8, queueLength: 32, status: "moderate" },
  { id: "T7", location: "West Stand - Level 1", waitTime: 4, queueLength: 15, status: "low" },
  { id: "T8", location: "West Stand - Level 2", waitTime: 6, queueLength: 25, status: "moderate" },
]

function getStatusColor(status: ToiletFacility["status"]) {
  switch (status) {
    case "low":
      return "bg-success/10 text-success border-success/30"
    case "moderate":
      return "bg-warning/10 text-warning border-warning/30"
    case "high":
      return "bg-chart-3/10 text-chart-3 border-chart-3/30"
    case "critical":
      return "bg-destructive/10 text-destructive border-destructive/30"
  }
}

function getBarColor(status: ToiletFacility["status"]) {
  switch (status) {
    case "low":
      return "bg-success"
    case "moderate":
      return "bg-warning"
    case "high":
      return "bg-chart-3"
    case "critical":
      return "bg-destructive"
  }
}

export function ToiletWaitTimes() {
  const criticalCount = facilities.filter(f => f.status === "critical" || f.status === "high").length
  const avgWaitTime = Math.round(facilities.reduce((acc, f) => acc + f.waitTime, 0) / facilities.length)

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              Restroom Wait Times
            </CardTitle>
            <p className="text-sm text-muted-foreground">Real-time queue monitoring</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-muted">
              Avg: {avgWaitTime} min
            </Badge>
            {criticalCount > 0 && (
              <Badge variant="destructive" className="flex items-center gap-1">
                <AlertTriangle className="h-3 w-3" />
                {criticalCount} High Wait
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {facilities.map((facility) => (
            <div key={facility.id} className="flex items-center gap-3">
              <div className="w-20 shrink-0">
                <Badge variant="outline" className={getStatusColor(facility.status)}>
                  {facility.waitTime} min
                </Badge>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium truncate">{facility.location}</p>
                  <span className="text-xs text-muted-foreground">{facility.queueLength} in queue</span>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${getBarColor(facility.status)}`}
                    style={{ width: `${Math.min((facility.waitTime / 20) * 100, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
