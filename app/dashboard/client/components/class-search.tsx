'use client'
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { getEvents } from "@/actions/getEvents"
import { Event } from "@/types"

export default function ClassSearch() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedLevel, setSelectedLevel] = useState("")
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const updateEvents = async () => {
      try{
        const data = await getEvents(true)
        setEvents(data)
        setLoading(false);
      }catch(err) {
        console.log(err)
      }
    }

    updateEvents();
  }, [])

  // const filteredClasses = danceClasses.filter(
  //   (class_) =>
  //     class_.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
  //     (selectedLevel === "all" || class_.name.toLowerCase().includes(selectedLevel.toLowerCase())),
  // )

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
            {loading
              ? Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className="flex items-center justify-between pb-4 last:pb-0">
                      <div>
                        <Skeleton className="h-5 w-40 mb-2" />
                        <Skeleton className="h-4 w-32" />
                      </div>
                      <div className="text-right">
                        <Skeleton className="h-4 w-20 mb-1" />
                        <Skeleton className="h-4 w-16" />
                      </div>
                    </div>
                  ))
              : events.map((class_) => (
                  <div
                    key={class_.id}
                    className="flex items-center justify-between border-b pb-4 last:border-b-0 last:pb-0"
                  >
                    <div>
                      <p className="font-medium">{class_.title}</p>
                      <p className="text-sm text-muted-foreground">with {class_.instructorId}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm">{class_.title}</p>
                      <p className="text-sm text-muted-foreground">{class_.startTime}</p>
                    </div>
                  </div>
                ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}