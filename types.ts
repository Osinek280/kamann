export interface Event {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  recurring: boolean;
  createdById: number;
  instructorId: number;
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
  events: Event[];
}

export const types = {
  Pilates: "#3498db",  
  crossFit: "#e74c3c", 
  Dance: "#f39c12",  
  Yoga: "#2ecc71"  
};

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