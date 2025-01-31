'use client'

import { Bell, User, MessageCircle, Heart, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Notification } from '@/types'

export function NotificationDropdown() {
  const notifications: Notification[] = [
    {
      id: '1',
      type: 'user',
      content: 'New user registered',
      timestamp: new Date(Date.now() - 5 * 60000),
    },
    {
      id: '2',
      type: 'comment',
      content: 'Rahmad commented on Admin',
      timestamp: new Date(Date.now() - 12 * 60000),
    },
    {
      id: '3',
      type: 'message',
      content: 'Reza send messages to you',
      timestamp: new Date(Date.now() - 12 * 60000),
    },
    {
      id: '4',
      type: 'like',
      content: 'Farrah liked Admin',
      timestamp: new Date(Date.now() - 17 * 60000),
    },
  ]

  const getNotificationIcon = (type: Notification['type']) => {
    const iconProps = { className: "h-4 w-4" }
    
    switch (type) {
      case 'user':
        return <div className="bg-blue-500 p-2 rounded-full"><User {...iconProps} className="text-white" /></div>
      case 'comment':
        return <div className="bg-green-500 p-2 rounded-full"><MessageCircle {...iconProps} className="text-white" /></div>
      case 'message':
        return <div className="bg-gray-200 p-2 rounded-full"><User {...iconProps} /></div>
      case 'like':
        return <div className="bg-red-500 p-2 rounded-full"><Heart {...iconProps} className="text-white" /></div>
    }
  }

  const formatRelativeTime = (date: Date) => {
    const diff = Math.floor((Date.now() - date.getTime()) / 60000)
    return `${diff} minutes ago`
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-green-500 text-[11px] text-white flex items-center justify-center">
            4
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="p-3 border-b">
          <h4 className="text-sm font-medium">You have 4 new notification</h4>
        </div>
        <div className="divide-y">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="flex items-start gap-3 p-3 hover:bg-muted/50 transition-colors"
            >
              {getNotificationIcon(notification.type)}
              <div className="flex-1 space-y-1">
                <p className="text-sm text-muted-foreground">
                  {notification.content}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatRelativeTime(notification.timestamp)}
                </p>
              </div>
            </div>
          ))}
        </div>
        <Button 
          variant="ghost" 
          className="w-full justify-between p-3 h-auto font-normal text-sm"
        >
          See all notifications
          <ChevronRight className="h-4 w-4" />
        </Button>
      </PopoverContent>
    </Popover>
  )
}

