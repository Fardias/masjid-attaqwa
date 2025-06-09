'use client'
import React from "react"
import Link from "next/link"
import { Plus } from "lucide-react"
import useSWR from "swr"

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

import { getPengurus } from "../../../../lib/services/pengurusService"

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

    function capitalizeWords(str) {
        return str.replace(/\b\w/g, (char) => char.toUpperCase())
    }

    return (
        <div className="flex flex-col">
            <DashboardHeader />
            <div className="flex-1 p-4 pt-6 space-y-6 md:p-8">
                <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-bold tracking-tight">Pengurus Masjid</h2>
                    <Link href="/admin/dashboard/announcements/new">
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
                        ) : pengurusMasjid?.length === 0 ? (
                            <p className="text-sm text-gray-500">Tidak ada data pengurus.</p>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-12 text-center">No</TableHead>
                                        <TableHead>Nama</TableHead>
                                        <TableHead>Jabatan</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {pengurusMasjid.map((pengurus, idx) => (
                                        <TableRow key={pengurus.id}>
                                            <TableCell className="text-center">{idx + 1}</TableCell>
                                            <TableCell className="font-medium">{capitalizeWords(pengurus.nama)}</TableCell>
                                            <TableCell>{capitalizeWords(pengurus.role)}</TableCell>
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
