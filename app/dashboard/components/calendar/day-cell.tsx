import React from 'react';
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { DialogTrigger } from '@radix-ui/react-dialog';
import { DayCellProps, EventDetailsModalProps } from '@/types';

export const DayCell: React.FC<DayCellProps> = ({ date, isCurrentMonth, isToday, events, isWeekend }) => {
  const dayClasses = cn(
    "p-1 border transition-all duration-200",
    isCurrentMonth ? "bg-background" : "bg-muted dark:bg-background", // Default to muted background for non-current month
    isWeekend && !isCurrentMonth ? "bg-gray-300 dark:bg-gray-700" : "", // Special shading for weekends in non-current month
    !isCurrentMonth && !isWeekend ? "bg-gray-200 dark:bg-gray-600" : "", // Special shading for non-weekend, non-current month
    (!isCurrentMonth || isWeekend) && "bg-muted dark:bg-background" // Indicate inactive days in a subtle way
  );

  return (
    <div className={dayClasses} onClick={() => {console.log(date)}}>
      <div className="flex justify-between items-start">
        <span className={cn(
          "flex items-center justify-center w-6 h-6 text-xs font-semibold rounded-full",
          isToday && "bg-blue-600 text-white",
          !isToday && (!isCurrentMonth || isWeekend) && "text-gray-400"
        )}>
          {date.getDate()}
        </span>
        {events.length > 0 && isCurrentMonth && (
          <span className="text-xs font-medium">{events.length}</span>
        )}
      </div>
      {isCurrentMonth && (
        <div className="mt-1 space-y-1">
          {events.slice(0, 2).map((occ) => (
            <div
              key={occ.occurrenceId}
              className="text-xs p-1 rounded truncate"
              style={{ backgroundColor: '#f39c12' }}
            >
              {occ.title}
            </div>
            // <EventDetailsModal event={event} key={event.occurrenceId} />
          ))}
          {events.length > 2 && (
            <div className="text-xs font-medium">
              +{events.length - 2}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export const EventDetailsModal: React.FC<EventDetailsModalProps> = ({ event }) => {
  if (!event) return null;

  const formatTime = (date: Date) => date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const getDuration = (start: Date, end: Date) => {
    const diff = end.getTime() - start.getTime();
    const hours = Math.floor(diff / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    return `${hours}h ${minutes}min`;
  };

  // const eventTypeColor = types.find(item => item.title === event.eventTypeName)?.color || '#ccc';
  const eventTypeColor = "#ccc"

  return (
    <Dialog>
      <DialogTrigger>
        <div
          key={event.id}
          className="text-xs p-1 rounded truncate"
          style={{ backgroundColor: eventTypeColor }}
        >
          {event.title}
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold truncate">{event.title}</DialogTitle>
          <DialogDescription className="text-sm text-gray-500">{event.eventTypeName}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          {/* Instructor Section */}
          <div className="flex items-center gap-4">
            <Avatar className="w-10 h-10">
              {/* <AvatarImage src={event.instructorImage} alt={event.instructorName} /> */}
              <AvatarFallback>
                N/A
                {/* {event.instructorName || "N/A"} */}
              </AvatarFallback>
            </Avatar>
            <div>
              {/* <p className="font-semibold">{event.instructorName || "Unknown Instructor"}</p> */}
              <p className="font-semibold">Adam Małysz</p>
              <p className="text-sm text-gray-500">Instructor</p>
            </div>
          </div>

          {/* Description Section */}
          <div>
            <p className="text-sm font-medium">Description</p>
            <p className="text-sm text-gray-500">{event.description || "No description provided."}</p>
          </div>

          {/* Time Section */}
          <div>
            <p className="text-sm font-medium">Time</p>
            <p className="text-sm text-gray-500">
              {formatTime(event.startTime)} - {formatTime(event.endTime)}
            </p>
            <p className="text-sm text-gray-500">
              Duration: {getDuration(event.startTime, event.endTime)}
            </p>
          </div>

          {/* Availability Section */}
          <div>
            <p className="text-sm font-medium">Availability</p>
            <p className="text-sm text-gray-500">
              {event.maxParticipants - (event.currentParticipants ?? 0)} spots left out of {event.maxParticipants}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
