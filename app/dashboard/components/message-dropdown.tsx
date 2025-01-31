'use client'

import { MessageSquare } from 'lucide-react'
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Message } from '@/types'

export function MessageDropdown() {
  const messages: Message[] = [
    {
      id: '1',
      sender: 'Jimmy Denis',
      content: 'How are you ?',
      timestamp: new Date(Date.now() - 5 * 60000),
    },
    {
      id: '2',
      sender: 'Chad',
      content: 'Ok, Thanks !',
      timestamp: new Date(Date.now() - 12 * 60000),
    },
    {
      id: '3',
      sender: 'Jhon Doe',
      content: 'Ready for the meeting today...',
      timestamp: new Date(Date.now() - 12 * 60000),
    },
    {
      id: '4',
      sender: 'Talha',
      content: 'Kese ho Sab khabar ?',
      timestamp: new Date(Date.now() - 17 * 60000),
    },
  ]

  const formatRelativeTime = (date: Date) => {
    const diff = Math.floor((Date.now() - date.getTime()) / 60000)
    return `${diff} minutes ago`
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <MessageSquare className="h-5 w-5"/>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between border-b p-3">
          <h4 className="text-sm font-medium">Messages</h4>
          <Button variant="link" className="h-auto p-0 text-sm">
            Mark all as read
          </Button>
        </div>
        <div className="divide-y">
          {messages.map((message) => (
            <div
              key={message.id}
              className="flex items-start gap-3 p-3 hover:bg-muted/50 transition-colors"
            >
              <Avatar className="h-8 w-8">
                <AvatarFallback>
                  {message.sender.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {message.sender}
                </p>
                <p className="text-sm text-muted-foreground">
                  {message.content}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatRelativeTime(message.timestamp)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}

