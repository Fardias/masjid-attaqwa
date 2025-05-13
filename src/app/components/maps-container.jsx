"use client"

import { useEffect } from "react"
import { MapContainer, TileLayer, Popup, ZoomControl, useMap } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

const customIcon = new L.Icon({
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
})

function SetMapView({ center, zoom }) {
    const map = useMap()

    useEffect(() => {
        const marker = L.marker(center, { icon: customIcon }).addTo(map)

        const popupContent = `
            <div class="p-1">
                <h3 class="font-medium">${center.name || "Lokasi"}</h3>
                ${center.description ? `<p class="mt-1 text-sm text-gray-600">${center.description}</p>` : ""}
            </div>
        `

        marker.bindPopup(popupContent)

        marker.on("mouseover", () => {
            marker.openPopup()
        })

        marker.on("mouseout", () => {
            marker.closePopup()
        })

        marker.on("click", () => {
            marker.openPopup()
        })

        return () => {
            map.removeLayer(marker)
        }
    }, [center, zoom, map])

    useEffect(() => {
        map.setView(center, zoom)
    }, [center, zoom, map])

    return null
}

export default function MapContainerComponent({ location, zoom = 15 }) {
    const position = {
        lat: location.lat,
        lng: location.lng,
        name: location.name,
        description: location.description
    }

    return (
        <MapContainer
            center={[position.lat, position.lng]}
            zoom={zoom}
            style={{ height: "100%", width: "100%" }}
            zoomControl={false}
        >
            <TileLayer
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                maxZoom={19}
            />
            <ZoomControl position="bottomleft" />
            <SetMapView center={position} zoom={zoom} />
        </MapContainer>
    )
}
