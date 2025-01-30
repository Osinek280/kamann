import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function MembershipStatus() {
  const membershipType = "Gold"
  const classesAttended = 8
  const totalClasses = 12
  const progress = (classesAttended / totalClasses) * 100

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
            <p className="text-2xl font-bold">{membershipType}</p>
          </div>
          <div>
            <p className="text-sm font-medium mb-1">Classes This Month</p>
            <p className="text-2xl font-bold">
              {classesAttended} / {totalClasses}
            </p>
            <Progress value={progress} className="mt-3" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

