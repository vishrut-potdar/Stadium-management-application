"use client"

import { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Section {
  id: string
  name: string
  occupancy: number
  capacity: number
  x: number
  y: number
  width: number
  height: number
}

const sections: Section[] = [
  { id: "A1", name: "North Stand A", occupancy: 95, capacity: 2500, x: 100, y: 20, width: 120, height: 60 },
  { id: "A2", name: "North Stand B", occupancy: 88, capacity: 2500, x: 230, y: 20, width: 120, height: 60 },
  { id: "A3", name: "North Stand C", occupancy: 72, capacity: 2500, x: 360, y: 20, width: 120, height: 60 },
  { id: "B1", name: "East Stand A", occupancy: 45, capacity: 3000, x: 480, y: 100, width: 60, height: 100 },
  { id: "B2", name: "East Stand B", occupancy: 78, capacity: 3000, x: 480, y: 210, width: 60, height: 100 },
  { id: "C1", name: "South Stand A", occupancy: 62, capacity: 2500, x: 100, y: 320, width: 120, height: 60 },
  { id: "C2", name: "South Stand B", occupancy: 85, capacity: 2500, x: 230, y: 320, width: 120, height: 60 },
  { id: "C3", name: "South Stand C", occupancy: 91, capacity: 2500, x: 360, y: 320, width: 120, height: 60 },
  { id: "D1", name: "West Stand A", occupancy: 55, capacity: 3000, x: 30, y: 100, width: 60, height: 100 },
  { id: "D2", name: "West Stand B", occupancy: 68, capacity: 3000, x: 30, y: 210, width: 60, height: 100 },
  { id: "VIP1", name: "VIP North", occupancy: 100, capacity: 500, x: 230, y: 90, width: 120, height: 40 },
  { id: "VIP2", name: "VIP South", occupancy: 82, capacity: 500, x: 230, y: 270, width: 120, height: 40 },
]

function getHeatColor(occupancy: number): string {
  if (occupancy >= 90) return "#ef4444" // Red - overcrowded
  if (occupancy >= 75) return "#f97316" // Orange - high
  if (occupancy >= 50) return "#eab308" // Yellow - moderate
  if (occupancy >= 25) return "#22c55e" // Green - low
  return "#3b82f6" // Blue - very low
}

export function StadiumHeatmap() {
  const totalOccupancy = useMemo(() => {
    const total = sections.reduce((acc, s) => acc + s.occupancy * s.capacity / 100, 0)
    const totalCapacity = sections.reduce((acc, s) => acc + s.capacity, 0)
    return Math.round((total / totalCapacity) * 100)
  }, [])

  const overcrowdedSections = sections.filter(s => s.occupancy >= 90)

  return (
    <Card className="col-span-2">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-lg font-semibold">Crowd Heatmap</CardTitle>
          <p className="text-sm text-muted-foreground">Real-time occupancy by section</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-success/10 text-success border-success/30">
            {totalOccupancy}% Total Occupancy
          </Badge>
          {overcrowdedSections.length > 0 && (
            <Badge variant="destructive">
              {overcrowdedSections.length} Overcrowded
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <svg viewBox="0 0 580 400" className="w-full h-auto">
            {/* Stadium outline */}
            <rect
              x="90"
              y="80"
              width="400"
              height="240"
              rx="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-border"
            />
            
            {/* Playing field */}
            <rect
              x="110"
              y="140"
              width="360"
              height="120"
              rx="8"
              className="fill-success/20 stroke-success/40"
              strokeWidth="1"
            />
            <line x1="290" y1="140" x2="290" y2="260" className="stroke-success/40" strokeWidth="1" />
            <circle cx="290" cy="200" r="30" fill="none" className="stroke-success/40" strokeWidth="1" />
            
            {/* Sections */}
            {sections.map((section) => (
              <g key={section.id} className="cursor-pointer group">
                <rect
                  x={section.x}
                  y={section.y}
                  width={section.width}
                  height={section.height}
                  rx="4"
                  fill={getHeatColor(section.occupancy)}
                  fillOpacity="0.7"
                  className="transition-all duration-200 group-hover:fill-opacity-100"
                  stroke={section.occupancy >= 90 ? "#ef4444" : "transparent"}
                  strokeWidth={section.occupancy >= 90 ? "2" : "0"}
                />
                <text
                  x={section.x + section.width / 2}
                  y={section.y + section.height / 2 - 6}
                  textAnchor="middle"
                  className="fill-foreground text-xs font-medium"
                >
                  {section.id}
                </text>
                <text
                  x={section.x + section.width / 2}
                  y={section.y + section.height / 2 + 8}
                  textAnchor="middle"
                  className="fill-foreground/80 text-[10px]"
                >
                  {section.occupancy}%
                </text>
              </g>
            ))}
          </svg>
          
          {/* Legend */}
          <div className="flex items-center justify-center gap-4 mt-4 text-xs">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm bg-[#3b82f6]" />
              <span className="text-muted-foreground">{"<25%"}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm bg-[#22c55e]" />
              <span className="text-muted-foreground">25-50%</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm bg-[#eab308]" />
              <span className="text-muted-foreground">50-75%</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm bg-[#f97316]" />
              <span className="text-muted-foreground">75-90%</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm bg-[#ef4444]" />
              <span className="text-muted-foreground">{">90%"}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
