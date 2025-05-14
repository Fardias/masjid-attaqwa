"use client"

import { useState } from "react"
import Image from "next/image"
import { Edit, MoreHorizontal, Trash } from "lucide-react"
import { Button } from "./ui/button"
import { Card, CardContent, CardFooter } from "@/app/components/ui/card"
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
import { cn } from "@/lib/utils"

// Sample data
const initialAlbums = [
    {
        id: "1",
        title: "Santunan Anak Yatim",
        date: "2025-04-15",
        category: "social",
        imageCount: 24,
        thumbnail: "/placeholder.svg?height=400&width=600",
    },
    {
        id: "2",
        title: "Perayaan Maulid Nabi",
        date: "2025-03-20",
        category: "islamic",
        imageCount: 36,
        thumbnail: "/placeholder.svg?height=400&width=600",
    },
    {
        id: "3",
        title: "Bakti Sosial Banjir",
        date: "2025-02-10",
        category: "social",
        imageCount: 18,
        thumbnail: "/placeholder.svg?height=400&width=600",
    },
    {
        id: "4",
        title: "Sholat Idul Adha",
        date: "2025-01-05",
        category: "islamic",
        imageCount: 42,
        thumbnail: "/placeholder.svg?height=400&width=600",
    },
    {
        id: "5",
        title: "Pembagian Sembako",
        date: "2024-12-28",
        category: "social",
        imageCount: 30,
        thumbnail: "/placeholder.svg?height=400&width=600",
    },
    {
        id: "6",
        title: "Isra Mi'raj",
        date: "2024-11-15",
        category: "islamic",
        imageCount: 27,
        thumbnail: "/placeholder.svg?height=400&width=600",
    },
]

export function AlbumsGrid({ filter = "all" }) {
    const [albums, setAlbums] = useState(initialAlbums)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [albumToDelete, setAlbumToDelete] = useState(null)
    const [searchQuery, setSearchQuery] = useState("")

    const handleDelete = (id) => {
        setAlbumToDelete(id)
        setIsDeleteDialogOpen(true)
    }

    const confirmDelete = () => {
        if (albumToDelete) {
            setAlbums(albums.filter((album) => album.id !== albumToDelete))
            setIsDeleteDialogOpen(false)
            setAlbumToDelete(null)
        }
    }

    const filteredAlbums = albums.filter(
        (album) =>
            (filter === "all" || album.category === filter) && album.title.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    return (
        <div className="space-y-4">
            <div className="flex items-center">
                <Input
                    placeholder="Cari album..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="max-w-sm"
                />
            </div>

            {filteredAlbums.length === 0 ? (
                <div className="py-12 text-center text-muted-foreground">Tidak ada album yang ditemukan</div>
            ) : (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredAlbums.map((album) => (
                        <Card key={album.id} className="overflow-hidden">
                            <div className="relative aspect-video">
                                <Image src={album.thumbnail || "/placeholder.svg"} alt={album.title} fill className="object-cover" />
                                <Badge
                                    className={cn(
                                        "absolute top-2 right-2",
                                        album.category === "social" ? "bg-amber-500" : "bg-amber-600",
                                    )}
                                >
                                    {album.category === "social" ? "Kegiatan Sosial" : "Hari Besar Islam"}
                                </Badge>
                            </div>
                            <CardContent className="p-4">
                                <h3 className="text-lg font-semibold truncate">{album.title}</h3>
                                <p className="text-sm text-muted-foreground">
                                    {new Date(album.date).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                                </p>
                                <p className="text-sm">{album.imageCount} foto</p>
                            </CardContent>
                            <CardFooter className="flex justify-between p-4 pt-0">
                                <Button variant="outline" size="sm">
                                    Lihat Album
                                </Button>
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
                                        <DropdownMenuItem onClick={() => handleDelete(album.id)} className="text-red-600">
                                            <Trash className="w-4 h-4 mr-2" />
                                            Hapus
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}

            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Tindakan ini tidak dapat dibatalkan. Album ini akan dihapus secara permanen dari server.
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
