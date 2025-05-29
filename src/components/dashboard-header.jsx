"use client"

import { useRouter } from "next/navigation"
import { Bell, User, LogOut } from "lucide-react"
import { Button } from "./ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "./ui/avatar"
import { deleteCookie } from 'cookies-next'

export function DashboardHeader() {
    const router = useRouter()

    const handleLogout = () => {
        deleteCookie('isAdmin')
        router.push('/admin/login')
    }

    return (
        <header className="sticky top-0 z-30 flex items-center h-16 gap-4 px-4 border-b bg-background md:px-6">
            <div className="flex items-center gap-4 ml-auto">
                {/* <Button variant="outline" size="icon" className="relative">
                    <Bell className="w-5 h-5" />
                    <span className="absolute flex items-center justify-center w-5 h-5 text-xs text-white rounded-full -top-1 -right-1 bg-amber-600">
                        3
                    </span>
                </Button>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon" className="rounded-full">
                            <Avatar className="w-8 h-8">
                                <AvatarFallback className="bg-amber-100 text-amber-800">AT</AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Akun Saya</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <User className="w-4 h-4 mr-2" />
                            <span>Profil</span>
                        </DropdownMenuItem> 
                        <DropdownMenuItem>Pengaturan</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <LogOut className="w-4 h-4 mr-2" />
                            <span>Keluar</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu> */}
                <Button variant="ghost" onClick={handleLogout} className="gap-2">
                    <LogOut className="w-4 h-4" />
                    Logout
                </Button>
            </div>
        </header>
    )
}
