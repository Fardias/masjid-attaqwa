'use client'
import React, { useState } from "react"
import Link from "next/link"
import { Pencil, Plus, Trash2 } from "lucide-react"
import useSWR, { mutate } from "swr"
import { DashboardHeader } from "../../../../components/dashboard-header"
import { Button } from "../../../../components/ui/button"
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "../../../../components/ui/table"
import { getPengurus, deletePengurus } from "../../../../lib/services/pengurusService"
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from "../../../../components/ui/alert-dialog"
import { toast } from "sonner"

const fetchPengurusMasjid = () => getPengurus()

export default function PengurusPage() {
    const { data: pengurusMasjid, error, isLoading } = useSWR(
        "pengurusMasjid",
        fetchPengurusMasjid,
        {
            revalidateOnFocus: false,
            refreshInterval: 0,
            dedupingInterval: 60000,
            onError: (err) => {
                console.error("Gagal memuat data pengurus masjid:", err)
            },
        }
    )

    const [selectedId, setSelectedId] = useState(null)

    function capitalizeWords(str) {
        return str.replace(/\b\w/g, (char) => char.toUpperCase())
    }

    const sortedPengurusMasjid = pengurusMasjid
        ? [...pengurusMasjid].sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
        : []

    async function onDeletePengurus(id) {
        try {
            await deletePengurus(id)
            mutate("pengurusMasjid")
            toast.success("Pengurus berhasil dihapus.")
        } catch (error) {
            toast.error("Gagal menghapus pengurus. Silakan coba lagi.")
        }
    }

    return (
        <div className="flex flex-col">
            <DashboardHeader />
            <div className="flex-1 p-4 pt-6 space-y-6 md:p-8">
                <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-bold tracking-tight">Pengurus Masjid</h2>
                    <Link href="/admin/dashboard/pengurus/new">
                        <Button>
                            <Plus className="w-4 h-4 mr-2" />
                            Tambah Pengurus
                        </Button>
                    </Link>
                </div>

                <div className="bg-white border shadow-sm rounded-xl">
                    <div className="p-6">
                        <h1 className="mb-4 text-2xl font-semibold">Daftar Pengurus Masjid</h1>

                        {isLoading ? (
                            <p className="text-sm text-gray-500">Memuat data...</p>
                        ) : error ? (
                            <p className="text-sm text-red-500">Terjadi kesalahan saat mengambil data.</p>
                        ) : sortedPengurusMasjid.length === 0 ? (
                            <p className="text-sm text-gray-500">Tidak ada data pengurus.</p>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-12 text-center">No</TableHead>
                                        <TableHead>Nama</TableHead>
                                        <TableHead>Jabatan</TableHead>
                                        <TableHead className="pr-4 text-right">Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {sortedPengurusMasjid.map((pengurus, idx) => (
                                        <TableRow key={pengurus.id}>
                                            <TableCell className="text-center">{idx + 1}</TableCell>
                                            <TableCell className="font-medium">
                                                {capitalizeWords(pengurus.nama)}
                                            </TableCell>
                                            <TableCell>{capitalizeWords(pengurus.role)}</TableCell>
                                            <TableCell className="flex justify-end gap-2 pr-4">
                                                <Link href={`/admin/dashboard/pengurus/edit/${pengurus.id}`}>
                                                    <Button size="sm" variant="secondary" className="gap-1">
                                                        <Pencil className="w-4 h-4" />
                                                        Edit
                                                    </Button>
                                                </Link>
                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <Button
                                                            size="sm"
                                                            variant="destructive"
                                                            className="gap-1"
                                                            onClick={() => setSelectedId(pengurus.id)}
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                            Hapus
                                                        </Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Hapus Pengurus?</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                Tindakan ini akan menghapus pengurus secara permanen. Apakah Anda yakin?
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Batal</AlertDialogCancel>
                                                            <AlertDialogAction
                                                                onClick={() => {
                                                                    if (selectedId) onDeletePengurus(selectedId)
                                                                }}
                                                                className="text-white bg-red-600 hover:bg-red-700"
                                                            >
                                                                Hapus
                                                            </AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
