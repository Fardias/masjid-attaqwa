// import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
// import { Badge } from "./ui/badge"
// import { Calendar } from "lucide-react"

// export default function UpcomingEvents() {
//     // Sample events data
//     const events = [
//         // {
//         //     id: 1,
//         //     title: "Kajian Tafsir Al-Quran",
//         //     date: "Rabu, 15 Mei 2024",
//         //     time: "Ba'da Maghrib - 20:30 WIB",
//         //     location: "Ruang Utama Masjid",
//         //     speaker: "Ustadz Ahmad Syafii",
//         // },
//         // {
//         //     id: 2,
//         //     title: "Tabligh Akbar Menyambut Ramadhan",
//         //     date: "Ahad, 19 Mei 2024",
//         //     time: "08:00 - 12:00 WIB",
//         //     location: "Halaman Masjid",
//         //     speaker: "Ustadz Dr. Abdul Somad, Lc., MA",
//         // },
//         // {
//         //     id: 3,
//         //     title: "Pelatihan Manasik Haji & Umrah",
//         //     date: "Sabtu, 25 Mei 2024",
//         //     time: "09:00 - 15:00 WIB",
//         //     location: "Aula Masjid",
//         //     speaker: "H. Muhammad Ridwan",
//         // },
//     ]

//     return (
//         <Card>
//             <CardHeader className="">
//                 <CardTitle className="flex items-center ">
//                     <Calendar className="w-5 h-5 mr-2 text-amber-600" />
//                     Kegiatan Mendatang
//                 </CardTitle>
//             </CardHeader>
//             <CardContent className="pt-6">
//                 {events.length > 0 ? (
//                     <div className="space-y-6">
//                         {events.map((event) => (
//                             <div key={event.id} className="p-4 transition-colors border rounded-lg hover:border-amber-200">
//                                 <div className="flex items-start justify-between mb-2">
//                                     <h3 className="text-lg font-medium">{event.title}</h3>
//                                     <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-200">
//                                         Upcoming
//                                     </Badge>
//                                 </div>
//                                 <div className="space-y-2 text-gray-600">
//                                     <p>
//                                         <span className="font-medium">Tanggal:</span> {event.date}
//                                     </p>
//                                     <p>
//                                         <span className="font-medium">Waktu:</span> {event.time}
//                                     </p>
//                                     <p>
//                                         <span className="font-medium">Lokasi:</span> {event.location}
//                                     </p>
//                                     <p>
//                                         <span className="font-medium">Pemateri:</span> {event.speaker}
//                                     </p>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 ) : (
//                     <p className="text-center text-gray-500">Belum ada informasi kegiatan mendatang.</p>
//                 )}
//             </CardContent>
//         </Card>
//     )
// }

import useSWR from 'swr'
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Calendar } from "lucide-react"
import { getUpcomingEvents } from "@/lib/services/kegiatanService"

const fetchEvents = () => getUpcomingEvents()

export default function UpcomingEvents() {
    const { data: events, error, isLoading } = useSWR('upcoming-events', fetchEvents)

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-amber-600" />
                    Kegiatan Mendatang
                </CardTitle>
            </CardHeader>

            {isLoading && (
                <div className="flex items-center justify-center p-4">
                    <p className="text-gray-500">Loading...</p>
                </div>
            )}

            {error && (
                <div className="flex items-center justify-center p-4">
                    <p className="text-red-500">Error: {error.message}</p>
                </div>
            )}

            <CardContent className="pt-6">
                {events?.length > 0 ? (
                    <div className="space-y-6">
                        {events.map((event) => (
                            <div key={event.id} className="p-4 transition-colors border rounded-lg hover:border-amber-200">
                                <div className="flex items-start justify-between mb-2">
                                    <h3 className="text-lg font-medium">{event.judul}</h3>
                                    <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-200">
                                        Upcoming
                                    </Badge>
                                </div>
                                <div className="space-y-2 text-gray-600">
                                    <p><span className="font-medium">Tanggal:</span> {event.tanggal_mulai} - {event.tanggal_selesai}</p>
                                    <p><span className="font-medium">Waktu:</span> {event.time}</p>
                                    <p><span className="font-medium">Lokasi:</span> {event.lokasi ?? 'Masjid At-Taqwa'}</p>
                                    <p><span className="font-medium">Pemateri:</span> {event.speaker}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    !isLoading && <p className="text-center text-gray-500">Belum ada informasi kegiatan mendatang.</p>
                )}
            </CardContent>
        </Card>
    )
}
