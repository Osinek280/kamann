"use client";

import { Separator } from '@/components/ui/separator';
import clsx from 'clsx';
import {
  Banknote,
  Folder,
  HomeIcon,
  Settings
} from "lucide-react";
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  {
    path: "/dashboard",
    label: "Home",
    icon: HomeIcon,
  },
  {
    path: "/dashboard/projects",
    label: "Projects",
    icon: Folder,
  },
  {
    path: "/dashboard/finance",
    label: "Finance",
    icon: Banknote,
  },
  {
    path: "/dashboard/settings",
    label: "Settings",
    icon: Settings,
    separator: true, // Dodaj separator przed tym linkiem
  },
];

export default function DashboardSideBar() {
  const pathname = usePathname();

  return (
    <div className="lg:block hidden border-r h-full bg-[#1A2035]">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-[70px] items-center justify-between border-b px-6 w-full">
          <Link className="flex items-center gap-2 font-semibold" href="/">
            <Image
              src="/logo_light.svg"
              alt="Kamann logo"
              height={40}
              width={150}
            />
          </Link>
      
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-4 text-sm font-medium">
            {navItems.map(({ path, label, icon: Icon, separator }) => (
              <div key={path}>
                {separator && <Separator className="my-3" />}
                <Link
                  className={clsx(
                    "flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                    {
                      "flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-gray-900 transition-all dark:bg-gray-800 dark:text-gray-50": pathname === path,
                    }
                  )}
                  href={path}
                >
                  <div className="border rounded-lg dark:bg-black dark:border-gray-800 border-gray-400 p-1 bg-white">
                    <Icon className="h-3 w-3" />
                  </div>
                  {label}
                </Link>
              </div>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
