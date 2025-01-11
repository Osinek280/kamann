"use client"
import React, { ReactNode } from 'react'
import Link from 'next/link'
import { Banknote, Folder, HamIcon, HomeIcon, LogOut, MessageSquare, Search, Settings, User, UserPlus } from 'lucide-react'

import { ModeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { MessageDropdown } from './message-dropdown'
import { NotificationDropdown } from './notification-dropdown'
import { QuickActions, actions } from './quick-actions'
 
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function DropdownMenuDemo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <MessageSquare />
            <span>Messages</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings />
            <span>Nofications</span>
          </DropdownMenuItem>
          <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <UserPlus />
              <span>Quick Actions</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                {actions.map((el) => (
                  <DropdownMenuItem key={el.id}>
                    {el.icon}
                    <span>{el.name}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default function DashboardTopNav({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col">
      <header className="flex h-14 lg:h-[70px] items-center gap-4 border-b px-3">
        <MobileNavigation />
        <SearchBar />
        <div className="flex items-center gap-2 ml-auto">
          <DropdownMenuDemo />
          <div className='hidden lg:block'>
            <MessageDropdown />
            <NotificationDropdown />
            <QuickActions />
            <ModeToggle />
          </div> 
        </div>
      </header>
      {children}
    </div>
  )
}

function MobileNavigation() {
  return (
    <Dialog>
      <SheetTrigger className="min-[1024px]:hidden p-2 transition">
        <HamIcon />
        <span className="sr-only">Menu</span>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <Link href="/">
            <SheetTitle>Kamman</SheetTitle>
          </Link>
        </SheetHeader>
        <nav className="flex flex-col space-y-3 mt-[1rem]">
          <NavItem href="/dashboard" icon={HomeIcon}>
            Home
          </NavItem>
          <NavItem href="/dashboard/projects" icon={Folder}>
            Projects
          </NavItem>
          <NavItem href="/dashboard/finance" icon={Banknote}>
            Finance
          </NavItem>
          <Separator className="my-3" />
          <NavItem href="/dashboard/settings" icon={Settings}>
            Settings
          </NavItem>
        </nav>
      </SheetContent>
    </Dialog>
  )
}

function NavItem({ href, icon: Icon, children }: { href: string; icon: React.ElementType; children: ReactNode }) {
  return (
    <DialogClose asChild>
      <Link href={href}>
        <Button variant="outline" className="w-full">
          <Icon className="mr-2 h-4 w-4" />
          {children}
        </Button>
      </Link>
    </DialogClose>
  )
}

function SearchBar() {
  return (
    <div className="relative w-96 hidden lg:block">
      <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
      <Input type="search" placeholder="Szukaj..." className="pl-10" />
    </div>
  )
}
