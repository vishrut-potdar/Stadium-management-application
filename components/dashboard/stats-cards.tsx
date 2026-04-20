"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Users, Armchair, AlertTriangle, Clock, TrendingUp, TrendingDown, Minus } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatCard {
  label: string
  value: string
  change: string
  changeType: "positive" | "negative" | "neutral"
  icon: React.ReactNode
  iconBg: string
  trend?: number
}

const stats: StatCard[] = [
  {
    label: "Total Attendance",
    value: "43,218",
    change: "+2.4% from last event",
    changeType: "positive",
    icon: <Users className="h-5 w-5" />,
    iconBg: "bg-chart-1/10 text-chart-1",
    trend: 2.4,
  },
  {
    label: "Seats Occupied",
    value: "96%",
    change: "1,782 available",
    changeType: "neutral",
    icon: <Armchair className="h-5 w-5" />,
    iconBg: "bg-success/10 text-success",
    trend: 0,
  },
  {
    label: "Active Alerts",
    value: "4",
    change: "2 critical zones",
    changeType: "negative",
    icon: <AlertTriangle className="h-5 w-5" />,
    iconBg: "bg-destructive/10 text-destructive",
    trend: -15,
  },
  {
    label: "Avg Wait Time",
    value: "7 min",
    change: "-12% from halftime",
    changeType: "positive",
    icon: <Clock className="h-5 w-5" />,
    iconBg: "bg-warning/10 text-warning",
    trend: -12,
  },
]

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card 
          key={index} 
          className="group hover:border-primary/50 transition-all duration-200 hover:shadow-lg hover:shadow-primary/5"
        >
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <p className="text-2xl font-bold tracking-tight">{stat.value}</p>
                  {stat.trend !== undefined && stat.trend !== 0 && (
                    <span className={cn(
                      "flex items-center text-xs font-medium",
                      stat.changeType === "positive" ? "text-success" : "text-destructive"
                    )}>
                      {stat.trend > 0 ? (
                        <TrendingUp className="h-3 w-3 mr-0.5" />
                      ) : (
                        <TrendingDown className="h-3 w-3 mr-0.5" />
                      )}
                      {Math.abs(stat.trend)}%
                    </span>
                  )}
                </div>
                <p
                  className={cn(
                    "text-xs mt-1.5",
                    stat.changeType === "positive"
                      ? "text-success"
                      : stat.changeType === "negative"
                      ? "text-destructive"
                      : "text-muted-foreground"
                  )}
                >
                  {stat.change}
                </p>
              </div>
              <div className={cn(
                "p-2.5 rounded-lg transition-transform duration-200 group-hover:scale-110",
                stat.iconBg
              )}>
                {stat.icon}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
