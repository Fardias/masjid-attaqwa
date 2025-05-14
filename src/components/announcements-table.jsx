"use client"

import { cn } from "@/lib/utils"

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
import { Badge } from "@/components/ui/badge"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"

// Sample data
const initialAnnouncements = [
    {
        id: "1",
        title: "Jadwal Sholat Ramadhan",
        date: "2025-05-15",
        status: "active",
        author: "Ustadz Ahmad",
    },
    {
        id: "2",
        title: "Pengumpulan Zakat Fitrah",
        date: "2025-05-18",
        status: "active",
        author: "Panitia Zakat",
    },
    {
        id: "3",
        title: "Renovasi Tempat Wudhu",
        date: "2025-05-10",
        status: "active",
        author: "Pengurus Masjid",
    },
    {
        id: "4",
        title: "Jadwal Imam Tarawih",
        date: "2025-05-05",
        status: "inactive",
        author: "Sekretaris Masjid",
    },
    {
        id: "5",
        title: "Pemberitahuan Libur Idul Fitri",
        date: "2025-04-28",
        status: "inactive",
        author: "Ketua DKM",
    },
]

export function AnnouncementsTable() {
    const [announcements, setAnnouncements] = useState(initialAnnouncements)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [announcementToDelete, setAnnouncementToDelete] = useState(null)
    const [searchQuery, setSearchQuery] = useState("")

    const handleDelete = (id) => {
        setAnnouncementToDelete(id)
        setIsDeleteDialogOpen(true)
    }

    const confirmDelete = () => {
        if (announcementToDelete) {
            setAnnouncements(announcements.filter((announcement) => announcement.id !== announcementToDelete))
            setIsDeleteDialogOpen(false)
            setAnnouncementToDelete(null)
        }
    }

    const toggleStatus = (id) => {
        setAnnouncements(
            announcements.map((announcement) =>
                announcement.id === id
                    ? { ...announcement, status: announcement.status === "active" ? "inactive" : "active" }
                    : announcement,
            ),
        )
    }

    const filteredAnnouncements = announcements.filter(
        (announcement) =>
            announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            announcement.author.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    return (
        <div className="space-y-4">
            <div className="flex items-center">
                <Input
                    placeholder="Cari pengumuman..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="max-w-sm"
                />
            </div>

            <div className="border rounded-md">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Judul Pengumuman</TableHead>
                            <TableHead>Tanggal</TableHead>
                            <TableHead>Penulis</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredAnnouncements.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="py-8 text-center text-muted-foreground">
                                    Tidak ada pengumuman yang ditemukan
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredAnnouncements.map((announcement) => (
                                <TableRow key={announcement.id}>
                                    <TableCell className="font-medium">{announcement.title}</TableCell>
                                    <TableCell>
                                        {new Date(announcement.date).toLocaleDateString("id-ID", {
                                            day: "numeric",
                                            month: "long",
                                            year: "numeric",
                                        })}
                                    </TableCell>
                                    <TableCell>{announcement.author}</TableCell>
                                    <TableCell>
                                        <Badge
                                            variant="outline"
                                            className={cn(
                                                announcement.status === "active"
                                                    ? "bg-amber-50 text-amber-700 border-amber-200"
                                                    : "bg-gray-50 text-gray-700 border-gray-200",
                                            )}
                                        >
                                            {announcement.status === "active" ? "Aktif" : "Tidak Aktif"}
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
                                                <DropdownMenuItem onClick={() => toggleStatus(announcement.id)}>
                                                    {announcement.status === "active" ? "Nonaktifkan" : "Aktifkan"}
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <Edit className="w-4 h-4 mr-2" />
                                                    Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleDelete(announcement.id)} className="text-red-600">
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
                            Tindakan ini tidak dapat dibatalkan. Pengumuman ini akan dihapus secara permanen dari server.
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
