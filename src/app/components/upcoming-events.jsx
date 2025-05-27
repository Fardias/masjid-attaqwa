import { useState, useRef, useEffect } from 'react'
import useSWR from 'swr'
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Calendar, Maximize2, Minimize2 } from "lucide-react"
import { getUpcomingEvents } from "../../lib/services/eventService"

const fetchEvents = () => getUpcomingEvents()

export default function UpcomingEvents() {
    const { data: events, error, isLoading } = useSWR('upcoming-events', fetchEvents)
    const [fullscreenId, setFullscreenId] = useState(null)

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return new Intl.DateTimeFormat("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        }).format(date)
    }

    const toggleFullScreen = (eventId) => {
        console.log('Attempting to toggle fullscreen for event:', eventId)
        
        const element = document.getElementById(`event-${eventId}`)
        if (!element) {
            console.log('Element not found:', `event-${eventId}`)
            return
        }

        if (!document.fullscreenElement) {
            console.log('Entering fullscreen mode')
            element.requestFullscreen?.().then(() => {
                console.log('Successfully entered fullscreen mode')
                setFullscreenId(eventId)
            }).catch(err => {
                console.error("Gagal masuk fullscreen:", err)
            })
        } else {
            console.log('Exiting fullscreen mode')
            document.exitFullscreen?.().then(() => {
                console.log('Successfully exited fullscreen mode')
                setFullscreenId(null)
            }).catch(err => {
                console.error("Gagal keluar fullscreen:", err)
            })
        }
    }

    useEffect(() => {
        const handleFullscreenChange = () => {
            if (!document.fullscreenElement) {
                setFullscreenId(null)
            }
        }
    
        document.addEventListener('fullscreenchange', handleFullscreenChange)
    
        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange)
        }
    }, [])
    

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
                            <div key={event.id} id={`event-${event.id}`} className="p-4 transition-colors border rounded-lg bg-white">
                                <div className="flex items-start justify-between mb-2">
                                    <h3 className={`text-lg font-medium transition-all ${fullscreenId === event.id ? "text-[150px]" : "text-base"}`}>{event.judul}</h3>
                                    <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-200 ">
                                        {event.status}
                                    </Badge>
                                </div>
                                <div className="space-y-3 text-black">
                                    <p className={`transition-all ${fullscreenId === event.id ? "text-[80px]" : "text-base"}`}>
                                        <span className="font-semibold">Tanggal:</span> {formatDate(event.tanggal_mulai)}
                                    </p>
                                    <p className={`transition-all ${fullscreenId === event.id ? "text-[80px]" : "text-base"}`}>
                                        <span className="font-semibold">Waktu:</span> {event.waktu?.replace(/:..$/, '')}
                                    </p>
                                    <p className={`transition-all ${fullscreenId === event.id ? "text-[80px]" : "text-base"}`}>
                                        <span className="font-semibold">Lokasi:</span> {event.lokasi ?? 'Masjid At-Taqwa'}
                                    </p>
                                    {event.speaker && (
                                        <p className={`transition-all ${fullscreenId === event.id ? "text-[80px]" : "text-base"}`}>
                                            <span className="font-semibold">Pemateri:</span> {event.speaker}
                                        </p>
                                    )}
                                    <Button
                                        onClick={() => toggleFullScreen(event.id)}
                                        variant="outline"
                                        className="w-full mt-4 flex items-center justify-center gap-2 bg-white hover:bg-amber-50 text-black border-amber-200 text-lg font-medium"
                                    >
                                        {fullscreenId === event.id ? (
                                            <>
                                                <Minimize2 className="w-5 h-5" />
                                                Keluar Fullscreen
                                            </>
                                        ) : (
                                            <>
                                                <Maximize2 className="w-5 h-5" />
                                                Fullscreen
                                            </>
                                        )}
                                    </Button>
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
