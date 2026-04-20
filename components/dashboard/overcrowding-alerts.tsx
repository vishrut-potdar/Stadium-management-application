"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Users, TrendingUp, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Alert {
  id: string
  area: string
  density: number
  trend: "rising" | "stable" | "falling"
  severity: "warning" | "critical"
  timestamp: string
  suggestedAction: string
}

const alerts: Alert[] = [
  {
    id: "1",
    area: "Gate E - Entry Concourse",
    density: 98,
    trend: "rising",
    severity: "critical",
    timestamp: "2 min ago",
    suggestedAction: "Open auxiliary gates G2 and G3"
  },
  {
    id: "2",
    area: "North Stand Food Court",
    density: 92,
    trend: "stable",
    severity: "critical",
    timestamp: "5 min ago",
    suggestedAction: "Redirect foot traffic to Level 2"
  },
  {
    id: "3",
    area: "South Exit Corridor",
    density: 85,
    trend: "rising",
    severity: "warning",
    timestamp: "8 min ago",
    suggestedAction: "Deploy crowd control staff"
  },
  {
    id: "4",
    area: "VIP Lounge Entrance",
    density: 78,
    trend: "falling",
    severity: "warning",
    timestamp: "12 min ago",
    suggestedAction: "Monitor situation"
  },
]

export function OvercrowdingAlerts() {
  const criticalCount = alerts.filter(a => a.severity === "critical").length

  return (
    <Card className="border-destructive/20">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-destructive/10">
              <AlertTriangle className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold">Overcrowding Alerts</CardTitle>
              <p className="text-sm text-muted-foreground">Areas exceeding safe density limits</p>
            </div>
          </div>
          <Badge variant="destructive" className="text-sm">
            {criticalCount} Critical
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-3 rounded-lg border ${
                alert.severity === "critical" 
                  ? "bg-destructive/5 border-destructive/20" 
                  : "bg-warning/5 border-warning/20"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium text-sm truncate">{alert.area}</p>
                    <Badge 
                      variant="outline" 
                      className={alert.severity === "critical" 
                        ? "bg-destructive/10 text-destructive border-destructive/30 text-xs" 
                        : "bg-warning/10 text-warning border-warning/30 text-xs"
                      }
                    >
                      {alert.density}% density
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Users className="h-3 w-3" />
                    <span>{alert.timestamp}</span>
                    <span className="flex items-center gap-0.5">
                      <TrendingUp className={`h-3 w-3 ${
                        alert.trend === "rising" ? "text-destructive" : 
                        alert.trend === "falling" ? "text-success rotate-180" : ""
                      }`} />
                      {alert.trend}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1.5 flex items-center gap-1">
                    <ArrowRight className="h-3 w-3" />
                    {alert.suggestedAction}
                  </p>
                </div>
                <Button size="sm" variant="outline" className="shrink-0">
                  Resolve
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
