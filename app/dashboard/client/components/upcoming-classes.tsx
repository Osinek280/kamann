"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { useState, useEffect } from "react"

const upcomingClasses = [
  { id: 1, name: "Salsa Beginners", instructor: "Maria Rodriguez", date: "2023-06-15", time: "18:00" },
  { id: 2, name: "Hip Hop Intermediate", instructor: "Jake Smith", date: "2023-06-16", time: "19:30" },
  { id: 3, name: "Ballet Advanced", instructor: "Emma Johnson", date: "2023-06-17", time: "17:00" },
]

export default function UpcomingClasses() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => setLoading(false), 2000)
    return () => clearTimeout(timer)
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
            {upcomingClasses.map((class_) => (
              <div
                key={class_.id}
                className="flex items-center justify-between pb-5 last:pb-0 border-b last:border-b-0"
              >
                <div>
                  <p className="font-medium">{class_.name}</p>
                  <p className="text-sm text-muted-foreground">with {class_.instructor}</p>
                </div>
                <div className="text-right">
                  <Badge variant="secondary">{class_.date}</Badge>
                  <p className="text-sm text-muted-foreground mt-1">{class_.time}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

