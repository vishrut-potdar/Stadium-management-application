"use client"

import { useState } from "react"
import Link from "next/link"
import { 
  ArrowLeft, 
  Settings, 
  Bell, 
  Shield, 
  Users, 
  MapPin,
  Volume2,
  Moon,
  Monitor,
  Mail,
  Smartphone,
  Clock,
  Save,
  Building
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    // Notifications
    pushNotifications: true,
    emailNotifications: true,
    soundAlerts: true,
    criticalOnly: false,
    
    // Thresholds
    overcrowdingThreshold: 85,
    waitTimeThreshold: 10,
    alertCooldown: 5,
    
    // Display
    theme: "dark",
    refreshRate: "30",
    compactView: false,
    
    // Stadium
    stadiumName: "Grand Arena Stadium",
    totalCapacity: "45000",
    sections: "12",
  })

  const updateSetting = <K extends keyof typeof settings>(key: K, value: typeof settings[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }))
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
                  <Settings className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">Settings</h1>
                  <p className="text-sm text-muted-foreground">Manage your dashboard preferences</p>
                </div>
              </div>
            </div>
            <Button>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <Tabs defaultValue="notifications" className="space-y-6">
          <TabsList className="grid w-full max-w-lg grid-cols-4">
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">Alerts</span>
            </TabsTrigger>
            <TabsTrigger value="thresholds" className="gap-2">
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">Thresholds</span>
            </TabsTrigger>
            <TabsTrigger value="display" className="gap-2">
              <Monitor className="h-4 w-4" />
              <span className="hidden sm:inline">Display</span>
            </TabsTrigger>
            <TabsTrigger value="stadium" className="gap-2">
              <Building className="h-4 w-4" />
              <span className="hidden sm:inline">Stadium</span>
            </TabsTrigger>
          </TabsList>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-primary" />
                    Notification Preferences
                  </CardTitle>
                  <CardDescription>
                    Configure how you receive alerts and notifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-muted">
                        <Smartphone className="h-4 w-4" />
                      </div>
                      <div>
                        <Label className="text-base">Push Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive real-time push alerts</p>
                      </div>
                    </div>
                    <Switch 
                      checked={settings.pushNotifications}
                      onCheckedChange={(v) => updateSetting("pushNotifications", v)}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-muted">
                        <Mail className="h-4 w-4" />
                      </div>
                      <div>
                        <Label className="text-base">Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">Get daily summary reports via email</p>
                      </div>
                    </div>
                    <Switch 
                      checked={settings.emailNotifications}
                      onCheckedChange={(v) => updateSetting("emailNotifications", v)}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-muted">
                        <Volume2 className="h-4 w-4" />
                      </div>
                      <div>
                        <Label className="text-base">Sound Alerts</Label>
                        <p className="text-sm text-muted-foreground">Play audio for critical alerts</p>
                      </div>
                    </div>
                    <Switch 
                      checked={settings.soundAlerts}
                      onCheckedChange={(v) => updateSetting("soundAlerts", v)}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-destructive/10">
                        <Shield className="h-4 w-4 text-destructive" />
                      </div>
                      <div>
                        <Label className="text-base">Critical Alerts Only</Label>
                        <p className="text-sm text-muted-foreground">Only receive emergency-level notifications</p>
                      </div>
                    </div>
                    <Switch 
                      checked={settings.criticalOnly}
                      onCheckedChange={(v) => updateSetting("criticalOnly", v)}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Thresholds Tab */}
          <TabsContent value="thresholds">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Alert Thresholds
                  </CardTitle>
                  <CardDescription>
                    Set trigger points for automatic alerts
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  <FieldGroup>
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <FieldLabel>Overcrowding Alert Threshold</FieldLabel>
                        <p className="text-sm text-muted-foreground">
                          Trigger alert when section reaches this capacity
                        </p>
                      </div>
                      <Badge variant="outline" className="text-lg font-mono">
                        {settings.overcrowdingThreshold}%
                      </Badge>
                    </div>
                    <Slider
                      value={[settings.overcrowdingThreshold]}
                      onValueChange={([v]) => updateSetting("overcrowdingThreshold", v)}
                      min={50}
                      max={100}
                      step={5}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-2">
                      <span>50%</span>
                      <span>75%</span>
                      <span>100%</span>
                    </div>
                  </FieldGroup>

                  <Separator />

                  <FieldGroup>
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <FieldLabel>Wait Time Alert</FieldLabel>
                        <p className="text-sm text-muted-foreground">
                          Alert when restroom wait exceeds this time
                        </p>
                      </div>
                      <Badge variant="outline" className="text-lg font-mono">
                        {settings.waitTimeThreshold} min
                      </Badge>
                    </div>
                    <Slider
                      value={[settings.waitTimeThreshold]}
                      onValueChange={([v]) => updateSetting("waitTimeThreshold", v)}
                      min={5}
                      max={30}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-2">
                      <span>5 min</span>
                      <span>15 min</span>
                      <span>30 min</span>
                    </div>
                  </FieldGroup>

                  <Separator />

                  <FieldGroup>
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <FieldLabel>Alert Cooldown Period</FieldLabel>
                        <p className="text-sm text-muted-foreground">
                          Minimum time between repeat alerts for same area
                        </p>
                      </div>
                      <Badge variant="outline" className="text-lg font-mono">
                        {settings.alertCooldown} min
                      </Badge>
                    </div>
                    <Slider
                      value={[settings.alertCooldown]}
                      onValueChange={([v]) => updateSetting("alertCooldown", v)}
                      min={1}
                      max={15}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-2">
                      <span>1 min</span>
                      <span>8 min</span>
                      <span>15 min</span>
                    </div>
                  </FieldGroup>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Display Tab */}
          <TabsContent value="display">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Monitor className="h-5 w-5 text-primary" />
                    Display Settings
                  </CardTitle>
                  <CardDescription>
                    Customize the dashboard appearance
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FieldGroup>
                    <FieldLabel>Theme</FieldLabel>
                    <Select value={settings.theme} onValueChange={(v) => updateSetting("theme", v)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dark">
                          <div className="flex items-center gap-2">
                            <Moon className="h-4 w-4" />
                            Dark Mode
                          </div>
                        </SelectItem>
                        <SelectItem value="light">
                          <div className="flex items-center gap-2">
                            <Monitor className="h-4 w-4" />
                            Light Mode
                          </div>
                        </SelectItem>
                        <SelectItem value="system">
                          <div className="flex items-center gap-2">
                            <Settings className="h-4 w-4" />
                            System Default
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FieldGroup>

                  <Separator />

                  <FieldGroup>
                    <FieldLabel>Data Refresh Rate</FieldLabel>
                    <Select value={settings.refreshRate} onValueChange={(v) => updateSetting("refreshRate", v)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10">Every 10 seconds</SelectItem>
                        <SelectItem value="30">Every 30 seconds</SelectItem>
                        <SelectItem value="60">Every minute</SelectItem>
                        <SelectItem value="300">Every 5 minutes</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground mt-1">
                      How often to fetch live data updates
                    </p>
                  </FieldGroup>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Compact View</Label>
                      <p className="text-sm text-muted-foreground">Use smaller cards and tighter spacing</p>
                    </div>
                    <Switch 
                      checked={settings.compactView}
                      onCheckedChange={(v) => updateSetting("compactView", v)}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Stadium Tab */}
          <TabsContent value="stadium">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5 text-primary" />
                    Stadium Configuration
                  </CardTitle>
                  <CardDescription>
                    Manage your stadium settings and capacity information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FieldGroup>
                    <FieldLabel>Stadium Name</FieldLabel>
                    <Input 
                      value={settings.stadiumName}
                      onChange={(e) => updateSetting("stadiumName", e.target.value)}
                      placeholder="Enter stadium name"
                    />
                  </FieldGroup>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FieldGroup>
                      <FieldLabel>Total Capacity</FieldLabel>
                      <Input 
                        type="number"
                        value={settings.totalCapacity}
                        onChange={(e) => updateSetting("totalCapacity", e.target.value)}
                        placeholder="45000"
                      />
                    </FieldGroup>
                    <FieldGroup>
                      <FieldLabel>Number of Sections</FieldLabel>
                      <Input 
                        type="number"
                        value={settings.sections}
                        onChange={(e) => updateSetting("sections", e.target.value)}
                        placeholder="12"
                      />
                    </FieldGroup>
                  </div>

                  <Separator />

                  <div className="rounded-lg border border-border p-4 bg-muted/30">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      Zone Configuration
                    </h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Configure individual sections, gates, and facilities
                    </p>
                    <Button variant="outline">
                      Manage Zones
                    </Button>
                  </div>

                  <div className="rounded-lg border border-border p-4 bg-muted/30">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Users className="h-4 w-4 text-primary" />
                      Team Management
                    </h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Configure staff roles, shifts, and permissions
                    </p>
                    <Button variant="outline">
                      Manage Team
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
