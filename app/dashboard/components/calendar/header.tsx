import React from 'react';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, CalendarIcon } from 'lucide-react';
import { format, startOfWeek, endOfWeek } from 'date-fns';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Calendar {
  id: string;
  title: string;
  color: string;
}

interface CalendarHeaderProps {
  currentDate: Date;
  onPrevPeriod: () => void;
  onNextPeriod: () => void;
  onViewChange: (view: 'week' | 'month') => void;
  currentView: 'week' | 'month';
  myPlans: Calendar[],
}


export const CalendarHeader = ({
  myPlans,
  currentDate,
  onPrevPeriod,
  onNextPeriod,
  onViewChange,
  currentView,
}: CalendarHeaderProps) => {
  const formatDate = () => {
    if (currentView === 'month') {
      return format(currentDate, 'MMMM yyyy');
    } else {
      const start = startOfWeek(currentDate, { weekStartsOn: 0 });
      const end = endOfWeek(currentDate, { weekStartsOn: 0 });
      return `${format(start, 'd MMM')} - ${format(end, 'd MMM yyyy')}`;
    }
  };

  console.log(myPlans)

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-bold">{formatDate()}</h2>
          <div className='flex border border-input rounded-md overflow-hidden h-9 cursor-pointer'>
            <div 
              className='hover:bg-accent hover:text-accent-foreground h-9 px-3 flex justify-center items-center' 
              onClick={onPrevPeriod} >
              <ChevronLeft className="h-4 w-4" />
            </div>
            <div className='hidden sm:flex hover:bg-accent hover:text-accent-foreground h-9 px-3 justify-center items-center'>
              Today
            </div>
            <div 
              className='hover:bg-accent hover:text-accent-foreground h-9 px-3 flex justify-center items-center border-l sm:border-none' 
              onClick={onNextPeriod}>
              <ChevronRight className="h-4 w-4" />
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2 h-9">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-[110px]">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {currentView === 'week' ? 'Week' : 'Month'}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onViewChange('week')}>Week</DropdownMenuItem>
              <DropdownMenuItem onClick={() => onViewChange('month')}>Month</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </>
  );
};