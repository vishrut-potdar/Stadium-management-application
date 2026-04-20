"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { 
  UserPlus, 
  Search, 
  Share2, 
  Download, 
  Trash2,
  Copy,
  Check,
  Mail,
  Users,
  Upload,
  FileSpreadsheet,
  Calendar,
  Filter
} from "lucide-react"

interface Participant {
  id: string
  name: string
  email: string
  role: "staff" | "security" | "medical" | "vip" | "vendor" | "participant"
  section: string
  status: "active" | "offline" | "break"
  matchId?: string
}

interface Match {
  id: string
  name: string
  date: string
  teams: string
  participants: number
}

const matches: Match[] = [
  { id: "all", name: "All Matches", date: "", teams: "", participants: 0 },
  { id: "match1", name: "Quarter Final 1", date: "Apr 20, 2026", teams: "Team A vs Team B", participants: 12500 },
  { id: "match2", name: "Quarter Final 2", date: "Apr 21, 2026", teams: "Team C vs Team D", participants: 11800 },
  { id: "match3", name: "Semi Final", date: "Apr 25, 2026", teams: "TBD vs TBD", participants: 0 },
  { id: "match4", name: "Final", date: "Apr 30, 2026", teams: "TBD vs TBD", participants: 0 },
]

const initialParticipants: Participant[] = [
  { id: "1", name: "Sarah Chen", email: "sarah.chen@stadium.com", role: "security", section: "North Gate", status: "active", matchId: "match1" },
  { id: "2", name: "Mike Johnson", email: "mike.j@stadium.com", role: "staff", section: "East Stand", status: "active", matchId: "match1" },
  { id: "3", name: "Emma Williams", email: "emma.w@stadium.com", role: "medical", section: "Medical Bay 1", status: "active", matchId: "match1" },
  { id: "4", name: "James Brown", email: "james.b@stadium.com", role: "security", section: "South Gate", status: "break", matchId: "match2" },
  { id: "5", name: "Lisa Anderson", email: "lisa.a@stadium.com", role: "vendor", section: "Food Court A", status: "active", matchId: "match1" },
  { id: "6", name: "Robert Taylor", email: "robert.t@stadium.com", role: "vip", section: "VIP Lounge", status: "offline", matchId: "match2" },
  { id: "7", name: "John Smith", email: "john.s@example.com", role: "participant", section: "Section A-12", status: "active", matchId: "match1" },
  { id: "8", name: "Emily Davis", email: "emily.d@example.com", role: "participant", section: "Section B-5", status: "active", matchId: "match1" },
  { id: "9", name: "David Wilson", email: "david.w@example.com", role: "participant", section: "Section C-8", status: "active", matchId: "match2" },
]

const roleColors: Record<Participant["role"], string> = {
  staff: "bg-chart-1/10 text-chart-1 border-chart-1/30",
  security: "bg-chart-4/10 text-chart-4 border-chart-4/30",
  medical: "bg-destructive/10 text-destructive border-destructive/30",
  vip: "bg-warning/10 text-warning border-warning/30",
  vendor: "bg-chart-2/10 text-chart-2 border-chart-2/30",
  participant: "bg-info/10 text-info border-info/30",
}

const statusColors: Record<Participant["status"], string> = {
  active: "bg-success",
  offline: "bg-muted-foreground",
  break: "bg-warning",
}

export function ParticipantsList() {
  const [participants, setParticipants] = useState<Participant[]>(initialParticipants)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedMatch, setSelectedMatch] = useState("all")
  const [selectedRole, setSelectedRole] = useState("all")
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isShareOpen, setIsShareOpen] = useState(false)
  const [isUploadOpen, setIsUploadOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [uploadPreview, setUploadPreview] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [newParticipant, setNewParticipant] = useState({
    name: "",
    email: "",
    role: "participant" as Participant["role"],
    section: "",
    matchId: "match1",
  })

  const filteredParticipants = participants.filter((p) => {
    const matchesSearch = 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.section.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesMatchFilter = selectedMatch === "all" || p.matchId === selectedMatch
    const matchesRoleFilter = selectedRole === "all" || p.role === selectedRole
    return matchesSearch && matchesMatchFilter && matchesRoleFilter
  })

  const staffCount = filteredParticipants.filter(p => p.role !== "participant").length
  const participantCount = filteredParticipants.filter(p => p.role === "participant").length

  const handleAddParticipant = () => {
    if (newParticipant.name && newParticipant.email) {
      setParticipants([
        ...participants,
        {
          ...newParticipant,
          id: Date.now().toString(),
          status: "active",
        },
      ])
      setNewParticipant({ name: "", email: "", role: "participant", section: "", matchId: "match1" })
      setIsAddOpen(false)
    }
  }

  const handleRemoveParticipant = (id: string) => {
    setParticipants(participants.filter((p) => p.id !== id))
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText("https://stadium.app/team/abc123")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleExport = () => {
    const dataToExport = selectedMatch === "all" 
      ? participants 
      : participants.filter(p => p.matchId === selectedMatch)
    
    const csv = [
      ["Name", "Email", "Role", "Section", "Status", "Match"],
      ...dataToExport.map((p) => [
        p.name, 
        p.email, 
        p.role, 
        p.section, 
        p.status,
        matches.find(m => m.id === p.matchId)?.name || ""
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n")
    
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `stadium-participants-${selectedMatch}.csv`
    a.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setUploadedFile(file)
      const reader = new FileReader()
      reader.onload = (event) => {
        const text = event.target?.result as string
        const lines = text.split("\n").filter(line => line.trim())
        // Skip header row if present
        const dataLines = lines[0]?.toLowerCase().includes("name") ? lines.slice(1) : lines
        setUploadPreview(dataLines.slice(0, 5))
      }
      reader.readAsText(file)
    }
  }

  const handleUpload = () => {
    if (uploadedFile) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const text = event.target?.result as string
        const lines = text.split("\n").filter(line => line.trim())
        const dataLines = lines[0]?.toLowerCase().includes("name") ? lines.slice(1) : lines
        
        const newParticipants: Participant[] = dataLines.map((line, index) => {
          const [name, email, role, section] = line.split(",").map(s => s.trim())
          return {
            id: `uploaded-${Date.now()}-${index}`,
            name: name || `Participant ${index + 1}`,
            email: email || "",
            role: (role?.toLowerCase() as Participant["role"]) || "participant",
            section: section || "",
            status: "active" as const,
            matchId: selectedMatch === "all" ? "match1" : selectedMatch,
          }
        })
        
        setParticipants([...participants, ...newParticipants])
        setUploadedFile(null)
        setUploadPreview([])
        setIsUploadOpen(false)
      }
      reader.readAsText(uploadedFile)
    }
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold">Team & Participants</CardTitle>
              <p className="text-sm text-muted-foreground">
                {staffCount} staff, {participantCount} participants
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Upload className="h-4 w-4 mr-1.5" />
                  Upload
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Upload Participants</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div 
                    className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <FileSpreadsheet className="h-10 w-10 mx-auto mb-3 text-muted-foreground" />
                    <p className="text-sm font-medium">Click to upload CSV file</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Format: Name, Email, Role, Section
                    </p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".csv,.txt"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </div>
                  
                  {uploadedFile && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <FileSpreadsheet className="h-4 w-4 text-primary" />
                          <span className="text-sm font-medium">{uploadedFile.name}</span>
                        </div>
                        <Badge variant="secondary">{uploadPreview.length}+ entries</Badge>
                      </div>
                      
                      {uploadPreview.length > 0 && (
                        <div className="space-y-1.5">
                          <p className="text-xs font-medium text-muted-foreground">Preview:</p>
                          <div className="space-y-1 max-h-32 overflow-y-auto">
                            {uploadPreview.map((line, i) => (
                              <div key={i} className="text-xs bg-muted/30 px-2 py-1 rounded truncate">
                                {line}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <Field>
                        <FieldLabel>Assign to Match</FieldLabel>
                        <Select value={selectedMatch === "all" ? "match1" : selectedMatch} onValueChange={(v) => setSelectedMatch(v)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {matches.filter(m => m.id !== "all").map((match) => (
                              <SelectItem key={match.id} value={match.id}>
                                {match.name} - {match.date}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </Field>
                      
                      <Button className="w-full" onClick={handleUpload}>
                        <Upload className="h-4 w-4 mr-1.5" />
                        Import {uploadPreview.length}+ Participants
                      </Button>
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>
            <Dialog open={isShareOpen} onOpenChange={setIsShareOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-1.5" />
                  Share
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Share Team Roster</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div className="flex items-center gap-2">
                    <Input 
                      value="https://stadium.app/team/abc123" 
                      readOnly 
                      className="flex-1"
                    />
                    <Button size="icon" variant="outline" onClick={handleCopyLink}>
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                  <div className="border-t pt-4">
                    <p className="text-sm font-medium mb-3">Invite via email</p>
                    <div className="flex items-center gap-2">
                      <Input placeholder="Enter email address" className="flex-1" />
                      <Button>
                        <Mail className="h-4 w-4 mr-1.5" />
                        Send
                      </Button>
                    </div>
                  </div>
                  <div className="border-t pt-4">
                    <Button variant="outline" className="w-full" onClick={handleExport}>
                      <Download className="h-4 w-4 mr-1.5" />
                      Export as CSV
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <UserPlus className="h-4 w-4 mr-1.5" />
                  Add
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Participant</DialogTitle>
                </DialogHeader>
                <FieldGroup className="pt-4">
                  <Field>
                    <FieldLabel>Full Name</FieldLabel>
                    <Input
                      value={newParticipant.name}
                      onChange={(e) => setNewParticipant({ ...newParticipant, name: e.target.value })}
                      placeholder="Enter full name"
                    />
                  </Field>
                  <Field>
                    <FieldLabel>Email</FieldLabel>
                    <Input
                      type="email"
                      value={newParticipant.email}
                      onChange={(e) => setNewParticipant({ ...newParticipant, email: e.target.value })}
                      placeholder="Enter email address"
                    />
                  </Field>
                  <Field>
                    <FieldLabel>Role</FieldLabel>
                    <Select
                      value={newParticipant.role}
                      onValueChange={(value) => setNewParticipant({ ...newParticipant, role: value as Participant["role"] })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="participant">Participant</SelectItem>
                        <SelectItem value="staff">Staff</SelectItem>
                        <SelectItem value="security">Security</SelectItem>
                        <SelectItem value="medical">Medical</SelectItem>
                        <SelectItem value="vip">VIP Host</SelectItem>
                        <SelectItem value="vendor">Vendor</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                  <Field>
                    <FieldLabel>Match</FieldLabel>
                    <Select
                      value={newParticipant.matchId}
                      onValueChange={(value) => setNewParticipant({ ...newParticipant, matchId: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {matches.filter(m => m.id !== "all").map((match) => (
                          <SelectItem key={match.id} value={match.id}>
                            {match.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                  <Field>
                    <FieldLabel>Assigned Section</FieldLabel>
                    <Input
                      value={newParticipant.section}
                      onChange={(e) => setNewParticipant({ ...newParticipant, section: e.target.value })}
                      placeholder="e.g., Section A-12, North Gate"
                    />
                  </Field>
                  <Button className="w-full mt-2" onClick={handleAddParticipant}>
                    Add Participant
                  </Button>
                </FieldGroup>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Match Filter Tabs */}
        <div className="mb-4">
          <Tabs value={selectedMatch} onValueChange={setSelectedMatch}>
            <TabsList className="w-full flex overflow-x-auto">
              {matches.map((match) => (
                <TabsTrigger 
                  key={match.id} 
                  value={match.id}
                  className="flex-1 min-w-fit text-xs"
                >
                  <Calendar className="h-3 w-3 mr-1" />
                  {match.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Search and Role Filter */}
        <div className="flex gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, email, or section..."
              className="pl-9"
            />
          </div>
          <Select value={selectedRole} onValueChange={setSelectedRole}>
            <SelectTrigger className="w-32">
              <Filter className="h-4 w-4 mr-1.5" />
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="participant">Participant</SelectItem>
              <SelectItem value="staff">Staff</SelectItem>
              <SelectItem value="security">Security</SelectItem>
              <SelectItem value="medical">Medical</SelectItem>
              <SelectItem value="vip">VIP</SelectItem>
              <SelectItem value="vendor">Vendor</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Match Info Banner */}
        {selectedMatch !== "all" && (
          <div className="mb-4 p-3 rounded-lg bg-primary/5 border border-primary/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">{matches.find(m => m.id === selectedMatch)?.teams || "Teams TBD"}</p>
                <p className="text-xs text-muted-foreground">{matches.find(m => m.id === selectedMatch)?.date}</p>
              </div>
              <Badge variant="outline" className="bg-primary/10 border-primary/30">
                {filteredParticipants.length} assigned
              </Badge>
            </div>
          </div>
        )}

        {/* Participants List */}
        <div className="space-y-2 max-h-80 overflow-y-auto">
          {filteredParticipants.map((participant) => (
            <div
              key={participant.id}
              className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-muted/50 transition-colors group"
            >
              <div className="relative">
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="bg-secondary text-secondary-foreground text-sm">
                    {participant.name.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <span
                  className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-card ${statusColors[participant.status]}`}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium truncate">{participant.name}</p>
                  <Badge variant="outline" className={`text-[10px] ${roleColors[participant.role]}`}>
                    {participant.role}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground truncate">
                  {participant.section} {participant.email && `• ${participant.email}`}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
                onClick={() => handleRemoveParticipant(participant.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          {filteredParticipants.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No participants found</p>
              <p className="text-xs mt-1">Try adjusting your filters or add new participants</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
