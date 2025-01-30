import type { Metadata } from "next"
import UpcomingClasses from "./components/upcoming-classes"
import MembershipStatus from "./components/membership-status"
import ClassSearch from "./components/class-search"

export const metadata: Metadata = {
  title: "Client Dashboard | Dance Studio Reservation System",
  description: "View your upcoming classes, membership status, and search for new classes.",
}

export default function ClientDashboard() {
  return (
    <>
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="col-span-2">
          <UpcomingClasses />
        </div>
        <div className="col-span-2 lg:col-span-1">
          <MembershipStatus />
        </div>
      </div>
        <ClassSearch />
    </>
  )
}