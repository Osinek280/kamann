"use client"
import { getMembership } from "@/actions/getMembership"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { format } from "date-fns"
import { useState, useEffect } from "react"
import { enUS } from "date-fns/locale"

export default function MembershipStatus() {
  const [loading, setLoading] = useState(true)
  interface MembershipData {
    endDate: Date;
    entrancesLeft: number;
  }

  const [membershipData, setMembershipData] = useState<MembershipData | null>(null)

  useEffect(() => {
    const updateEvents = async () => {
      try {
        const data = await getMembership()

        if (!data || !data.endDate || data.entrancesLeft === undefined) {
          setMembershipData(null) // Brak aktywnego członkostwa
        } else {
          setMembershipData(data)
        }
      } catch (err) {
        console.error("Error fetching membership:", err)
        setMembershipData(null)
      } finally {
        setLoading(false)
      }
    }

    updateEvents()
  }, [])

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle>Membership Status</CardTitle>
        <CardDescription>Your current membership details</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-between">
        {loading ? (
          <div className="space-y-6">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-8 w-32 mb-3" />
            <Skeleton className="h-6 w-full" />
          </div>
        ) : membershipData ? (
          <div className="space-y-6">
            <div>
              <p className="text-sm font-medium mb-1">Expired Date</p>
              <p className="text-2xl font-bold">
                {format(membershipData.endDate, 'd MMMM yyyy', { locale: enUS })}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium mb-1">Classes This Month</p>
              <p className="text-2xl font-bold">
                {membershipData.entrancesLeft} / 2
              </p>
              <Progress value={(membershipData.entrancesLeft / 2) * 100} className="mt-3" />
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500">
            <p className="text-lg font-semibold">No active membership found</p>
            <p className="text-sm">Please contact support for assistance.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
