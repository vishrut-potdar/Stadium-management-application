"use client"

import { useState, useEffect } from "react"
import { AlertTriangle, X, Bell, MapPin, TrendingUp, Volume2, CheckCircle, UserPlus, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface OvercrowdingWarning {
  id: string
  area: string
  density: number
  trend: "rising" | "stable" | "falling"
  severity: "warning" | "critical" | "emergency"
  message: string
  timestamp: Date
}

interface TeamMember {
  id: string
  name: string
  role: "security" | "staff" | "medical"
  status: "available" | "busy" | "offline"
}

const teamMembers: TeamMember[] = [
  { id: "t1", name: "John Martinez", role: "security", status: "available" },
  { id: "t2", name: "Sarah Chen", role: "security", status: "available" },
  { id: "t3", name: "Mike Johnson", role: "staff", status: "busy" },
  { id: "t4", name: "Emily Davis", role: "medical", status: "available" },
  { id: "t5", name: "David Wilson", role: "security", status: "offline" },
  { id: "t6", name: "Lisa Anderson", role: "staff", status: "available" },
]

const roleColors: Record<TeamMember["role"], string> = {
  security: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  staff: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  medical: "bg-rose-500/20 text-rose-400 border-rose-500/30",
}

const statusColors: Record<TeamMember["status"], string> = {
  available: "bg-success",
  busy: "bg-warning",
  offline: "bg-muted-foreground",
}

const mockWarnings: OvercrowdingWarning[] = [
  {
    id: "1",
    area: "Gate E - Main Entry",
    density: 98,
    trend: "rising",
    severity: "emergency",
    message: "CRITICAL: Immediate action required. Capacity exceeded at Gate E.",
    timestamp: new Date()
  },
  {
    id: "2",
    area: "North Food Court",
    density: 92,
    trend: "stable",
    severity: "critical",
    message: "High density detected. Consider redirecting traffic to Level 2.",
    timestamp: new Date(Date.now() - 120000)
  },
  {
    id: "3",
    area: "Section B Exit",
    density: 85,
    trend: "rising",
    severity: "warning",
    message: "Density approaching limit. Monitor situation closely.",
    timestamp: new Date(Date.now() - 300000)
  }
]

export function OvercrowdingWarningBanner() {
  const [warnings, setWarnings] = useState<OvercrowdingWarning[]>(mockWarnings)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [dismissed, setDismissed] = useState<string[]>([])
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [assignDialogOpen, setAssignDialogOpen] = useState(false)
  const [selectedWarningId, setSelectedWarningId] = useState<string | null>(null)
  const [assignedMembers, setAssignedMembers] = useState<Record<string, string[]>>({})
  const [resolvedWarnings, setResolvedWarnings] = useState<string[]>([])

  const activeWarnings = warnings.filter(w => !dismissed.includes(w.id))
  const emergencyWarnings = activeWarnings.filter(w => w.severity === "emergency")
  const criticalWarnings = activeWarnings.filter(w => w.severity === "critical")
  const regularWarnings = activeWarnings.filter(w => w.severity === "warning")

  // Cycle through warnings
  useEffect(() => {
    if (activeWarnings.length <= 1) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeWarnings.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [activeWarnings.length])

  const currentWarning = activeWarnings[currentIndex % activeWarnings.length]

  const handleDismiss = (id: string) => {
    setDismissed([...dismissed, id])
    if (currentIndex >= activeWarnings.length - 1) {
      setCurrentIndex(0)
    }
  }

  const handleResolve = (id: string) => {
    setResolvedWarnings([...resolvedWarnings, id])
    setDismissed([...dismissed, id])
    if (currentIndex >= activeWarnings.length - 1) {
      setCurrentIndex(0)
    }
  }

  const openAssignDialog = (id: string) => {
    setSelectedWarningId(id)
    setAssignDialogOpen(true)
  }

  const toggleAssignMember = (memberId: string) => {
    if (!selectedWarningId) return
    const current = assignedMembers[selectedWarningId] || []
    if (current.includes(memberId)) {
      setAssignedMembers({
        ...assignedMembers,
        [selectedWarningId]: current.filter(id => id !== memberId)
      })
    } else {
      setAssignedMembers({
        ...assignedMembers,
        [selectedWarningId]: [...current, memberId]
      })
    }
  }

  const getAssignedCount = (warningId: string) => {
    return (assignedMembers[warningId] || []).length
  }

  const getSeverityStyles = (severity: OvercrowdingWarning["severity"]) => {
    switch (severity) {
      case "emergency":
        return {
          bg: "bg-destructive",
          border: "border-destructive",
          text: "text-destructive-foreground",
          icon: "text-destructive-foreground",
          pulse: true
        }
      case "critical":
        return {
          bg: "bg-destructive/90",
          border: "border-destructive/50",
          text: "text-destructive-foreground",
          icon: "text-destructive-foreground",
          pulse: false
        }
      case "warning":
        return {
          bg: "bg-warning",
          border: "border-warning",
          text: "text-warning-foreground",
          icon: "text-warning-foreground",
          pulse: false
        }
    }
  }

  if (activeWarnings.length === 0) {
    return (
      <div className="rounded-lg border border-success/30 bg-success/10 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-success/20">
            <Bell className="h-5 w-5 text-success" />
          </div>
          <div>
            <p className="font-medium text-success">All Clear</p>
            <p className="text-sm text-muted-foreground">No overcrowding warnings at this time</p>
          </div>
        </div>
      </div>
    )
  }

  const styles = currentWarning ? getSeverityStyles(currentWarning.severity) : getSeverityStyles("warning")

  return (
    <div className="space-y-3">
      {/* Main Warning Banner */}
      {currentWarning && (
        <div 
          className={cn(
            "relative overflow-hidden rounded-lg border p-4 transition-all",
            styles.bg,
            styles.border,
            styles.pulse && "animate-pulse"
          )}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className={cn(
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
                currentWarning.severity === "emergency" ? "bg-destructive-foreground/20" : "bg-background/20"
              )}>
                <AlertTriangle className={cn("h-5 w-5", styles.icon)} />
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={cn(
                    "inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs font-bold uppercase",
                    currentWarning.severity === "emergency" 
                      ? "bg-destructive-foreground/20 text-destructive-foreground"
                      : currentWarning.severity === "critical"
                      ? "bg-background/20 text-destructive-foreground"
                      : "bg-background/20 text-warning-foreground"
                  )}>
                    {currentWarning.severity}
                  </span>
                  <span className={cn("flex items-center gap-1 text-sm font-medium", styles.text)}>
                    <MapPin className="h-3.5 w-3.5" />
                    {currentWarning.area}
                  </span>
                  <span className={cn("flex items-center gap-1 text-sm", styles.text)}>
                    <TrendingUp className={cn(
                      "h-3.5 w-3.5",
                      currentWarning.trend === "falling" && "rotate-180"
                    )} />
                    {currentWarning.density}% density
                  </span>
                </div>
                <p className={cn("mt-1 text-sm", styles.text)}>
                  {currentWarning.message}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Button
                size="sm"
                variant="secondary"
                className="h-8 gap-1.5 bg-background/20 hover:bg-background/30 text-inherit border-0"
                onClick={() => openAssignDialog(currentWarning.id)}
              >
                <UserPlus className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Assign</span>
                {getAssignedCount(currentWarning.id) > 0 && (
                  <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-xs bg-background/30">
                    {getAssignedCount(currentWarning.id)}
                  </Badge>
                )}
              </Button>
              <Button
                size="sm"
                variant="secondary"
                className="h-8 gap-1.5 bg-background/20 hover:bg-background/30 text-inherit border-0"
                onClick={() => handleResolve(currentWarning.id)}
              >
                <CheckCircle className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Resolve</span>
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className={cn("h-8 w-8", styles.text, "hover:bg-background/20")}
                onClick={() => setSoundEnabled(!soundEnabled)}
              >
                <Volume2 className={cn("h-4 w-4", !soundEnabled && "opacity-50")} />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className={cn("h-8 w-8", styles.text, "hover:bg-background/20")}
                onClick={() => handleDismiss(currentWarning.id)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Progress dots for multiple warnings */}
          {activeWarnings.length > 1 && (
            <div className="mt-3 flex items-center justify-center gap-1.5">
              {activeWarnings.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={cn(
                    "h-1.5 rounded-full transition-all",
                    idx === currentIndex % activeWarnings.length
                      ? "w-4 bg-background/80"
                      : "w-1.5 bg-background/40"
                  )}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Warning Summary */}
      <div className="flex items-center justify-between rounded-lg border border-border bg-card p-3">
        <div className="flex items-center gap-4">
          {emergencyWarnings.length > 0 && (
            <div className="flex items-center gap-1.5">
              <span className="flex h-2 w-2 rounded-full bg-destructive animate-pulse" />
              <span className="text-sm font-medium text-destructive">{emergencyWarnings.length} Emergency</span>
            </div>
          )}
          {criticalWarnings.length > 0 && (
            <div className="flex items-center gap-1.5">
              <span className="flex h-2 w-2 rounded-full bg-destructive/70" />
              <span className="text-sm font-medium text-destructive/90">{criticalWarnings.length} Critical</span>
            </div>
          )}
          {regularWarnings.length > 0 && (
            <div className="flex items-center gap-1.5">
              <span className="flex h-2 w-2 rounded-full bg-warning" />
              <span className="text-sm font-medium text-warning">{regularWarnings.length} Warning</span>
            </div>
          )}
        </div>
        <Button variant="outline" size="sm" onClick={() => setDismissed([])}>
          View All ({activeWarnings.length})
        </Button>
      </div>

      {/* Assign Team Member Dialog */}
      <Dialog open={assignDialogOpen} onOpenChange={setAssignDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Assign Team Members
            </DialogTitle>
            <DialogDescription>
              {selectedWarningId && (
                <span>
                  Assign team members to handle the alert at{" "}
                  <span className="font-medium text-foreground">
                    {warnings.find(w => w.id === selectedWarningId)?.area}
                  </span>
                </span>
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2 max-h-80 overflow-y-auto py-2">
            {teamMembers.map((member) => {
              const isAssigned = selectedWarningId 
                ? (assignedMembers[selectedWarningId] || []).includes(member.id)
                : false
              const isAvailable = member.status === "available"
              
              return (
                <button
                  key={member.id}
                  onClick={() => isAvailable && toggleAssignMember(member.id)}
                  disabled={!isAvailable}
                  className={cn(
                    "w-full flex items-center justify-between p-3 rounded-lg border transition-all",
                    isAssigned 
                      ? "border-primary bg-primary/10" 
                      : "border-border hover:border-primary/50 hover:bg-muted/50",
                    !isAvailable && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-secondary text-sm">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span className={cn(
                        "absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background",
                        statusColors[member.status]
                      )} />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-sm">{member.name}</p>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={cn("text-xs capitalize", roleColors[member.role])}>
                          {member.role}
                        </Badge>
                        <span className="text-xs text-muted-foreground capitalize">{member.status}</span>
                      </div>
                    </div>
                  </div>
                  {isAssigned && (
                    <CheckCircle className="h-5 w-5 text-primary" />
                  )}
                </button>
              )
            })}
          </div>
          <div className="flex justify-between items-center pt-2 border-t">
            <p className="text-sm text-muted-foreground">
              {selectedWarningId && (assignedMembers[selectedWarningId] || []).length} member(s) assigned
            </p>
            <Button onClick={() => setAssignDialogOpen(false)}>
              Done
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
