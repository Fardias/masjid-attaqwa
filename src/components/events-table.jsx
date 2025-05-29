"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import useSWR from "swr"
import { Edit, MoreHorizontal, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
import { getUpcomingEvents, deleteEvent } from "@/lib/services/eventService"
import { toast, Toaster } from "sonner"

const fetcher = () => getUpcomingEvents()

export function EventsTable() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const { data: events, error, mutate: refreshEvents } = useSWR("upcoming-events", fetcher)

    const [searchQuery, setSearchQuery] = useState("")
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [eventToDelete, setEventToDelete] = useState(null)

    
    useEffect(() => {
        const status = searchParams.get("status")
        if (status === "created") {
            toast.success("Event baru berhasil ditambahkan!", {
                duration: 5000,
            })
            
            const url = new URL(window.location.href)
            url.searchParams.delete("status")
            window.history.replaceState({}, "", url)
        } else if (status === "updated") {
            toast.success("Event berhasil diperbarui!", {
                duration: 5000,
            })
            
            const url = new URL(window.location.href)
            url.searchParams.delete("status")
            window.history.replaceState({}, "", url)
        }
    }, [searchParams])

    const filteredEvents = (events || []).filter(
        (event) =>
            (event.judul ?? "").toLowerCase().includes(searchQuery.toLowerCase()) ||
            (event.lokasi ?? "").toLowerCase().includes(searchQuery.toLowerCase()),
    )

    const handleDelete = async () => {
        if (!eventToDelete) return

        try {
            await deleteEvent(eventToDelete)
            
            refreshEvents()
            toast.success("Event berhasil dihapus!")
            setEventToDelete(null)
            setIsDeleteDialogOpen(false)
        } catch (error) {
            console.error("Error deleting event:", error)
            toast.error("Gagal menghapus event. Silakan coba lagi.")
        }
    }

    const handleEdit = (eventId) => {
        router.push(`/admin/dashboard/events/edit/${eventId}`)
    }

    const getStatusBadgeVariant = (status) => {
        switch (status) {
            case "upcoming":
                return "bg-amber-50 text-amber-700 border-amber-200"
            case "ongoing":
                return "bg-green-50 text-green-700 border-green-200"
            case "completed":
                return "bg-gray-50 text-gray-700 border-gray-200"
            default:
                return "bg-amber-50 text-amber-700 border-amber-200"
        }
    }

    if (error) return <p className="mt-6 text-center text-red-500">Gagal memuat acara.</p>
    if (!events) return <p className="mt-6 text-center text-gray-500">Memuat acara...</p>

    return (
        <div className="space-y-4">
            <Toaster position="top-center" />
            <Input
                placeholder="Cari acara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-sm"
            />

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
                                    Tidak ada acara yang ditemukan
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredEvents.map((event) => (
                                <TableRow key={event.id}>
                                    <TableCell>{event.judul}</TableCell>
                                    <TableCell>
                                        {new Date(event.tanggal_mulai).toLocaleDateString("id-ID", {
                                            day: "numeric",
                                            month: "long",
                                            year: "numeric",
                                        })}
                                    </TableCell>
                                    <TableCell>{event.waktu}</TableCell>
                                    <TableCell>{event.lokasi ?? "Masjid At-Taqwa"}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className={getStatusBadgeVariant(event.status)}>
                                            {event.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right ">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className={"cursor-pointer"}>
                                                    <MoreHorizontal className="w-4 h-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem onClick={() => handleEdit(event.id)} className={"cursor-pointer"}>
                                                    <Edit className="w-4 h-4 mr-2" />
                                                    Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() => {
                                                        setEventToDelete(event.id)
                                                        setIsDeleteDialogOpen(true)
                                                    }}
                                                    className="text-red-600 cursor-pointer"
                                                >
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
                            Tindakan ini tidak dapat dibatalkan. Acara ini akan dihapus dari database secara permanen.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
                            Hapus
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}
