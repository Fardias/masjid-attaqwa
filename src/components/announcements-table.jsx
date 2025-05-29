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
} from "../components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"
import { Badge } from "../components/ui/badge"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "../components/ui/alert-dialog"
import { Input } from "../components/ui/input"
import useSWR from "swr"
import { deletePengumuman, getPengumuman, updatePengumuman } from "../lib/services/PengumumanService"
import { useRouter } from "next/navigation"

const fetchAnnouncements = () =>  getPengumuman()

export function AnnouncementsTable() {
    const router = useRouter()
    const { data: announcements, error, mutate: refreshAnnouncements } = useSWR("announcements", fetchAnnouncements)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [announcementToDelete, setAnnouncementToDelete] = useState(null)
    const [searchQuery, setSearchQuery] = useState("")

    if (error) return <div>Error loading announcements</div>
    if (!announcements) return <div>Loading...</div>

    const handleDelete = (id) => {
        deletePengumuman(id)
        setAnnouncementToDelete(id)
        setIsDeleteDialogOpen(true)
    }

    const confirmDelete = () => {
        if (announcementToDelete) {
            // Update to use refreshAnnouncements instead of setAnnouncements
            refreshAnnouncements()
            setIsDeleteDialogOpen(false)
            setAnnouncementToDelete(null)
        }
    }

    const toggleStatus = (id) => {
        updatePengumuman(id, { status: "active" })
        refreshAnnouncements()
    }

    const handleUpdate = (e) => {
        const { id } = e
        router.push(`/admin/dashboard/announcements/edit/${id}`)
    }

    const filteredAnnouncements = announcements.filter(
        (announcement) =>
            announcement.title.toLowerCase().includes(searchQuery.toLowerCase())
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
                            <TableHead>Isi Pengumuman</TableHead>
                            {/* <TableHead>Status</TableHead> */}
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
                                    <TableCell className="max-w-[300px]">
                                        <div className="break-words whitespace-normal">
                                            {announcement.excerpt}
                                        </div>
                                    </TableCell>
                                    {/* <TableCell>
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
                                    </TableCell> */}
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
                                                {/* <DropdownMenuItem onClick={() => toggleStatus(announcement)}>
                                                    {announcement.status === "active" ? "Nonaktifkan" : "Aktifkan"}
                                                </DropdownMenuItem> */}
                                                <DropdownMenuItem onClick={()=> handleUpdate(announcement)}>
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
