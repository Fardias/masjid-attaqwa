"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Button } from "../../components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { MapPin, Phone, Mail, Send, ExternalLink } from "lucide-react"
import dynamic from "next/dynamic"
import { useState } from "react"
import Swal from 'sweetalert2'
import 'animate.css'

const Maps = dynamic(() => import("../components/maps"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center w-full h-[400px] bg-gray-200">
      <p>Memuat Lokasi Masjid...</p>
    </div>
  ),
})

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    message: "",
  })

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.details || data.error || 'Terjadi kesalahan saat mengirim feedback')
      }

      // Show success alert
      await Swal.fire({
        title: 'Berhasil!',
        text: 'Terima kasih atas masukan Anda. Kami akan meninjau pesan Anda segera.',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#3085d6',
        customClass: {
          popup: 'swal2-popup',
          title: 'swal2-title',
          htmlContainer: 'swal2-html-container',
          confirmButton: 'swal2-confirm',
        },
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })

      // Reset form
      setFormData({
        name: "",
        message: "",
      })
    } catch (error) {
      console.error('Form submission error:', error)

      // Show error alert
      await Swal.fire({
        title: 'Gagal!',
        text: error.message || "Terjadi kesalahan saat mengirim feedback",
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#d33',
        customClass: {
          popup: 'swal2-popup',
          title: 'swal2-title',
          htmlContainer: 'swal2-html-container',
          confirmButton: 'swal2-confirm',
        },
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const getDirectionsUrl = () => {
    return "https://www.google.com/maps/dir/?api=1&destination=-6.2,106.816666&destination_place_id=Masjid+At-Taqwa"
  }
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Hubungi Masjid At-Taqwa Puri Bintaro Hijau",
    "description": "Hubungi Masjid At-Taqwa untuk pertanyaan, kritik, atau saran.",
    "url": "https://masjidattaqwa-bph.com/contact",
    "mainEntity": {
      "@type": "Mosque",
      "name": "Masjid At-Taqwa Puri Bintaro Hijau",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Jl. Utama Puri Bintaro Hijau",
        "addressLocality": "Pondok Aren",
        "addressRegion": "Banten",
        "postalCode": "15224",
        "addressCountry": "ID"
      },
      "telephone": "+628129023188",
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "-6.252576",
        "longitude": "106.708341"
      }
    }
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
                        Perumahan Jl. Utama Puri Bintaro Hijau, Pondok Aren, South Tangerang City, Banten 15224
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
                      <a
                        href="https://wa.me/628129023188"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        0812-9023-188 - (WhatsApp)
                      </a>
                    </div>

                  </div>

                  {/* {/* <div className="flex items-start">
                    <Mail className="h-5 w-5 mr-3 text-amber-600 mt-0.5" />
                    <div>
                      <h3 className="mb-1 font-medium">Email</h3>
                      <p className="text-gray-600">info@masjidattaqwa.org</p>
                      <p className="text-gray-600">admin@masjidattaqwa.org</p>
                    </div>
                  </div> */}
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle>Lokasi</CardTitle>
                <CardDescription>Peta lokasi Masjid At-Taqwa</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-[400px] z-[-100]">
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
                  {/* <div className="space-y-2">
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
                  /> */}
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
