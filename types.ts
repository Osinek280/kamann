export interface Event {
  id: string;
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  recurring: boolean;
  createdById: number;
  instructorId: number;
  instructorFullName: number,
  maxParticipants: number;
  status: string;
  currentParticipants: null;
  eventTypeId: string;
  eventTypeName: string;
}

  // "id": 4,
  // "title": "CrossFit Extreme",
  // "description": "Push your limits with this CrossFit session.",
  // "startDate": "2025-02-04",
  // "endDate": "2025-02-04",
  // "time": "06:00:00",
  // "recurring": false,
  // "createdById": 1,
  // "instructorId": 5,
  // "instructorFullName": "Lucas Brown",
  // "maxParticipants": 20,
  // "status": "UPCOMING",
  // "currentParticipants": 0,
  // "eventTypeId": 4,
  // "eventTypeName": "CrossFit",
  // "frequency": "NONE",
  // "daysOfWeek": null,
  // "recurrenceEndDate": null


export interface Message {
  id: string
  sender: string
  content: string
  timestamp: Date
}

export interface Notification {
  id: string
  type: 'user' | 'comment' | 'message' | 'like'
  content: string
  timestamp: Date
}

export interface QuickAction {
  id: string
  name: string
  icon: React.ReactNode
  color: string
  darkColor: string
}

export interface DayCellProps {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  isWeekend: boolean;
  events: Event[];
}

interface type {
  title: string,
  color: string,
}

export const types: type[] = [
  { title: 'Pilates', color: '#3498db' },
  { title: 'CrossFit', color: '#e74c3c' },
  { title: 'Dance', color: '#f39c12' },
  { title: 'Yoga', color: '#2ecc71' },
]

export interface CalendarHeaderProps {
  currentDate: Date;
  onPrevPeriod: () => void;
  onNextPeriod: () => void;
  currentView: 'week' | 'month';
  available: boolean
}

export interface WeekViewProps {
  currentDate: Date;
  events: Event[];
  today: string;
}

export interface EventDetailsModalProps {
  event: Event | null
}