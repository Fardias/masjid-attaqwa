import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Calendar } from "lucide-react"

export default function UpcomingEvents() {
    // Sample events data
    const events = [
        {
            id: 1,
            title: "Kajian Tafsir Al-Quran",
            date: "Rabu, 15 Mei 2024",
            time: "Ba'da Maghrib - 20:30 WIB",
            location: "Ruang Utama Masjid",
            speaker: "Ustadz Ahmad Syafii",
        },
        {
            id: 2,
            title: "Tabligh Akbar Menyambut Ramadhan",
            date: "Ahad, 19 Mei 2024",
            time: "08:00 - 12:00 WIB",
            location: "Halaman Masjid",
            speaker: "Ustadz Dr. Abdul Somad, Lc., MA",
        },
        {
            id: 3,
            title: "Pelatihan Manasik Haji & Umrah",
            date: "Sabtu, 25 Mei 2024",
            time: "09:00 - 15:00 WIB",
            location: "Aula Masjid",
            speaker: "H. Muhammad Ridwan",
        },
    ]

    return (
        <Card>
            <CardHeader className="bg-amber-50">
                <CardTitle className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    Kegiatan Mendatang
                </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
                <div className="space-y-6">
                    {events.map((event) => (
                        <div key={event.id} className="border rounded-lg p-4 hover:border-amber-200 transition-colors">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-medium text-lg">{event.title}</h3>
                                <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-200">
                                    Upcoming
                                </Badge>
                            </div>
                            <div className="space-y-2 text-gray-600">
                                <p>
                                    <span className="font-medium">Tanggal:</span> {event.date}
                                </p>
                                <p>
                                    <span className="font-medium">Waktu:</span> {event.time}
                                </p>
                                <p>
                                    <span className="font-medium">Lokasi:</span> {event.location}
                                </p>
                                <p>
                                    <span className="font-medium">Pemateri:</span> {event.speaker}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
