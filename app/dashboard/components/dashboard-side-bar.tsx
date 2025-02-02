"use client";

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
  },
];

export default function DashboardSideBar() {
  const pathname = usePathname();

  return (
  <div className="hidden md:flex md:flex-col md:w-64 md:bg-gray-900 md:text-gray-100">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-white">Dance Studio</h2>
      </div>
      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.path
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center p-3 rounded-lg transition-colors duration-200 ${
                isActive ? "bg-gray-800 text-white" : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </Link>
          )
        })}
      </nav>
    </div>
  );
}
