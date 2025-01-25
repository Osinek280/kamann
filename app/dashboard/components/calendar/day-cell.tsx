import React from 'react';
import { cn } from "@/lib/utils"

interface Event {
  id: string;
  title: string;
  start: Date;
  end: Date;
  color?: string;
}

interface DayCellProps {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  events: Event[];
}

export const DayCell: React.FC<DayCellProps> = ({ date, isCurrentMonth, isToday, events }) => {
  const dayClasses = cn(
    "p-1 border transition-all duration-200",
    isCurrentMonth ? "bg-background" : "bg-muted dark:bg-background",
    // isToday && "bg-blue-200",
    // !isCurrentMonth && "opacity-50"
  );

  return (
    <div className={dayClasses} onClick={() => {console.log(date)}}>
      <div className="flex justify-between items-start">
        <span className={cn(
          "flex items-center justify-center w-6 h-6 text-xs font-semibold rounded-full",
          isToday && "bg-blue-600 text-white",
          !isCurrentMonth && "text-gray-400"
        )}>
          {date.getDate()}
        </span>
        {events.length > 0 && isCurrentMonth && (
          <span className="text-xs font-medium">{events.length}</span>
        )}
      </div>
      {isCurrentMonth && (
        <div className="mt-1 space-y-1">
          {events.slice(0, 2).map((event) => (
            <div 
              key={event.id} 
              className="text-xs p-1 rounded truncate"
              style={{ backgroundColor: event.color + '33', color: event.color }}
            >
              {event.title}
            </div>
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

