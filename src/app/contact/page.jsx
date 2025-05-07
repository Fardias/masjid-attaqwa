import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Button } from "@/app/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Hubungi Kami</h1>

      <Tabs defaultValue="contact" className="w-full max-w-6xl mx-auto">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="contact">Kontak</TabsTrigger>
          <TabsTrigger value="feedback">Form Saran & Kritik</TabsTrigger>
        </TabsList>

        <TabsContent value="contact" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                      <h3 className="font-medium mb-1">Alamat</h3>
                      <p className="text-gray-600">
                        Jl. Masjid Raya No. 123, Kelurahan Sejahtera, Kecamatan Bahagia, Kota Indah, 12345
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Phone className="h-5 w-5 mr-3 text-amber-600 mt-0.5" />
                    <div>
                      <h3 className="font-medium mb-1">Telepon</h3>
                      <p className="text-gray-600">(021) 1234-5678</p>
                      <p className="text-gray-600">+62 812-3456-7890 (WhatsApp)</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Mail className="h-5 w-5 mr-3 text-amber-600 mt-0.5" />
                    <div>
                      <h3 className="font-medium mb-1">Email</h3>
                      <p className="text-gray-600">info@masjidattaqwa.org</p>
                      <p className="text-gray-600">admin@masjidattaqwa.org</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Clock className="h-5 w-5 mr-3 text-amber-600 mt-0.5" />
                    <div>
                      <h3 className="font-medium mb-1">Jam Operasional Sekretariat</h3>
                      <p className="text-gray-600">Senin - Jumat: 08.00 - 16.00 WIB</p>
                      <p className="text-gray-600">Sabtu: 08.00 - 12.00 WIB</p>
                      <p className="text-gray-600">Minggu & Hari Libur: Tutup</p>
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
                <div className="h-[400px] bg-gray-200 flex items-center justify-center">
                  <div className="text-center p-4">
                    <MapPin className="h-8 w-8 mx-auto mb-2 text-amber-600" />
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    className="flex min-h-32 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Tulis pesan, saran, atau kritik Anda"
                  />
                </div>

                <Button type="submit" className="flex items-center gap-2">
                  <Send className="h-4 w-4" />
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
