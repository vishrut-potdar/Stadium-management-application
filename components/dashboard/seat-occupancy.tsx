"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const occupancyData = [
  { time: "14:00", occupied: 12500, available: 32500 },
  { time: "14:30", occupied: 18200, available: 26800 },
  { time: "15:00", occupied: 28400, available: 16600 },
  { time: "15:30", occupied: 35600, available: 9400 },
  { time: "16:00", occupied: 38200, available: 6800 },
  { time: "16:30", occupied: 40100, available: 4900 },
  { time: "17:00", occupied: 41800, available: 3200 },
  { time: "17:30", occupied: 42500, available: 2500 },
  { time: "18:00", occupied: 43200, available: 1800 },
]

export function SeatOccupancy() {
  const currentOccupied = occupancyData[occupancyData.length - 1].occupied
  const totalSeats = 45000
  const occupancyPercent = Math.round((currentOccupied / totalSeats) * 100)

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold">Seat Occupancy</CardTitle>
            <p className="text-sm text-muted-foreground">Live seat fill rate over time</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-chart-1">{currentOccupied.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">of {totalSeats.toLocaleString()} ({occupancyPercent}%)</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={occupancyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="occupiedGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-chart-1)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--color-chart-1)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="time"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}
                tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--color-card)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "8px",
                  color: "var(--color-foreground)",
                }}
                formatter={(value: number) => [value.toLocaleString(), "Occupied"]}
              />
              <Area
                type="monotone"
                dataKey="occupied"
                stroke="var(--color-chart-1)"
                strokeWidth={2}
                fill="url(#occupiedGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
