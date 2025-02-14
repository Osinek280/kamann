'use client'

import { Calendar, Map, FileText, Mail, FileCheck, CreditCard, Layers } from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { QuickAction } from '@/types'

export const actions: QuickAction[] = [
  {
    id: '1',
    name: 'Calendar',
    icon: <Calendar className="h-5 w-5" />,
    color: 'bg-red-400',
    darkColor: 'dark:bg-red-600'
  },
  {
    id: '2',
    name: 'Maps',
    icon: <Map className="h-5 w-5" />,
    color: 'bg-orange-400',
    darkColor: 'dark:bg-orange-600'
  },
  {
    id: '3',
    name: 'Reports',
    icon: <FileText className="h-5 w-5" />,
    color: 'bg-blue-400',
    darkColor: 'dark:bg-blue-600'
  },
  {
    id: '4',
    name: 'Emails',
    icon: <Mail className="h-5 w-5" />,
    color: 'bg-green-500',
    darkColor: 'dark:bg-green-700'
  },
  {
    id: '5',
    name: 'Invoice',
    icon: <FileCheck className="h-5 w-5" />,
    color: 'bg-blue-500',
    darkColor: 'dark:bg-blue-700'
  },
  {
    id: '6',
    name: 'Payments',
    icon: <CreditCard className="h-5 w-5" />,
    color: 'bg-indigo-500',
    darkColor: 'dark:bg-indigo-700'
  },
]

export function QuickActions() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <Layers />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="bg-[#1A2035] text-white p-4 rounded-t-lg">
          <h4 className="font-medium">Quick Actions</h4>
          <p className="text-sm text-blue-100 dark:text-blue-300">Shortcuts</p>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-3 gap-4">
            {actions.map((action) => (
              <Button
                key={action.id}
                variant="ghost"
                className="flex flex-col items-center gap-2 h-auto p-4"
              >
                <div className={cn(
                  "p-3 rounded-full",
                  action.color,
                  action.darkColor,
                )}>
                  <div className="text-white">
                    {action.icon}
                  </div>
                </div>
                <span className="text-sm text-blue-500 dark:text-blue-300">{action.name}</span>
              </Button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
