// import Image from "next/image"
// import { Card, CardContent } from "@/app/components/ui/card"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"

// export default function AlbumPage() {
//   // Sample album categories and images
//   const albums = {
//     // "kegiatan-ramadhan": {
//     //   title: "Kegiatan Ramadhan",
//     //   images: [
//     //     { id: 1, src: "/placeholder.svg?height=400&width=600", alt: "Buka puasa bersama" },
//     //     { id: 2, src: "/placeholder.svg?height=400&width=600", alt: "Sholat tarawih" },
//     //     { id: 3, src: "/placeholder.svg?height=400&width=600", alt: "Kajian Ramadhan" },
//     //     { id: 4, src: "/placeholder.svg?height=400&width=600", alt: "Pembagian takjil" },
//     //     { id: 5, src: "/placeholder.svg?height=400&width=600", alt: "Itikaf malam lailatul qadar" },
//     //     { id: 6, src: "/placeholder.svg?height=400&width=600", alt: "Sholat Idul Fitri" },
//     //   ],
//     // },
//     // "pembangunan-masjid": {
//     //   title: "Pembangunan Masjid",
//     //   images: [
//     //     { id: 1, src: "/placeholder.svg?height=400&width=600", alt: "Peletakan batu pertama" },
//     //     { id: 2, src: "/placeholder.svg?height=400&width=600", alt: "Proses pembangunan" },
//     //     { id: 3, src: "/placeholder.svg?height=400&width=600", alt: "Pemasangan kubah" },
//     //     { id: 4, src: "/placeholder.svg?height=400&width=600", alt: "Renovasi interior" },
//     //   ],
//     // },
//     "kegiatan-sosial": {
//       title: "Kegiatan Sosial",
//       images: [
//         { id: 1, src: "/placeholder.svg?height=400&width=600", alt: "Santunan anak yatim" },
//         { id: 2, src: "/placeholder.svg?height=400&width=600", alt: "Bakti sosial" },
//         { id: 3, src: "/placeholder.svg?height=400&width=600", alt: "Donor darah" },
//         { id: 4, src: "/placeholder.svg?height=400&width=600", alt: "Bantuan bencana alam" },
//         { id: 5, src: "/placeholder.svg?height=400&width=600", alt: "Pembagian sembako" },
//       ],
//     },
//     "peringatan-hari-besar": {
//       title: "Peringatan Hari Besar Islam",
//       images: [
//         { id: 1, src: "/placeholder.svg?height=400&width=600", alt: "Peringatan Maulid Nabi" },
//         { id: 2, src: "/placeholder.svg?height=400&width=600", alt: "Peringatan Isra Mi'raj" },
//         { id: 3, src: "/placeholder.svg?height=400&width=600", alt: "Peringatan tahun baru Islam" },
//         { id: 4, src: "/placeholder.svg?height=400&width=600", alt: "Sholat Idul Adha" },
//         { id: 5, src: "/placeholder.svg?height=400&width=600", alt: "Penyembelihan hewan kurban" },
//       ],
//     },
//   }

//   return (
//     <div className="container px-4 py-12 mx-auto">
//       <h1 className="mb-8 text-4xl font-bold text-center">Album Kegiatan</h1>

//       <Tabs defaultValue="kegiatan-sosial" className="w-full">
//         <TabsList className="grid w-full grid-cols-2 mb-8">
//           <TabsTrigger value="kegiatan-sosial" className="cursor-pointer">Kegiatan Sosial</TabsTrigger>
//           <TabsTrigger value="peringatan-hari-besar" className="cursor-pointer">Hari Besar Islam</TabsTrigger>
//         </TabsList>

//         {Object.entries(albums).map(([key, album]) => (
//           <TabsContent key={key} value={key} className="mt-6">
//             <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
//               {album.images.map((image) => (
//                 <Card key={image.id} className="overflow-hidden">
//                   <CardContent className="p-0">
//                     <div className="relative w-full h-64">
//                       <Image
//                         src={image.src || "/placeholder.svg"}
//                         alt={image.alt}
//                         fill
//                         className="object-cover transition-all hover:scale-105"
//                       />
//                     </div>
//                     <div className="p-4 bg-amber-50">
//                       <p className="text-gray-700">{image.alt}</p>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           </TabsContent>
//         ))}
//       </Tabs>
//     </div>
//   )
// }


'use client'
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
                    {/* <Image
                      src={album.images_url || "/placeholder.svg?height=400&width=600"}
                      alt={album.title}
                      fill
                      className="object-cover transition-all hover:scale-105"
                    /> */}
                  </div>
                  <div className="p-4 bg-amber-50">
                    <p className="text-gray-700">{album.title}</p>
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
                    {/* <Image
                      src={album.images_url || "/placeholder.svg?height=400&width=600"}
                      alt={album.title}
                      fill
                      className="object-cover transition-all hover:scale-105"
                    /> */}
                  </div>
                  <div className="p-4 bg-amber-50">
                    <p className="text-gray-700">{album.title}</p>
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
