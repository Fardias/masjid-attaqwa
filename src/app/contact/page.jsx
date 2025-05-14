// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
// import { Input } from "@/app/components/ui/input"
// import { Label } from "@/app/components/ui/label"
// import { Button } from "@/app/components/ui/button"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
// import { MapPin, Phone, Mail, Clock, Send } from "lucide-react"
// import Maps from "../components/maps"

// export default function ContactPage() {
//   return (
//     <div className="container px-4 py-12 mx-auto">
//       <h1 className="mb-8 text-4xl font-bold text-center">Hubungi Kami</h1>

//       <Tabs defaultValue="contact" className="w-full max-w-6xl mx-auto">
//         <TabsList className="grid w-full grid-cols-2">
//           <TabsTrigger value="contact" className="cursor-pointer">Kontak</TabsTrigger>
//           <TabsTrigger value="feedback" className="cursor-pointer">Form Saran & Kritik</TabsTrigger>
//         </TabsList>

//         <TabsContent value="contact" className="mt-6">
//           <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Informasi Kontak</CardTitle>
//                 <CardDescription>Silakan hubungi kami melalui informasi kontak berikut</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-6">
//                   <div className="flex items-start">
//                     <MapPin className="h-5 w-5 mr-3 text-amber-600 mt-0.5" />
//                     <div>
//                       <h3 className="mb-1 font-medium">Alamat</h3>
//                       <p className="text-gray-600">
//                         Jl. Masjid Raya No. 123, Kelurahan Sejahtera, Kecamatan Bahagia, Kota Indah, 12345
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex items-start">
//                     <Phone className="h-5 w-5 mr-3 text-amber-600 mt-0.5" />
//                     <div>
//                       <h3 className="mb-1 font-medium">Telepon</h3>
//                       <p className="text-gray-600">(021) 1234-5678</p>
//                       <p className="text-gray-600">+62 812-3456-7890 (WhatsApp)</p>
//                     </div>
//                   </div>

//                   <div className="flex items-start">
//                     <Mail className="h-5 w-5 mr-3 text-amber-600 mt-0.5" />
//                     <div>
//                       <h3 className="mb-1 font-medium">Email</h3>
//                       <p className="text-gray-600">info@masjidattaqwa.org</p>
//                       <p className="text-gray-600">admin@masjidattaqwa.org</p>
//                     </div>
//                   </div>

//                   {/* <div className="flex items-start">
//                     <Clock className="h-5 w-5 mr-3 text-amber-600 mt-0.5" />
//                     <div>
//                       <h3 className="mb-1 font-medium">Jam Operasional Sekretariat</h3>
//                       <p className="text-gray-600">Senin - Jumat: 08.00 - 16.00 WIB</p>
//                       <p className="text-gray-600">Sabtu: 08.00 - 12.00 WIB</p>
//                       <p className="text-gray-600">Minggu & Hari Libur: Tutup</p>
//                     </div>
//                   </div> */}
//                 </div>
//               </CardContent>
//             </Card>

//             <Card className="overflow-hidden">
//               <CardHeader>
//                 <CardTitle>Lokasi</CardTitle>
//                 <CardDescription>Peta lokasi Masjid At-Taqwa</CardDescription>
//               </CardHeader>
//               <CardContent className="p-0">
//                 <div className="h-[400px] bg-gray-200 flex items-center justify-center">
//                   <div className="p-4 text-center">
//                     <MapPin className="w-8 h-8 mx-auto mb-2 text-amber-600" />
//                     <p className="font-medium">Masjid At-Taqwa</p>
//                     <p className="text-sm text-gray-600">Jl. Masjid Raya No. 123, Kelurahan Sejahtera</p>
//                     <Button variant="outline" className="mt-4">
//                       <Maps />
//                     </Button>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </TabsContent>

//         <TabsContent value="feedback" className="mt-6">
//           <Card>
//             <CardHeader>
//               <CardTitle>Form Saran & Kritik</CardTitle>
//               <CardDescription>Bantu kami meningkatkan layanan dengan memberikan saran dan kritik Anda</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <form className="space-y-6">
//                 <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//                   <div className="space-y-2">
//                     <Label htmlFor="name">Nama Lengkap</Label>
//                     <Input id="name" placeholder="Masukkan nama lengkap" />
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="email">Email</Label>
//                     <Input id="email" type="email" placeholder="Masukkan email" />
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="phone">Nomor Telepon/WhatsApp</Label>
//                   <Input id="phone" placeholder="Masukkan nomor telepon/WhatsApp" />
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="subject">Subjek</Label>
//                   <Input id="subject" placeholder="Masukkan subjek pesan" />
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="message">Pesan</Label>
//                   <textarea
//                     id="message"
//                     className="flex w-full px-3 py-2 text-sm border rounded-md min-h-32 border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
//                     placeholder="Tulis pesan, saran, atau kritik Anda"
//                   />
//                 </div>

//                 <Button type="submit" className="flex items-center gap-2">
//                   <Send className="w-4 h-4" />
//                   Kirim Pesan
//                 </Button>
//               </form>
//             </CardContent>
//           </Card>
//         </TabsContent>
//       </Tabs>
//     </div>
//   )
// }

"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Button } from "../../components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { MapPin, Phone, Mail, Send, ExternalLink } from "lucide-react"
import dynamic from "next/dynamic"
import { useState } from "react"
import { useSonner } from "sonner"

const Maps = dynamic(() => import("../components/maps"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center w-full h-[400px] bg-gray-200">
      <p>Memuat Lokasi Masjid...</p>
    </div>
  ),
})

export default function ContactPage() {
  const { toast } = useSonner()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Pesan Terkirim",
        description: "Terima kasih atas masukan Anda. Kami akan meninjau pesan Anda segera.",
        variant: "success",
      })

      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      })
    }, 1500)
  }

  const getDirectionsUrl = () => {
    return "https://www.google.com/maps/dir/?api=1&destination=-6.2,106.816666&destination_place_id=Masjid+At-Taqwa"
  }

  return (
    <div className="container px-4 py-12 mx-auto">
      <h1 className="mb-8 text-4xl font-bold text-center">Hubungi Kami</h1>

      <Tabs defaultValue="contact" className="w-full max-w-6xl mx-auto">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="contact" className="cursor-pointer">
            Kontak
          </TabsTrigger>
          <TabsTrigger value="feedback" className="cursor-pointer">
            Form Saran & Kritik
          </TabsTrigger>
        </TabsList>

        <TabsContent value="contact" className="mt-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Informasi Kontak</CardTitle>
                <CardDescription>Silakan hubungi kami melalui informasi kontak berikut</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 mr-3 text-amber-600 mt-0.5" />
                    <div>
                      <h3 className="mb-1 font-medium">Alamat</h3>
                      <p className="text-gray-600">
                        Jl. Masjid Raya No. 123, Kelurahan Sejahtera, Kecamatan Bahagia, Kota Indah, 12345
                      </p>
                      <a
                        href={getDirectionsUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center mt-2 text-sm text-amber-600 hover:text-amber-800"
                      >
                        Petunjuk Arah <ExternalLink className="w-3 h-3 ml-1" />
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Phone className="h-5 w-5 mr-3 text-amber-600 mt-0.5" />
                    <div>
                      <h3 className="mb-1 font-medium">Telepon</h3>
                      <p className="text-gray-600">(021) 1234-5678</p>
                      <p className="text-gray-600">+62 812-3456-7890 (WhatsApp)</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Mail className="h-5 w-5 mr-3 text-amber-600 mt-0.5" />
                    <div>
                      <h3 className="mb-1 font-medium">Email</h3>
                      <p className="text-gray-600">info@masjidattaqwa.org</p>
                      <p className="text-gray-600">admin@masjidattaqwa.org</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle>Lokasi</CardTitle>
                <CardDescription>Peta lokasi Masjid At-Taqwa</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-[400px]">
                  <Maps />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="feedback" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Form Saran & Kritik</CardTitle>
              <CardDescription>Bantu kami meningkatkan layanan dengan memberikan saran dan kritik Anda</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nama Lengkap</Label>
                    <Input
                      id="name"
                      placeholder="Masukkan nama lengkap"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Masukkan email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Nomor Telepon/WhatsApp</Label>
                  <Input
                    id="phone"
                    placeholder="Masukkan nomor telepon/WhatsApp"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subjek</Label>
                  <Input
                    id="subject"
                    placeholder="Masukkan subjek pesan"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Pesan</Label>
                  <textarea
                    id="message"
                    className="flex w-full px-3 py-2 text-sm border rounded-md min-h-32 border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Tulis pesan, saran, atau kritik Anda"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <Button type="submit" className="flex items-center gap-2" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <svg
                        className="w-4 h-4 mr-2 animate-spin"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Mengirim...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Kirim Pesan
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
