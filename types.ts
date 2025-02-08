export interface Occurrence {
  occurrenceId: number;
  title: string;
  start: Date;
  end: Date;
  instructorFullName: number,
  eventId: number;
}

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
  events: Occurrence[];
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
  events: Occurrence[];
  today: string;
}

export interface EventDetailsModalProps {
  event: Event | null
}