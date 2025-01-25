"use client"

import React, { useEffect, useState } from 'react';
import { DayCell } from './day-cell';
// import { getDaysInMonth, getWeekDays } from '@/utils/dateUtils';
import { addDays, startOfWeek, endOfWeek } from 'date-fns';
import { getDayOfWeek, getDaysInMonth, getWeekDays } from '@/lib/dateUtils';
import { WeekView } from './week-view';
import { CalendarHeader } from './header';
import { getEvents } from '@/app/api/events/getEvents';
// import { getCalendarsList } from '@/utils/actions/get-calendars';

interface Event {
  id: string;
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  recurring: boolean;
  createdById: number;
  instructorId: number;
  maxParticipants: number;
  status: string;
  currentParticipants: null;
  eventTypeId: string;
  eventTypeName: string;
}

interface Calendar {
  id: string;
  title: string;
  color: string;
}

export const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState<'week' | 'month'>('month');
  const [events, setEvents] = useState<Event[]>([])

  const prevPeriod = () => {
    if (currentView === 'month') {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    } else {
      setCurrentDate(addDays(currentDate, -7));
    }
  };

  const nextPeriod = () => {
    if (currentView === 'month') {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    } else {
      setCurrentDate(addDays(currentDate, 7));
    }
  };

  const getCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
    const firstDayOfMonth = getDayOfWeek(new Date(currentDate.getFullYear(), currentDate.getMonth(), 1));
    const lastDayOfMonth = getDayOfWeek(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0));

    const previousMonthDays = Array(firstDayOfMonth).fill(null).map((_, index) => {
      const day = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0 - index);
      return { date: day, isCurrentMonth: false };
    }).reverse();

    const currentMonthDays = daysInMonth.map(date => ({ date, isCurrentMonth: true }));

    const nextMonthDays = Array(6 - lastDayOfMonth).fill(null).map((_, index) => {
      const day = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, index + 1);
      return { date: day, isCurrentMonth: false };
    });

    return [...previousMonthDays, ...currentMonthDays, ...nextMonthDays];
  };

  const today = new Date();

  const getEventsForDate = (date: Date) => {
    return events.filter((event) => {
      const eventStart = new Date(event.startTime)
      const eventEnd = new Date(event.endTime)
      const targetDate = new Date(date)

      // Set all dates to midnight for date comparison
      eventStart.setHours(0, 0, 0, 0)
      eventEnd.setHours(0, 0, 0, 0)
      targetDate.setHours(0, 0, 0, 0)

      return targetDate >= eventStart && targetDate <= eventEnd
    })
  }

  const getEventsForWeek = () => {
    const start = startOfWeek(currentDate, { weekStartsOn: 1 });
    const end = endOfWeek(currentDate, { weekStartsOn: 1 });
    return events.filter(event => 
      (new Date(event.startTime) >= start && new Date(event.startTime) <= end) ||
      (new Date(event.endTime) >= start && new Date(event.endTime) <= end) ||
      (new Date(event.startTime) <= start && new Date(event.endTime) >= end)
    );
  };

  useEffect(() => {
    const updateCalendars = async () => {
      try{
        const data = await getEvents()
        setEvents(data)
        console.log(data)
      }catch(err) {
        console.log(err)
      }
    }

    updateCalendars()
  }, [])

  return (
    <div className="h-full flex flex-col p-4">
      <CalendarHeader
        currentDate={currentDate}
        onPrevPeriod={prevPeriod}
        onNextPeriod={nextPeriod}
        onViewChange={setCurrentView}
        currentView={currentView}
      />
      <div className="flex-grow">
        {currentView === 'month' ? (
          <div className="h-full border rounded-lg overflow-hidden">
            <div className="grid grid-cols-7">
              {getWeekDays().map((day) => (
                <div key={day} className="p-2 text-center text-xs font-medium">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 h-[calc(100%-2rem)]">
              {getCalendarDays().map(({ date, isCurrentMonth }) => (
                <DayCell
                  key={date.toISOString()}
                  date={date}
                  isCurrentMonth={isCurrentMonth}
                  isToday={date.toDateString() === today.toDateString()}
                  events={getEventsForDate(date)}
                />
              ))}
            </div>
          </div>
        ) : (
          <WeekView currentDate={currentDate} events={getEventsForWeek()} today={today.toDateString()}/>
        )}
      </div>
    </div>
  );
};

