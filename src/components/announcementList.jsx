"use client"

import useSWR from "swr"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Badge } from "@/app/components/ui/badge"
import { CalendarIcon } from "lucide-react"
import { getPengumuman } from "@/lib/services/PengumumanService"

const fetchAnnounce = () => getPengumuman()

export default function AnnouncementList() {
    const { data: announcements, error, isLoading } = useSWR("announcements", fetchAnnounce)

    const formatDate = (dateString) => {
        if (!dateString) return "Tanggal tidak tersedia"

        const date = new Date(dateString)
        if (isNaN(date.getTime())) return "Tanggal tidak valid"

        return new Intl.DateTimeFormat("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        }).format(date)
    }
    
    if (isLoading) return <p className="text-center text-gray-500">Memuat pengumuman...</p>
    if (error) return <p className="text-center text-red-500">Gagal memuat pengumuman</p>

    return (
        <>
            {announcements?.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {announcements.map((announcement) => (
                        <Card key={announcement.id} className="overflow-hidden">
                            <CardHeader className="bg-amber-50">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <CardTitle>{announcement.title}</CardTitle>
                                        <CardDescription className="flex items-center mt-2">
                                            <CalendarIcon className="w-4 h-4 mr-2" />
                                            {formatDate(announcement.tanggal_mulai)}
                                        </CardDescription>
                                    </div>
                                    <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-200">
                                        {announcement.category}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <p className="text-gray-700 whitespace-pre-line">{announcement.excerpt}</p>
                            </CardContent>
                            <CardFooter className="flex justify-end border-t bg-amber-50/50">
                                <p className="text-sm text-gray-500">Diumumkan oleh Pengurus Masjid At-Taqwa</p>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500">Tidak ada pengumuman</p>
            )}
        </>
    )
}
