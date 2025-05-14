"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { Button } from "../../components/ui/button"
import { ExternalLink, Loader2 } from 'lucide-react'

const MapWithNoSSR = dynamic(() => import("./maps-container"), {
    loading: () => (
        <div className="flex items-center justify-center w-full h-[400px] bg-slate-100 rounded-lg">
            <div className="flex flex-col items-center gap-2">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <p className="text-sm text-muted-foreground">Loading map...</p>
            </div>
        </div>
    ),
    ssr: false,
})

export default function Maps({
    location = {
        lat: -6.2525699269905095,
        lng: 106.70827124483588,
        name: "Lokasi Masjid At-Taqwa",
        description: "Masjid At-Taqwa Perumahan Puri Bintaro Hijau, Tangerang Selatan, Banten 15224.",
    },
    height = "400px",
    zoom = 15,
    showGoogleMapsLink = true,
}) {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    const openInGoogleMaps = () => {
        window.open(`https://www.google.com/maps?q=${location.lat},${location.lng}`, "_blank")
    }

    if (!isMounted) {
        return (
            <div className="flex items-center justify-center w-full h-[400px] bg-slate-100 rounded-xl">
                <div className="flex flex-col items-center gap-2">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    <p className="text-sm text-muted-foreground">Loading map...</p>
                </div>
            </div>
        )
    }

    return (
            <div className="p-1 overflow-hidden rounded-xl">  
                <div style={{ height }} className="relative overflow-hidden rounded-lg">
                    <MapWithNoSSR location={location} zoom={zoom} />

                    {showGoogleMapsLink && (
                        <div className="absolute bottom-4 right-4 z-[1000]">
                            <Button onClick={openInGoogleMaps} variant="secondary" className="flex items-center gap-2 shadow-md">
                                <ExternalLink className="w-4 h-4" />
                                Buka di Google Maps
                            </Button>
                        </div>
                    )}
                </div>
            </div>
    )
}