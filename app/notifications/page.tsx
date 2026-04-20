"use client"

import { useState } from "react"
import Link from "next/link"
import { 
  ArrowLeft, 
  Bell, 
  AlertTriangle, 
  Users, 
  Clock, 
  CheckCircle2, 
  Trash2,
  Filter,
  MoreHorizontal,
  BellOff
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

interface Notification {
  id: string
  type: "alert" | "info" | "success" | "warning"
  title: string
  message: string
  timestamp: string
  read: boolean
  area?: string
}

const mockNotifications: Notification[] = [
  {
    id: "n1",
    type: "alert",
    title: "Critical Overcrowding Detected",
    message: "Section A North has exceeded 95% capacity. Immediate action required.",
    timestamp: "2 min ago",
    read: false,
    area: "Section A North"
  },
  {
    id: "n2",
    type: "warning",
    title: "High Wait Time Alert",
    message: "Restroom Block C wait time has reached 15 minutes.",
    timestamp: "8 min ago",
    read: false,
    area: "Restroom Block C"
  },
  {
    id: "n3",
    type: "info",
    title: "Team Member Assigned",
    message: "John Martinez has been assigned to Section B overcrowding alert.",
    timestamp: "15 min ago",
    read: true
  },
  {
    id: "n4",
    type: "success",
    title: "Alert Resolved",
    message: "Gate 4 congestion has been cleared. Normal flow restored.",
    timestamp: "23 min ago",
    read: true,
    area: "Gate 4"
  },
  {
    id: "n5",
    type: "warning",
    title: "Capacity Warning",
    message: "VIP Lounge approaching 80% capacity.",
    timestamp: "35 min ago",
    read: true,
    area: "VIP Lounge"
  },
  {
    id: "n6",
    type: "info",
    title: "Match Update",
    message: "Halftime break starting. Expect increased movement.",
    timestamp: "45 min ago",
    read: true
  },
  {
    id: "n7",
    type: "alert",
    title: "Medical Emergency",
    message: "Medical team dispatched to Section D Row 12.",
    timestamp: "1 hour ago",
    read: true,
    area: "Section D"
  },
  {
    id: "n8",
    type: "success",
    title: "Staff Check-in Complete",
    message: "All 48 security personnel have checked in for duty.",
    timestamp: "2 hours ago",
    read: true
  },
]

const typeConfig = {
  alert: {
    icon: AlertTriangle,
    className: "bg-destructive/10 text-destructive border-destructive/30",
    iconColor: "text-destructive"
  },
  warning: {
    icon: Clock,
    className: "bg-warning/10 text-warning border-warning/30",
    iconColor: "text-warning"
  },
  info: {
    icon: Users,
    className: "bg-info/10 text-info border-info/30",
    iconColor: "text-info"
  },
  success: {
    icon: CheckCircle2,
    className: "bg-success/10 text-success border-success/30",
    iconColor: "text-success"
  }
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications)
  const [filter, setFilter] = useState<"all" | "unread">("all")

  const unreadCount = notifications.filter(n => !n.read).length
  const filteredNotifications = filter === "unread" 
    ? notifications.filter(n => !n.read)
    : notifications

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id))
  }

  const clearAll = () => {
    setNotifications([])
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" asChild>
                <Link href="/">
                  <ArrowLeft className="h-5 w-5" />
                </Link>
              </Button>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Bell className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">Notifications</h1>
                  <p className="text-sm text-muted-foreground">
                    {unreadCount > 0 ? `${unreadCount} unread` : "All caught up"}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={markAllAsRead} disabled={unreadCount === 0}>
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Mark all read
              </Button>
              <Button variant="outline" size="sm" onClick={clearAll} disabled={notifications.length === 0}>
                <Trash2 className="h-4 w-4 mr-2" />
                Clear all
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <Tabs defaultValue="all" onValueChange={(v) => setFilter(v as "all" | "unread")}>
          <div className="flex items-center justify-between mb-6">
            <TabsList>
              <TabsTrigger value="all">
                All
                <Badge variant="secondary" className="ml-2">{notifications.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="unread">
                Unread
                {unreadCount > 0 && (
                  <Badge className="ml-2 bg-destructive text-destructive-foreground">{unreadCount}</Badge>
                )}
              </TabsTrigger>
            </TabsList>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>All Types</DropdownMenuItem>
                <DropdownMenuItem>Alerts Only</DropdownMenuItem>
                <DropdownMenuItem>Warnings Only</DropdownMenuItem>
                <DropdownMenuItem>Info Only</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <TabsContent value="all" className="mt-0">
            <NotificationsList 
              notifications={filteredNotifications}
              onMarkAsRead={markAsRead}
              onDelete={deleteNotification}
            />
          </TabsContent>
          <TabsContent value="unread" className="mt-0">
            <NotificationsList 
              notifications={filteredNotifications}
              onMarkAsRead={markAsRead}
              onDelete={deleteNotification}
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

function NotificationsList({ 
  notifications, 
  onMarkAsRead, 
  onDelete 
}: { 
  notifications: Notification[]
  onMarkAsRead: (id: string) => void
  onDelete: (id: string) => void
}) {
  if (notifications.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-16">
          <div className="p-4 rounded-full bg-muted mb-4">
            <BellOff className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium mb-1">No notifications</h3>
          <p className="text-sm text-muted-foreground">You&apos;re all caught up!</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="p-0 divide-y divide-border">
        {notifications.map((notification) => {
          const config = typeConfig[notification.type]
          const Icon = config.icon

          return (
            <div 
              key={notification.id}
              className={cn(
                "flex items-start gap-4 p-4 transition-colors hover:bg-muted/50",
                !notification.read && "bg-primary/5"
              )}
            >
              <div className={cn("p-2 rounded-lg shrink-0", config.className)}>
                <Icon className={cn("h-4 w-4", config.iconColor)} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className={cn("font-medium", !notification.read && "text-foreground")}>
                      {notification.title}
                    </p>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {notification.message}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs text-muted-foreground">{notification.timestamp}</span>
                      {notification.area && (
                        <Badge variant="outline" className="text-xs">
                          {notification.area}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {!notification.read && (
                        <DropdownMenuItem onClick={() => onMarkAsRead(notification.id)}>
                          <CheckCircle2 className="h-4 w-4 mr-2" />
                          Mark as read
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem 
                        onClick={() => onDelete(notification.id)}
                        className="text-destructive"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              {!notification.read && (
                <div className="h-2 w-2 rounded-full bg-primary shrink-0 mt-2" />
              )}
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
