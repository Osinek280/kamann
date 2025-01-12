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
    <div className="lg:block hidden h-full bg-[#1A2035]">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-[70px] items-center justify-between px-6 w-full">
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
          <nav className="grid items-start text-sm font-medium">
            {navItems.map(({ path, label, icon: Icon }) => (
              <div key={path}>
                <Link
                  className={clsx(
                    "flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 hover:text-[#6861CE] hover:bg-[#161B2C]",
                    {
                      "text-[#6861CE] bg-[#161B2C]": pathname === path,
                    }
                  )}
                  href={path}
                >
                  <div>
                    <Icon className="h-4 w-4" />
                  </div>
                  <p className='text-primary-foreground'>{label}</p>
                </Link>
              </div>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
