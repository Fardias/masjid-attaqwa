"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Calendar, Home, ImageIcon, Megaphone, Menu, Moon, Settings, Sun } from "lucide-react"
import { Button } from "./ui/button"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

export function DashboardSidebar() {
    const pathname = usePathname()
    const { setTheme, theme } = useTheme()

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
            href: "/",
            label: "Back to Website",
            icon: Home,
            // active: pathname.includes("/"),
        },
    ]

    return (
        <>
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="fixed z-40 md:hidden top-4 left-4">
                        <Menu className="w-5 h-5" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 bg-white">
                    <SidebarContent routes={routes} />
                </SheetContent>
            </Sheet>

            {/* <div className="flex-col hidden w-64 h-screen border-r md:flex bg-amber-100 "> */}
            <div className="fixed top-0 left-0 z-30 flex-col hidden w-64 h-screen bg-white border-r md:flex">
                <SidebarContent routes={routes} />
            </div>
        </>
    )
}

function SidebarContent({ routes }) {
    const { setTheme, theme } = useTheme()

    return (
        <>
            <div className="px-3 py-4 border-b">
                <div className="flex items-center justify-center mb-6">
                    <Link href="/" className="text-2xl font-bold text-amber-600">Masjid At-Taqwa</Link>
                </div>
                <nav className="space-y-1">
                    {routes.map((route) => (
                        <Link
                            key={route.href}
                            href={route.href}
                            className={cn(
                                "flex items-center px-3 py-2 text-md rounded-md transition-colors",
                                route.active
                                    ? "bg-amber-600 text-amber-50"
                                    : "hover:bg-amber-600 text-amber-500 hover:text-white",
                            )}
                        >
                            <route.icon className="w-5 h-5 mr-3" />
                            {route.label}
                        </Link>
                    ))}
                </nav>
            </div>
            {/* <div className="p-4 mt-auto border-t">
                <Button
                    variant="outline"
                    size="icon"
                    className="ml-auto"
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                >
                    <Sun className="w-5 h-5 transition-all scale-100 rotate-0 dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute w-5 h-5 transition-all scale-0 rotate-90 dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </div> */}
        </>
    )
}
// function SidebarContent({ routes }) {
//     const { setTheme, theme } = useTheme()

//     return (
//         <>
//             <div className="px-3 py-4 border-b">
//                 <div className="flex items-center justify-center mb-6">
//                     <h1 className="text-2xl font-bold text-amber-800 dark:text-amber-300">Masjid At-Taqwa</h1>
//                 </div>
//                 <nav className="space-y-1">
//                     {routes.map((route) => (
//                         <Link
//                             key={route.href}
//                             href={route.href}
//                             className={cn(
//                                 "flex items-center px-3 py-2 text-sm rounded-md transition-colors",
//                                 route.active
//                                     ? "bg-amber-200 text-amber-900 dark:bg-amber-800 dark:text-amber-50"
//                                     : "text-amber-700 hover:bg-amber-100 dark:text-amber-300 dark:hover:bg-amber-950",
//                             )}
//                         >
//                             <route.icon className="w-5 h-5 mr-3" />
//                             {route.label}
//                         </Link>
//                     ))}
//                 </nav>
//             </div>
//             <div className="p-4 mt-auto border-t">
//                 <Button
//                     variant="outline"
//                     size="icon"
//                     className="ml-auto"
//                     onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
//                 >
//                     <Sun className="w-5 h-5 transition-all scale-100 rotate-0 dark:-rotate-90 dark:scale-0" />
//                     <Moon className="absolute w-5 h-5 transition-all scale-0 rotate-90 dark:rotate-0 dark:scale-100" />
//                     <span className="sr-only">Toggle theme</span>
//                 </Button>
//             </div>
//         </>
//     )
// }
