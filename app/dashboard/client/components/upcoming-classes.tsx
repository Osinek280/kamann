"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { useState, useEffect } from "react"
import { getEvents } from "@/actions/getEvents"
import { Occurrence } from "@/types"
import { format } from "date-fns"

export default function UpcomingClasses() {
  const [loading, setLoading] = useState(true)
  const [events, setEvents] = useState<Occurrence[]>([])

  useEffect(() => {
    const updateEvents = async () => {
      try {
        const data = await getEvents(true)

        const sortedEvents = data.sort((a: Occurrence, b: Occurrence) =>
          a.start.getTime() - b.start.getTime()
        )

        setEvents(sortedEvents.slice(0, 3))
        setLoading(false)
      } catch (err) {
        console.error(err)
      }
    }

    updateEvents()
  }, [])

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle>Upcoming Classes</CardTitle>
        <CardDescription>Your next 3 scheduled dance classes</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        {loading ? (
          <div className="space-y-5">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between pb-5 last:pb-0 border-b last:border-b-0">
                <div>
                  <Skeleton className="h-5 w-40 mb-2" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <div className="text-right">
                  <Skeleton className="h-6 w-24 mb-1" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-5">
            {events.map((occ) => (
              <div
                key={occ.occurrenceId}
                className="flex items-center justify-between pb-5 last:pb-0 border-b last:border-b-0"
              >
                <div>
                  <p className="font-medium">{occ.title}</p>
                  <p className="text-sm text-muted-foreground">with {occ.instructorFullName}</p>
                </div>
                <div className="text-right">
                  <Badge variant="secondary">{format(occ.start, "yyyy-MM-dd")}</Badge>
                  <p className="text-sm text-muted-foreground mt-1">{format(occ.start, "hh:mm")}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

