import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Heart, Landmark, Wallet, CreditCard, Copy, CheckCircle2 } from "lucide-react"

export default function DonationPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-4 text-center">Donasi Online</h1>
      <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
        Berkontribusi dalam pembangunan dan pemeliharaan Masjid At-Taqwa. Setiap donasi Anda akan digunakan untuk
        kegiatan masjid dan pemberdayaan umat.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="lg:col-span-2">
          <Tabs defaultValue="transfer" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="transfer">Transfer Bank</TabsTrigger>
              <TabsTrigger value="qris">QRIS</TabsTrigger>
              <TabsTrigger value="form">Form Donasi</TabsTrigger>
            </TabsList>

            <TabsContent value="transfer" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Landmark className="mr-2 h-5 w-5" />
                    Transfer Bank
                  </CardTitle>
                  <CardDescription>Silakan transfer donasi ke rekening resmi Masjid At-Taqwa</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="bg-amber-50 p-4 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Bank Syariah Indonesia (BSI)</p>
                          <p className="text-gray-600">No. Rekening: 7654321098</p>
                          <p className="text-gray-600">Atas Nama: Masjid At-Taqwa</p>
                        </div>
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                          <Copy className="h-4 w-4" />
                          Salin
                        </Button>
                      </div>
                    </div>

                    <div className="bg-amber-50 p-4 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Bank Mandiri</p>
                          <p className="text-gray-600">No. Rekening: 1234567890</p>
                          <p className="text-gray-600">Atas Nama: Masjid At-Taqwa</p>
                        </div>
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                          <Copy className="h-4 w-4" />
                          Salin
                        </Button>
                      </div>
                    </div>

                    <div className="bg-amber-50 p-4 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Bank BNI</p>
                          <p className="text-gray-600">No. Rekening: 0987654321</p>
                          <p className="text-gray-600">Atas Nama: Masjid At-Taqwa</p>
                        </div>
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                          <Copy className="h-4 w-4" />
                          Salin
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col items-start border-t pt-6">
                  <p className="text-sm text-gray-500 mb-2">
                    Setelah melakukan transfer, mohon konfirmasi dengan mengirimkan bukti transfer ke nomor WhatsApp:
                    +62 812-3456-7890
                  </p>
                  <p className="text-sm text-gray-500">Atau email ke: donasi@masjidattaqwa.org</p>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="qris" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="mr-2 h-5 w-5" />
                    QRIS
                  </CardTitle>
                  <CardDescription>
                    Scan kode QRIS untuk donasi melalui aplikasi e-wallet atau mobile banking
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <div className="bg-white p-4 rounded-lg border mb-4">
                    <div className="w-64 h-64 bg-gray-200 flex items-center justify-center">
                      <img
                        src="/placeholder.svg?height=256&width=256"
                        alt="QRIS Code Masjid At-Taqwa"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                  <p className="text-center font-medium">Masjid At-Taqwa</p>
                  <p className="text-center text-sm text-gray-500 mt-1">
                    Kode QRIS dapat digunakan untuk pembayaran melalui GoPay, OVO, DANA, LinkAja, ShopeePay, dan
                    aplikasi mobile banking
                  </p>
                </CardContent>
                <CardFooter className="flex flex-col items-center border-t pt-6">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Copy className="h-4 w-4" />
                    Unduh Kode QRIS
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="form" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Heart className="mr-2 h-5 w-5" />
                    Form Donasi
                  </CardTitle>
                  <CardDescription>Isi form berikut untuk melakukan donasi</CardDescription>
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
                      <Label>Jenis Donasi</Label>
                      <RadioGroup defaultValue="infaq">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="infaq" id="infaq" />
                          <Label htmlFor="infaq">Infaq</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="sedekah" id="sedekah" />
                          <Label htmlFor="sedekah">Sedekah</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="wakaf" id="wakaf" />
                          <Label htmlFor="wakaf">Wakaf</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="zakat" id="zakat" />
                          <Label htmlFor="zakat">Zakat</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="amount">Jumlah Donasi (Rp)</Label>
                      <Input id="amount" type="number" placeholder="Masukkan jumlah donasi" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Pesan/Doa (Opsional)</Label>
                      <textarea
                        id="message"
                        className="flex min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Tulis pesan atau doa Anda"
                      />
                    </div>

                    <Button type="submit" className="w-full">
                      Lanjutkan Donasi
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="bg-amber-50">
              <CardTitle>Program Donasi</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="bg-amber-50/50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2 flex items-center">
                    <Wallet className="h-4 w-4 mr-2" />
                    Pembangunan Masjid
                  </h3>
                  <p className="text-sm text-gray-600">Dana untuk renovasi dan perluasan area masjid</p>
                </div>

                <div className="bg-amber-50/50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2 flex items-center">
                    <Wallet className="h-4 w-4 mr-2" />
                    Operasional Masjid
                  </h3>
                  <p className="text-sm text-gray-600">Dana untuk kegiatan rutin dan operasional masjid</p>
                </div>

                <div className="bg-amber-50/50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2 flex items-center">
                    <Wallet className="h-4 w-4 mr-2" />
                    Santunan Yatim & Dhuafa
                  </h3>
                  <p className="text-sm text-gray-600">Dana untuk membantu anak yatim dan kaum dhuafa</p>
                </div>

                <div className="bg-amber-50/50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2 flex items-center">
                    <Wallet className="h-4 w-4 mr-2" />
                    Pendidikan
                  </h3>
                  <p className="text-sm text-gray-600">Dana untuk kegiatan pendidikan di TPQ dan madrasah</p>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="space-y-4">
                <h3 className="font-medium">Laporan Donasi</h3>
                <p className="text-sm text-gray-600">
                  Masjid At-Taqwa berkomitmen untuk transparan dalam pengelolaan dana donasi. Laporan keuangan
                  dipublikasikan setiap bulan di papan pengumuman masjid dan website resmi.
                </p>
                <div className="flex items-center text-sm text-green-600">
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Diaudit oleh akuntan publik
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
