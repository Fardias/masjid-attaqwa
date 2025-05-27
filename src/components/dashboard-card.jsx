import { Calendar, ImageIcon, Megaphone } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export function DashboardCards() {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Link href="/admin/dashboard/events">
                <Card className="transition-shadow hover:shadow-md">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-xl font-bold">Acara Mendatang</CardTitle>
                        <Calendar className="w-5 h-5 text-amber-600" />
                    </CardHeader>
                    <CardContent>
                        {/* <div className="text-3xl font-bold">12</div> */}
                        {/* <p className="text-xs text-muted-foreground">3 event dalam 7 hari ke depan</p> */}
                    </CardContent>
                </Card>
            </Link>

            <Link href="/admin/dashboard/announcements">
                <Card className="transition-shadow hover:shadow-md">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-xl font-bold">Pengumuman</CardTitle>
                        <Megaphone className="w-5 h-5 text-amber-600" />
                    </CardHeader>
                    <CardContent>
                        {/* <div className="text-3xl font-bold">8</div> */}
                        {/* <p className="text-xs text-muted-foreground">2 pengumuman aktif saat ini</p> */}
                    </CardContent>
                </Card>
            </Link>

            <Link href="/admin/dashboard/albums">
                <Card className="transition-shadow hover:shadow-md">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-xl font-bold">Album Foto</CardTitle>
                        <ImageIcon className="w-5 h-5 text-amber-600" />
                    </CardHeader>
                    <CardContent>
                        {/* <div className="text-3xl font-bold">24</div> */}
                        {/* <p className="text-xs text-muted-foreground">10 album kegiatan sosial, 14 album hari besar</p> */}
                    </CardContent>
                </Card>
            </Link>
        </div>
    )
}
