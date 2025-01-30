'use client'
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"

const danceClasses = [
  { id: 1, name: "Salsa Beginners", instructor: "Maria Rodriguez", day: "Monday", time: "18:00" },
  { id: 2, name: "Hip Hop Intermediate", instructor: "Jake Smith", day: "Tuesday", time: "19:30" },
  { id: 3, name: "Ballet Advanced", instructor: "Emma Johnson", day: "Wednesday", time: "17:00" },
  { id: 4, name: "Tango Beginners", instructor: "Carlos Mendoza", day: "Thursday", time: "20:00" },
  { id: 5, name: "Contemporary Intermediate", instructor: "Sophia Lee", day: "Friday", time: "18:30" },
  { id: 6, name: "Jazz Beginners", instructor: "Lila Johnson", day: "Saturday", time: "10:00" },
  { id: 7, name: "Ballroom Advanced", instructor: "George Smith", day: "Sunday", time: "15:00" },
  { id: 8, name: "Breakdance Intermediate", instructor: "Mike Chen", day: "Monday", time: "20:00" },
  { id: 9, name: "Flamenco Beginners", instructor: "Isabella Gomez", day: "Tuesday", time: "18:30" },
  { id: 10, name: "Modern Dance Advanced", instructor: "Sarah Brown", day: "Wednesday", time: "19:00" },
]

export default function ClassSearch() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedLevel, setSelectedLevel] = useState("")

  const filteredClasses = danceClasses.filter(
    (class_) =>
      class_.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedLevel === "all" || class_.name.toLowerCase().includes(selectedLevel.toLowerCase())),
  )

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Class Search</CardTitle>
        <CardDescription>Find and book your next dance class</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mb-6">
          <Input
            placeholder="Search classes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow"
          />
          <Select value={selectedLevel} onValueChange={setSelectedLevel}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Select level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="beginners">Beginners</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
          <Button className="w-full sm:w-auto">Search</Button>
        </div>
        <ScrollArea className="h-[400px] rounded-md border p-4">
          <div className="space-y-4 pr-4">
            {filteredClasses.map((class_) => (
              <div
                key={class_.id}
                className="flex items-center justify-between border-b pb-4 last:border-b-0 last:pb-0"
              >
                <div>
                  <p className="font-medium">{class_.name}</p>
                  <p className="text-sm text-muted-foreground">with {class_.instructor}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm">{class_.day}</p>
                  <p className="text-sm text-muted-foreground">{class_.time}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}