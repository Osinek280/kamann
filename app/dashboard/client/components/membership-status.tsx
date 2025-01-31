"use client"
import { getMembership } from "@/actions/getMembership"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { useState, useEffect } from "react"

export default function MembershipStatus() {
  const [loading, setLoading] = useState(true)
  const [membershipData, setMembershipData] = useState({
    endDate: "undefined",
    entrancesLeft: 0,
  })

  useEffect(() => {
    const updateEvents = async () => {
      try{
        const data = await getMembership()

        console.log(data)

        setLoading(false);
        setMembershipData(data);
      }catch(err) {
        console.log(err)
      }
    }

    updateEvents();
  }, [])

  const progress = (membershipData.entrancesLeft / 2) * 100

  console.log(progress);

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
              <p className="text-2xl font-bold">{membershipData.endDate}</p>
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
                  {membershipData.entrancesLeft} / 2
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

