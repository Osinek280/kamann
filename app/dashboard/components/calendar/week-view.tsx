import React from 'react';
import { format, addDays, startOfWeek } from 'date-fns';
import { cn } from "@/lib/utils"

interface Event {
  id: string;
  title: string;
  start: Date;
  end: Date;
  color?: string;
}

interface WeekViewProps {
  currentDate: Date;
  events: Event[];
  today: string;
}

export const WeekView: React.FC<WeekViewProps> = ({ currentDate, events, today }) => {
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const timeSlots = Array.from({ length: 24 }, (_, i) => i);

  const getEventsForDay = (day: Date) => {
    return events.filter(event => 
      format(event.start, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd') ||
      format(event.end, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd') ||
      (event.start < day && event.end > day)
    );
  };

  const calculateEventPosition = (event: Event) => {
    const startHour = event.start.getHours() + event.start.getMinutes() / 60;
    const endHour = event.end.getHours() + event.end.getMinutes() / 60;
    const top = `${startHour * 100 / 24}%`;
    const height = `${(endHour - startHour) * 100 / 24}%`;
    return { top, height };
  };

  return (
    <div className="h-full border rounded-lg">
      <div className="grid grid-cols-8 h-full">
        <div className="border-r">
          <div className="h-12 border-b"></div>
          {timeSlots.map((hour) => (
            <div key={hour} className="h-[calc((100%-3rem)/24)] border-b text-xs pr-1 flex items-center justify-center">
              {hour === 0 ? '12 AM' : hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`}
            </div>
          ))}
        </div>
        {weekDays.map((day, dayIndex) => (
          <div key={dayIndex}>
            <div className="h-12 border-b text-center py-1 flex flex-col items-center"
              onClick={() => {
                console.log(day.toDateString())
                console.log(today)
              }}>
              <div className="text-sm font-semibold">{format(day, 'EEE')}</div>
              <div 
                className={cn(
                "text-xs", 
              day.toDateString() === today ? "bg-blue-600 w-5 h-5 rounded-full flex items-center justify-center" : ""
              )}
                >{format(day, 'd')}
              </div>
            </div>
            <div className="relative h-[calc(100%-3rem)]">
              {timeSlots.map((hour) => (
                <div key={hour} className="absolute w-full border-b" style={{ top: `${hour * 100 / 24}%`, height: `${100 / 24}%` }}></div>
              ))}
              {getEventsForDay(day).map((event) => {
                const { top, height } = calculateEventPosition(event);
                return (
                  <div
                    key={event.id}
                    className={cn(
                      "absolute left-0 right-0 p-1 text-xs overflow-hidden",
                      "rounded truncate"
                    )}
                    style={{
                      top,
                      height,
                      backgroundColor: event.color + '33',
                      color: event.color,
                    }}
                  >
                    {event.title}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

