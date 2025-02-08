"use client"

import React, { useEffect, useState } from 'react';
import { DayCell } from './day-cell';
import { addDays, startOfWeek, endOfWeek, isWeekend } from 'date-fns';
import { getDayOfWeek, getDaysInMonth, getWeekDays } from '@/lib/dateUtils';
import { WeekView } from './week-view';
import { CalendarHeader } from './header';
import { getEvents } from '@/actions/getEvents';
import { useSearchParams } from 'next/navigation';
import { Occurrence } from '@/types';

export const Calendar: React.FC = () => {

  const searchParams = useSearchParams()


  const [currentDate, setCurrentDate] = useState(new Date());
  const currentView = (searchParams.get('view') as 'week' | 'month') || "month";
  const available = searchParams.get('available') === 'true'
  const [events, setEvents] = useState<Occurrence[]>([])

  console.log(available)

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
      const eventStart = event.start
      const eventEnd = event.end
      const targetDate = date

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
      (event.start >= start && event.start <= end) ||
      (event.end >= start && event.end <= end) ||
      (event.start <= start && event.end >= end)
    );
  };

  useEffect(() => {
    const updateCalendars = async () => {
      try{
        const data = await getEvents(available)
        setEvents(data)
        console.log("huj: ", data)
      }catch(err) {
        console.log(err)
      }
    }

    updateCalendars()
  }, [available])

  return (
    <div className="h-full flex flex-col p-4">
      <CalendarHeader
        currentDate={currentDate}
        onPrevPeriod={prevPeriod}
        onNextPeriod={nextPeriod}
        currentView={currentView}
        available={available}
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
                  isWeekend={isWeekend(date)}
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

