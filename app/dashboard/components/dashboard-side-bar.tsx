'use client';

import { Banknote, Calendar, HomeIcon, Settings } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { path: '/dashboard', label: 'Home', icon: HomeIcon },
  { path: '/dashboard/client/calendar', label: 'Calendar', icon: Calendar },
  { path: '/dashboard/finance', label: 'Finance', icon: Banknote },
  { path: '/dashboard/settings', label: 'Settings', icon: Settings },
];

export default function DashboardSideBar() {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex md:flex-col md:w-64 md:bg-gray-900 md:text-gray-100 p-4">
      <Link href="/" className="flex items-center gap-2 font-semibold mb-6 pl-3 pt-3">
        <Image src="/logo_light.svg" alt="Kamann logo" height={40} width={150} priority />
      </Link>
      <nav className="flex-1 space-y-2">
        {navItems.map(({ path, label, icon: Icon }) => {
          const isActive = pathname === path;
          return (
            <Link
              key={path}
              href={path}
              className={`flex items-center p-3 rounded-lg transition-colors duration-200 ${
                isActive ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5 mr-3" />
              {label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}