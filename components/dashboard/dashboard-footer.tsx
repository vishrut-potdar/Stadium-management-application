"use client"

import { Activity, Wifi, Clock, Shield } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export function DashboardFooter() {
  const currentTime = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  })

  return (
    <footer className="border-t border-border bg-card/50 backdrop-blur-sm mt-auto">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
          <div className="flex items-center gap-4 text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
              </span>
              <span>Live</span>
            </div>
            <Separator orientation="vertical" className="h-4" />
            <div className="flex items-center gap-1.5">
              <Wifi className="h-3.5 w-3.5" />
              <span>Connected</span>
            </div>
            <Separator orientation="vertical" className="h-4" />
            <div className="flex items-center gap-1.5">
              <Activity className="h-3.5 w-3.5" />
              <span>42 sensors active</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Shield className="h-3.5 w-3.5" />
              <span>Security Level: </span>
              <Badge variant="outline" className="text-xs bg-success/10 text-success border-success/30">
                Normal
              </Badge>
            </div>
            <Separator orientation="vertical" className="h-4" />
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              <span className="font-mono">{currentTime}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
