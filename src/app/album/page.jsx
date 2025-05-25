'use client'
import Image from "next/image"
import { Card, CardContent } from "@/app/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import { getAllAlbums } from "@/lib/services/albumsService"
import useSWR from "swr"

const fetchAlbums = () => getAllAlbums()

export default function AlbumPage() {
  const { data: albums, error } = useSWR("albums", fetchAlbums)

  if (error) return <p className="mt-[150px] text-center text-red-500">Gagal memuat album.</p>
  if (!albums) return <p className="mt-[150px] text-center text-gray-500">Memuat album...</p>

  const sosialAlbums = albums.filter(a => a.category === "social_activities")
  const hariBesarAlbums = albums.filter(a => a.category === "islamic_holidays")

  return (
    <div className="container px-4 py-12 mx-auto">
      <h1 className="mb-8 text-4xl font-bold text-center">Album Kegiatan</h1>

      <Tabs defaultValue="kegiatan-sosial" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="kegiatan-sosial" className="cursor-pointer">Kegiatan Sosial</TabsTrigger>
          <TabsTrigger value="peringatan-hari-besar" className="cursor-pointer">Hari Besar Islam</TabsTrigger>
        </TabsList>

        {/* Tab Kegiatan Sosial */}
        <TabsContent value="kegiatan-sosial" className="mt-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sosialAlbums.map((album) => (
              <Card key={album.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative w-full h-64">
                    <Image
                      src={album.images_url?.[0] || "/placeholder.svg"}
                      alt={album.title}
                      fill
                      className="object-cover transition-all hover:scale-105"
                    />
                  </div>
                  <div className="p-4 bg-amber-50">
                    <p className="text-gray-700">{album.title}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {new Date(album.date).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Tab Hari Besar Islam */}
        <TabsContent value="peringatan-hari-besar" className="mt-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {hariBesarAlbums.map((album) => (
              <Card key={album.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative w-full h-64">
                    <Image
                      src={album.images_url?.[0] || "/placeholder.svg"}
                      alt={album.title}
                      fill
                      className="object-cover transition-all hover:scale-105"
                    />
                  </div>
                  <div className="p-4 bg-amber-50">
                    <p className="text-gray-700">{album.title}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {new Date(album.date).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
