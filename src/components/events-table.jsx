"use client"

import { useState } from "react"
import { Edit, MoreHorizontal, Trash } from "lucide-react"
import { Button } from "./ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "./ui/badge"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "./ui/alert-dialog"
import { Input } from "@/components/ui/input"

// Sample data
const initialEvents = [
    {
        id: "1",
        title: "Pengajian Rutin Mingguan",
        date: "2025-05-18",
        time: "19:30",
        location: "Ruang Utama Masjid",
        status: "upcoming",
    },
    {
        id: "2",
        title: "Buka Puasa Bersama",
        date: "2025-05-20",
        time: "17:45",
        location: "Halaman Masjid",
        status: "upcoming",
    },
    {
        id: "3",
        title: "Kajian Tafsir Al-Quran",
        date: "2025-05-22",
        time: "20:00",
        location: "Ruang Utama Masjid",
        status: "upcoming",
    },
    {
        id: "4",
        title: "Sholat Idul Fitri",
        date: "2025-06-01",
        time: "07:00",
        location: "Lapangan Masjid",
        status: "upcoming",
    },
    {
        id: "5",
        title: "Santunan Anak Yatim",
        date: "2025-06-05",
        time: "09:00",
        location: "Aula Masjid",
        status: "upcoming",
    },
]

export function EventsTable() {
    const [events, setEvents] = useState(initialEvents)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [eventToDelete, setEventToDelete] = useState(null)
    const [searchQuery, setSearchQuery] = useState("")

    const handleDelete = (id) => {
        setEventToDelete(id)
        setIsDeleteDialogOpen(true)
    }

    const confirmDelete = () => {
        if (eventToDelete) {
            setEvents(events.filter((event) => event.id !== eventToDelete))
            setIsDeleteDialogOpen(false)
            setEventToDelete(null)
        }
    }

    const filteredEvents = events.filter(
        (event) =>
            event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event.location.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    return (
        <div className="space-y-4">
            <div className="flex items-center">
                <Input
                    placeholder="Cari event..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="max-w-sm"
                />
            </div>

            <div className="border rounded-md">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Judul Event</TableHead>
                            <TableHead>Tanggal</TableHead>
                            <TableHead>Waktu</TableHead>
                            <TableHead>Lokasi</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredEvents.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="py-8 text-center text-muted-foreground">
                                    Tidak ada event yang ditemukan
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredEvents.map((event) => (
                                <TableRow key={event.id}>
                                    <TableCell className="font-medium">{event.title}</TableCell>
                                    <TableCell>
                                        {new Date(event.date).toLocaleDateString("id-ID", {
                                            day: "numeric",
                                            month: "long",
                                            year: "numeric",
                                        })}
                                    </TableCell>
                                    <TableCell>{event.time}</TableCell>
                                    <TableCell>{event.location}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                                            Upcoming
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <MoreHorizontal className="w-4 h-4" />
                                                    <span className="sr-only">Menu</span>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem>
                                                    <Edit className="w-4 h-4 mr-2" />
                                                    Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleDelete(event.id)} className="text-red-600">
                                                    <Trash className="w-4 h-4 mr-2" />
                                                    Hapus
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Tindakan ini tidak dapat dibatalkan. Event ini akan dihapus secara permanen dari server.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
                            Hapus
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}
