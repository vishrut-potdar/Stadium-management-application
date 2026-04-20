"use client"

import { useState } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { 
  RefreshCw, 
  Settings, 
  Bell,
  Calendar,
  MapPin,
  Trophy
} from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface Match {
  id: string
  name: string
  date: string
  teams: string
  status: "upcoming" | "live" | "completed"
}

const matches: Match[] = [
  { id: "match1", name: "Quarter Final 1", date: "Apr 20, 2026", teams: "Team A vs Team B", status: "live" },
  { id: "match2", name: "Quarter Final 2", date: "Apr 21, 2026", teams: "Team C vs Team D", status: "upcoming" },
  { id: "match3", name: "Semi Final", date: "Apr 25, 2026", teams: "TBD vs TBD", status: "upcoming" },
  { id: "match4", name: "Final", date: "Apr 30, 2026", teams: "TBD vs TBD", status: "upcoming" },
]

const statusConfig: Record<Match["status"], { label: string; className: string }> = {
  live: { label: "Live", className: "bg-success/10 text-success border-success/30" },
  upcoming: { label: "Upcoming", className: "bg-info/10 text-info border-info/30" },
  completed: { label: "Completed", className: "bg-muted text-muted-foreground border-muted" },
}

export function DashboardHeader() {
  const [selectedMatch, setSelectedMatch] = useState("match1")
  const currentMatch = matches.find(m => m.id === selectedMatch) || matches[0]

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-balance">Stadium Control Center</h1>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Trophy className="h-3.5 w-3.5" />
                  <span>{currentMatch.teams}</span>
                  <Badge variant="outline" className={`${statusConfig[currentMatch.status].className} text-xs`}>
                    {statusConfig[currentMatch.status].label}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Select value={selectedMatch} onValueChange={setSelectedMatch}>
              <SelectTrigger className="w-44 h-9">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {matches.map((match) => (
                  <SelectItem key={match.id} value={match.id}>
                    <div className="flex items-center justify-between gap-4 w-full">
                      <span>{match.name}</span>
                      <span className="text-xs text-muted-foreground">{match.date}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" className="h-9 w-9">
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Refresh Data</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" className="h-9 w-9 relative" asChild>
                    <Link href="/notifications">
                      <Bell className="h-4 w-4" />
                      <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive rounded-full text-[10px] font-medium flex items-center justify-center text-destructive-foreground">
                        4
                      </span>
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Notifications</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" className="h-9 w-9" asChild>
                    <Link href="/settings">
                      <Settings className="h-4 w-4" />
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Settings</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
    </header>
  )
}
