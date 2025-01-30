"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { useState, useEffect } from "react"

export default function MembershipStatus() {
  const [loading, setLoading] = useState(true)
  const [membershipData, setMembershipData] = useState({
    membershipType: "",
    classesAttended: 0,
    totalClasses: 0,
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      setMembershipData({
        membershipType: "Gold",
        classesAttended: 8,
        totalClasses: 12,
      })
      setLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  const progress = (membershipData.classesAttended / membershipData.totalClasses) * 100

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle>Membership Status</CardTitle>
        <CardDescription>Your current membership details</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-between">
        <div className="space-y-6">
          <div>
            <p className="text-sm font-medium mb-1">Membership Type</p>
            {loading ? (
              <Skeleton className="h-8 w-24" />
            ) : (
              <p className="text-2xl font-bold">{membershipData.membershipType}</p>
            )}
          </div>
          <div>
            <p className="text-sm font-medium mb-1">Classes This Month</p>
            {loading ? (
              <>
                <Skeleton className="h-8 w-32 mb-3" />
                <Skeleton className="h-6 w-full" />
              </>
            ) : (
              <>
                <p className="text-2xl font-bold">
                  {membershipData.classesAttended} / {membershipData.totalClasses}
                </p>
                <Progress value={progress} className="mt-3" />
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

