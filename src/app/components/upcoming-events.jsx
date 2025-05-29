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
                    Acara Mendatang
                </CardTitle>
            </CardHeader>

            {isLoading && (
                <div className="flex items-center justify-center p-4">
                    <p className="text-gray-500">Loading guys...</p>
                </div>
            )}

            {error && (
                <div className="flex items-center justify-center p-4">
                    <p className="text-red-500">Error: {error.message}</p>
                </div>
            )}

            <CardContent className="pt-6">
                {events?.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {events.map((event) => (
                            <div 
                                key={event.id} 
                                id={`event-${event.id}`} 
                                className="flex flex-col bg-white border rounded-lg shadow-sm hover:shadow-md transition-all duration-200 w-full h-full"
                            >
                                {/* Image Container - Fixed Height */}
                                <div className="w-full h-48 flex-shrink-0">
                                    {event.images_url ? (
                                        <img 
                                            src={event.images_url} 
                                            alt={event.judul} 
                                            className="w-full h-full object-cover rounded-t-lg"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-100 rounded-t-lg flex items-center justify-center">
                                            <Calendar className="w-12 h-12 text-gray-400" />
                                        </div>
                                    )}
                                </div>

                                {/* Content Container - Flexible Height */}
                                <div className="flex flex-col flex-grow p-4 space-y-3">
                                    {/* Title */}
                                    <h3 className={`font-semibold line-clamp-2 transition-all ${
                                        fullscreenId === event.id ? "text-[150px] leading-tight" : "text-lg text-gray-900"
                                    }`}>
                                        {event.judul}
                                    </h3>

                                    {/* Status Badge */}
                                    <div className="flex items-center">
                                        <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-200 text-xs">
                                            {event.status}
                                        </Badge>
                                    </div>

                                    {/* Event Details */}
                                    <div className="space-y-2 flex-grow">
                                        <div className={`flex flex-col transition-all ${
                                            fullscreenId === event.id ? "text-[40px]" : "text-sm text-gray-600"
                                        }`}>
                                            <p>
                                                <span className="font-medium text-gray-900">Tanggal:</span>
                                                <br />
                                                {formatDate(event.tanggal_mulai)}
                                            </p>
                                        </div>

                                        <div className={`flex flex-col transition-all ${
                                            fullscreenId === event.id ? "text-[40px]" : "text-sm text-gray-600"
                                        }`}>
                                            <p>
                                                <span className="font-medium text-gray-900">Waktu:</span>
                                                <br />
                                                {event.waktu?.replace(/:..$/, '')}
                                            </p>
                                        </div>

                                        <div className={`flex flex-col transition-all ${
                                            fullscreenId === event.id ? "text-[40px]" : "text-sm text-gray-600"
                                        }`}>
                                            <p>
                                                <span className="font-medium text-gray-900">Lokasi:</span>
                                                <br />
                                                {event.lokasi ?? 'Masjid At-Taqwa'}
                                            </p>
                                        </div>

                                        {event.speaker && (
                                            <div className={`flex flex-col transition-all ${
                                                fullscreenId === event.id ? "text-[40px]" : "text-sm text-gray-600"
                                            }`}>
                                                <p>
                                                    <span className="font-medium text-gray-900">Pemateri:</span>
                                                    <br />
                                                    {event.speaker}
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Fullscreen Button - Always at bottom */}
                                    <div className="pt-4 mt-auto">
                                        <Button
                                            onClick={() => toggleFullScreen(event.id)}
                                            variant="outline"
                                            size="sm"
                                            className="w-full flex items-center justify-center gap-2 bg-white hover:bg-amber-50 text-amber-700 border-amber-200 hover:border-amber-300 transition-colors"
                                        >
                                            {fullscreenId === event.id ? (
                                                <>
                                                    <Minimize2 className="w-4 h-4" />
                                                    Keluar Fullscreen
                                                </>
                                            ) : (
                                                <>
                                                    <Maximize2 className="w-4 h-4" />
                                                    Fullscreen
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    !isLoading && (
                        <div className="text-center py-8">
                            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-500">Tidak ada acara mendatang</p>
                        </div>
                    )
                )}
            </CardContent>
        </Card>
    )
}