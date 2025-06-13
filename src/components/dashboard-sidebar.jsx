"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Calendar,
  Home,
  ImageIcon,
  Megaphone,
  Menu,
  Moon,
  Sun,
  Users2,
} from "lucide-react"
import { Button } from "./ui/button"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import { useTheme } from "next-themes"
import { cn } from "../lib/utils"

export function DashboardSidebar() {
  const pathname = usePathname()
  const { setTheme, theme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  const routes = [
    {
      href: "/admin/dashboard",
      label: "Dashboard",
      icon: Home,
      active: pathname === "/admin/dashboard",
    },
    {
      href: "/admin/dashboard/events",
      label: "Acara Mendatang",
      icon: Calendar,
      active: pathname.includes("/admin/dashboard/events"),
    },
    {
      href: "/admin/dashboard/announcements",
      label: "Pengumuman",
      icon: Megaphone,
      active: pathname.includes("/admin/dashboard/announcements"),
    },
    {
      href: "/admin/dashboard/albums",
      label: "Album Foto",
      icon: ImageIcon,
      active: pathname.includes("/admin/dashboard/albums"),
    },
    {
      href: "/admin/dashboard/edit-banner",
      label: "Banner Masjid",
      icon: ImageIcon,
      active: pathname.includes("/admin/dashboard/edit-banner"),
    },
    {
      href: "/admin/dashboard/pengurus",
      label: "Pengurus Masjid",
      icon: Users2,
      active: pathname.includes("/admin/dashboard/pengurus"),
    },
    {
      href: "/",
      label: "Back to Website",
      icon: Home,
    },
  ]

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="fixed z-40 md:hidden top-4 left-4"
          >
            <Menu className="w-5 h-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 bg-white">
          <SidebarContent routes={routes} onLinkClick={() => setIsOpen(false)} />
        </SheetContent>
      </Sheet>

      <div className="fixed top-0 left-0 z-30 flex-col hidden w-64 h-screen bg-white border-r md:flex">
        <SidebarContent routes={routes} />
      </div>
    </>
  )
}

function SidebarContent({ routes, onLinkClick }) {
  const { setTheme, theme } = useTheme()

  return (
    <>
      <div className="px-3 py-4 border-b">
        <div className="flex items-center justify-center mb-6">
          <Link href="/" className="text-2xl font-bold text-amber-600">
            Masjid At-Taqwa
          </Link>
        </div>
        <nav className="space-y-1">
          {routes.map((route) => (
            <Link key={route.href} href={route.href}>
              <span
                onClick={onLinkClick}
                className={cn(
                  "flex items-center px-3 py-2 text-md rounded-md transition-colors cursor-pointer",
                  route.active
                    ? "bg-amber-600 text-amber-50"
                    : "hover:bg-amber-600 text-amber-500 hover:text-white"
                )}
              >
                <route.icon className="w-5 h-5 mr-3" />
                {route.label}
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </>
  )
}
