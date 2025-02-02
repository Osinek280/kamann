import { useState } from 'react'
import { format } from 'date-fns'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Event } from "@/types"
import { joinEvent } from "@/actions/joinEvent"

interface EventModalProps {
  event: Event | null
  isOpen: boolean
  onClose: () => void
}

export function EventModal({ event, isOpen, onClose }: EventModalProps) {
  const [isJoining, setIsJoining] = useState(false)

  const handleJoinEvent = async () => {
    if (!event) return
    setIsJoining(true)
    try {
      const result = await joinEvent(event.id)
      if (result.success) {
        console.log(result.message)
        onClose()
      }
    } catch (error) {
      console.error("Failed to join event:", error)
    } finally {
      setIsJoining(false)
    }
  }

  if (!event) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{event.title}</DialogTitle>
          <DialogDescription>with {event.instructorFullName}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-medium">Date:</span>
            <span className="col-span-3">{format(event.startTime, 'EEEE, MMMM d, yyyy')}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-medium">Time:</span>
            <span className="col-span-3">{format(event.startTime, 'HH:mm')} - {format(event.endTime, 'HH:mm')}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-medium">Type:</span>
            <span className="col-span-3">{event.eventTypeName}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-medium">Description:</span>
            <span className="col-span-3">{event.description || 'No description available'}</span>
          </div>
        </div>
        <div className="flex justify-end">
          <Button onClick={handleJoinEvent} disabled={isJoining}>
            {isJoining ? 'Joining...' : 'Join Event'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
