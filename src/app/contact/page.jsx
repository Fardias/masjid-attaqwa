import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Button } from "@/app/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="container px-4 py-12 mx-auto">
      <h1 className="mb-8 text-4xl font-bold text-center">Hubungi Kami</h1>

      <Tabs defaultValue="contact" className="w-full max-w-6xl mx-auto">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="contact" className="cursor-pointer">Kontak</TabsTrigger>
          <TabsTrigger value="feedback" className="cursor-pointer">Form Saran & Kritik</TabsTrigger>
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

                  {/* <div className="flex items-start">
                    <Clock className="h-5 w-5 mr-3 text-amber-600 mt-0.5" />
                    <div>
                      <h3 className="mb-1 font-medium">Jam Operasional Sekretariat</h3>
                      <p className="text-gray-600">Senin - Jumat: 08.00 - 16.00 WIB</p>
                      <p className="text-gray-600">Sabtu: 08.00 - 12.00 WIB</p>
                      <p className="text-gray-600">Minggu & Hari Libur: Tutup</p>
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
                <div className="h-[400px] bg-gray-200 flex items-center justify-center">
                  <div className="p-4 text-center">
                    <MapPin className="w-8 h-8 mx-auto mb-2 text-amber-600" />
                    <p className="font-medium">Masjid At-Taqwa</p>
                    <p className="text-sm text-gray-600">Jl. Masjid Raya No. 123, Kelurahan Sejahtera</p>
                    <Button variant="outline" className="mt-4">
                      Lihat di Google Maps
                    </Button>
                  </div>
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
              <form className="space-y-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nama Lengkap</Label>
                    <Input id="name" placeholder="Masukkan nama lengkap" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Masukkan email" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Nomor Telepon/WhatsApp</Label>
                  <Input id="phone" placeholder="Masukkan nomor telepon/WhatsApp" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subjek</Label>
                  <Input id="subject" placeholder="Masukkan subjek pesan" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Pesan</Label>
                  <textarea
                    id="message"
                    className="flex w-full px-3 py-2 text-sm border rounded-md min-h-32 border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Tulis pesan, saran, atau kritik Anda"
                  />
                </div>

                <Button type="submit" className="flex items-center gap-2">
                  <Send className="w-4 h-4" />
                  Kirim Pesan
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
