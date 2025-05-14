// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
// import { Button } from "@/app/components/ui/button"
// import { Input } from "@/app/components/ui/input"
// import { Label } from "@/app/components/ui/label"
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
// import { Separator } from "@/components/ui/separator"
// import { Heart, Landmark, Wallet, CreditCard, Copy, CheckCircle2 } from "lucide-react"

// export default function DonationPage() {
//   return (
//     <div className="container px-4 py-12 mx-auto">
//       <h1 className="mb-4 text-4xl font-bold text-center">Donasi Online</h1>
//       <p className="max-w-2xl mx-auto mb-8 text-center text-gray-600">
//         Berkontribusi dalam pembangunan dan pemeliharaan Masjid At-Taqwa. Setiap donasi Anda akan digunakan untuk
//         kegiatan masjid dan pemberdayaan umat.
//       </p>

//       <div className="grid max-w-6xl grid-cols-1 gap-8 mx-auto lg:grid-cols-3">
//         <div className="lg:col-span-2">
//           <Tabs defaultValue="transfer" className="w-full">
//             <TabsList className="grid w-full grid-cols-2">
//               <TabsTrigger value="transfer" className="cursor-pointer">Transfer Bank</TabsTrigger>
//               <TabsTrigger value="qris" className="cursor-pointer">QRIS</TabsTrigger>
//             </TabsList>

//             <TabsContent value="transfer" className="mt-6">
//               <Card>
//                 <CardHeader>
//                   <CardTitle className="flex items-center">
//                     <Landmark className="w-5 h-5 mr-2 text-amber-600 " />
//                     Transfer Bank
//                   </CardTitle>
//                   <CardDescription>Silakan transfer donasi ke rekening resmi Masjid At-Taqwa</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-6">
//                     <div className="p-4 rounded-lg bg-amber-50">
//                       <div className="flex items-center justify-between">
//                         <div>
//                           <p className="font-medium">Bank Syariah Indonesia (BSI)</p>
//                           <p className="text-gray-600">No. Rekening: 7654321098</p>
//                           <p className="text-gray-600">Atas Nama: Masjid At-Taqwa</p>
//                         </div>
//                         <Button variant="outline" size="sm" className="flex items-center gap-1 cursor-pointer">
//                           <Copy className="w-4 h-4" />
//                           Salin
//                         </Button>
//                       </div>
//                     </div>

//                     <div className="p-4 rounded-lg bg-amber-50">
//                       <div className="flex items-center justify-between">
//                         <div>
//                           <p className="font-medium">Bank Mandiri</p>
//                           <p className="text-gray-600">No. Rekening: 1234567890</p>
//                           <p className="text-gray-600">Atas Nama: Masjid At-Taqwa</p>
//                         </div>
//                         <Button variant="outline" size="sm" className="flex items-center gap-1 cursor-pointer">
//                           <Copy className="w-4 h-4" />
//                           Salin
//                         </Button>
//                       </div>
//                     </div>

//                     <div className="p-4 rounded-lg bg-amber-50">
//                       <div className="flex items-center justify-between">
//                         <div>
//                           <p className="font-medium">Bank BNI</p>
//                           <p className="text-gray-600">No. Rekening: 0987654321</p>
//                           <p className="text-gray-600">Atas Nama: Masjid At-Taqwa</p>
//                         </div>
//                         <Button variant="outline" size="sm" className="flex items-center gap-1 cursor-pointer">
//                           <Copy className="w-4 h-4" />
//                           Salin
//                         </Button>
//                       </div>
//                     </div>
//                   </div>
//                 </CardContent>
//                 <CardFooter className="flex flex-col items-start pt-6 border-t">
//                   <p className="mb-2 text-sm text-gray-500">
//                     Setelah melakukan transfer, mohon konfirmasi dengan mengirimkan bukti transfer ke nomor WhatsApp:
//                     +62 812-3456-7890
//                   </p>
//                   <p className="text-sm text-gray-500">Atau email ke: donasi@masjidattaqwa.org</p>
//                 </CardFooter>
//               </Card>
//             </TabsContent>

//             <TabsContent value="qris" className="mt-6">
//               <Card>
//                 <CardHeader>
//                   <CardTitle className="flex items-center">
//                     <CreditCard className="w-5 h-5 mr-2 text-amber-600" />
//                     QRIS
//                   </CardTitle>
//                   <CardDescription>
//                     Scan kode QRIS untuk donasi melalui aplikasi e-wallet atau mobile banking
//                   </CardDescription>
//                 </CardHeader>
//                 <CardContent className="flex flex-col items-center">
//                   <div className="p-4 mb-4 bg-white border rounded-lg">
//                     <div className="flex items-center justify-center w-64 h-64 bg-gray-200">
//                       <img
//                         src="/placeholder.svg?height=256&width=256"
//                         alt="QRIS Code Masjid At-Taqwa"
//                         className="object-contain w-full h-full"
//                       />
//                     </div>
//                   </div>
//                   <p className="font-medium text-center">Masjid At-Taqwa</p>
//                   <p className="mt-1 text-sm text-center text-gray-500 md:max-w-sm">
//                     Kode QRIS dapat digunakan untuk pembayaran melalui GoPay, OVO, DANA, LinkAja, ShopeePay, dan
//                     aplikasi mobile banking
//                   </p>
//                 </CardContent>
//                 <CardFooter className="flex flex-col items-center pt-6 border-t">
//                   <Button variant="outline" className="flex items-center gap-2 cursor-pointer">
//                     <Copy className="w-4 h-4" />
//                     Unduh Kode QRIS
//                   </Button>
//                 </CardFooter>
//               </Card>
//             </TabsContent>

//             {/* <TabsContent value="form" className="mt-6">
//               <Card>
//                 <CardHeader>
//                   <CardTitle className="flex items-center">
//                     <Heart className="w-5 h-5 mr-2" />
//                     Form Donasi
//                   </CardTitle>
//                   <CardDescription>Isi form berikut untuk melakukan donasi</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <form className="space-y-6">
//                     <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//                       <div className="space-y-2">
//                         <Label htmlFor="name">Nama Lengkap</Label>
//                         <Input id="name" placeholder="Masukkan nama lengkap" />
//                       </div>
//                       <div className="space-y-2">
//                         <Label htmlFor="email">Email</Label>
//                         <Input id="email" type="email" placeholder="Masukkan email" />
//                       </div>
//                     </div>

//                     <div className="space-y-2">
//                       <Label htmlFor="phone">Nomor Telepon/WhatsApp</Label>
//                       <Input id="phone" placeholder="Masukkan nomor telepon/WhatsApp" />
//                     </div>

//                     <div className="space-y-2">
//                       <Label>Jenis Donasi</Label>
//                       <RadioGroup defaultValue="infaq">
//                         <div className="flex items-center space-x-2">
//                           <RadioGroupItem value="infaq" id="infaq" />
//                           <Label htmlFor="infaq">Infaq</Label>
//                         </div>
//                         <div className="flex items-center space-x-2">
//                           <RadioGroupItem value="sedekah" id="sedekah" />
//                           <Label htmlFor="sedekah">Sedekah</Label>
//                         </div>
//                         <div className="flex items-center space-x-2">
//                           <RadioGroupItem value="wakaf" id="wakaf" />
//                           <Label htmlFor="wakaf">Wakaf</Label>
//                         </div>
//                         <div className="flex items-center space-x-2">
//                           <RadioGroupItem value="zakat" id="zakat" />
//                           <Label htmlFor="zakat">Zakat</Label>
//                         </div>
//                       </RadioGroup>
//                     </div>

//                     <div className="space-y-2">
//                       <Label htmlFor="amount">Jumlah Donasi (Rp)</Label>
//                       <Input id="amount" type="number" placeholder="Masukkan jumlah donasi" />
//                     </div>

//                     <div className="space-y-2">
//                       <Label htmlFor="message">Pesan/Doa (Opsional)</Label>
//                       <textarea
//                         id="message"
//                         className="flex w-full px-3 py-2 text-sm border rounded-md min-h-20 border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
//                         placeholder="Tulis pesan atau doa Anda"
//                       />
//                     </div>

//                     <Button type="submit" className="w-full">
//                       Lanjutkan Donasi
//                     </Button>
//                   </form>
//                 </CardContent>
//               </Card>
//             </TabsContent> */}
//           </Tabs>
//         </div>

//         <div className="lg:col-span-1">
//           <Card>
//             <CardHeader className="">
//               <CardTitle>Program Donasi</CardTitle>
//             </CardHeader>
//             <CardContent className="pt-6">
//               <div className="space-y-4">
//                 <div className="p-4 rounded-lg bg-amber-50/50">
//                   <h3 className="flex items-center mb-2 font-medium">
//                     <Wallet className="w-4 h-4 mr-2" />
//                     Pembangunan Masjid
//                   </h3>
//                   <p className="text-sm text-gray-600">Dana untuk renovasi dan perluasan area masjid</p>
//                 </div>

//                 <div className="p-4 rounded-lg bg-amber-50/50">
//                   <h3 className="flex items-center mb-2 font-medium">
//                     <Wallet className="w-4 h-4 mr-2" />
//                     Operasional Masjid
//                   </h3>
//                   <p className="text-sm text-gray-600">Dana untuk kegiatan rutin dan operasional masjid</p>
//                 </div>

//                 <div className="p-4 rounded-lg bg-amber-50/50">
//                   <h3 className="flex items-center mb-2 font-medium">
//                     <Wallet className="w-4 h-4 mr-2" />
//                     Santunan Yatim & Dhuafa
//                   </h3>
//                   <p className="text-sm text-gray-600">Dana untuk membantu anak yatim dan kaum dhuafa</p>
//                 </div>

//                 <div className="p-4 rounded-lg bg-amber-50/50">
//                   <h3 className="flex items-center mb-2 font-medium">
//                     <Wallet className="w-4 h-4 mr-2" />
//                     Pendidikan
//                   </h3>
//                   <p className="text-sm text-gray-600">Dana untuk kegiatan pendidikan di TPQ dan madrasah</p>
//                 </div>
//               </div>

//               <Separator className="my-6" />

//               {/* <div className="space-y-4">
//                 <h3 className="font-medium">Laporan Donasi</h3>
//                 <p className="text-sm text-gray-600">
//                   Masjid At-Taqwa berkomitmen untuk transparan dalam pengelolaan dana donasi. Laporan keuangan
//                   dipublikasikan setiap bulan di papan pengumuman masjid dan website resmi.
//                 </p>
//                 <div className="flex items-center text-sm text-green-600">
//                   <CheckCircle2 className="w-4 h-4 mr-2" />
//                   Diaudit oleh akuntan publik
//                 </div>
//               </div> */}
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   )
// }

"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Button } from "../../components/ui/button"
import { Separator } from "../../components/ui/separator"
import { Landmark, Wallet, CreditCard, Copy, Download } from "lucide-react"
import { toast, Toaster } from "sonner"

export default function DonationPage() {
  const copyToClipboard = (text, bankName) => {
    if (!navigator.clipboard) {
      toast.error("Clipboard tidak didukung", {
        description: "Browser tidak mendukung fitur salin ke clipboard.",
        duration: 3000,
      });
      return;
    }

    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success("Berhasil disalin!", {
          description: `Nomor rekening ${bankName} telah disalin ke clipboard.`,
          duration: 3000,
        });
      })
      .catch((err) => {
        toast.error("Gagal menyalin", {
          description: "Terjadi kesalahan saat menyalin nomor rekening.",
          duration: 3000,
        });
        console.error("Failed to copy: ", err);
      });
  };


  const downloadQRCode = () => {
    // kalo QR code udah ada, disini logic nya

    toast.success("QR Code diunduh!", {
      description: "Kode QRIS telah berhasil diunduh.",
      duration: 3000,
    })
  }

  return (
    <div className="container px-4 py-12 mx-auto">
      {/* Add the Toaster component to render the toasts */}
      <Toaster position="top-center" richColors />

      <h1 className="mb-4 text-4xl font-bold text-center">Donasi Online</h1>
      <p className="max-w-2xl mx-auto mb-8 text-center text-gray-600">
        Berkontribusi dalam pembangunan dan pemeliharaan Masjid At-Taqwa. Setiap donasi Anda akan digunakan untuk
        kegiatan masjid dan pemberdayaan umat.
      </p>

      <div className="grid max-w-6xl grid-cols-1 gap-8 mx-auto lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Tabs defaultValue="transfer" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="transfer" className="cursor-pointer">
                Transfer Bank
              </TabsTrigger>
              <TabsTrigger value="qris" className="cursor-pointer">
                QRIS
              </TabsTrigger>
            </TabsList>

            <TabsContent value="transfer" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Landmark className="w-5 h-5 mr-2 text-amber-600 " />
                    Transfer Bank
                  </CardTitle>
                  <CardDescription>Silakan transfer donasi ke rekening resmi Masjid At-Taqwa</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="p-4 rounded-lg bg-amber-50">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Bank Syariah Indonesia (BSI)</p>
                          <p className="text-gray-600">No. Rekening: 7654321098</p>
                          <p className="text-gray-600">Atas Nama: Masjid At-Taqwa</p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-1 cursor-pointer"
                          onClick={() => copyToClipboard("7654321098", "BSI")}
                        >
                          <Copy className="w-4 h-4" />
                          Salin
                        </Button>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-amber-50">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Bank Mandiri</p>
                          <p className="text-gray-600">No. Rekening: 1234567890</p>
                          <p className="text-gray-600">Atas Nama: Masjid At-Taqwa</p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-1 cursor-pointer"
                          onClick={() => copyToClipboard("1234567890", "Mandiri")}
                        >
                          <Copy className="w-4 h-4" />
                          Salin
                        </Button>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-amber-50">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Bank BNI</p>
                          <p className="text-gray-600">No. Rekening: 0987654321</p>
                          <p className="text-gray-600">Atas Nama: Masjid At-Taqwa</p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-1 cursor-pointer"
                          onClick={() => copyToClipboard("0987654321", "BNI")}
                        >
                          <Copy className="w-4 h-4" />
                          Salin
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col items-start pt-6 border-t">
                  <p className="mb-2 text-sm text-gray-500">
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
                    <CreditCard className="w-5 h-5 mr-2 text-amber-600" />
                    QRIS
                  </CardTitle>
                  <CardDescription>
                    Scan kode QRIS untuk donasi melalui aplikasi e-wallet atau mobile banking
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <div className="p-4 mb-4 bg-white border rounded-lg">
                    <div className="flex items-center justify-center w-64 h-64 bg-gray-200">
                      <img
                        src="/placeholder.svg?height=256&width=256"
                        alt="QRIS Code Masjid At-Taqwa"
                        className="object-contain w-full h-full"
                      />
                    </div>
                  </div>
                  <p className="font-medium text-center">Masjid At-Taqwa</p>
                  <p className="mt-1 text-sm text-center text-gray-500 md:max-w-sm">
                    Kode QRIS dapat digunakan untuk pembayaran melalui GoPay, OVO, DANA, LinkAja, ShopeePay, dan
                    aplikasi mobile banking
                  </p>
                </CardContent>
                <CardFooter className="flex flex-col items-center pt-6 border-t">
                  <Button variant="outline" className="flex items-center gap-2 cursor-pointer" onClick={downloadQRCode}>
                    <Download className="w-4 h-4" />
                    Unduh Kode QRIS
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="">
              <CardTitle>Program Donasi</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-amber-50/50">
                  <h3 className="flex items-center mb-2 font-medium">
                    <Wallet className="w-4 h-4 mr-2" />
                    Pembangunan Masjid
                  </h3>
                  <p className="text-sm text-gray-600">Dana untuk renovasi dan perluasan area masjid</p>
                </div>

                <div className="p-4 rounded-lg bg-amber-50/50">
                  <h3 className="flex items-center mb-2 font-medium">
                    <Wallet className="w-4 h-4 mr-2" />
                    Operasional Masjid
                  </h3>
                  <p className="text-sm text-gray-600">Dana untuk kegiatan rutin dan operasional masjid</p>
                </div>

                <div className="p-4 rounded-lg bg-amber-50/50">
                  <h3 className="flex items-center mb-2 font-medium">
                    <Wallet className="w-4 h-4 mr-2" />
                    Santunan Yatim & Dhuafa
                  </h3>
                  <p className="text-sm text-gray-600">Dana untuk membantu anak yatim dan kaum dhuafa</p>
                </div>

                <div className="p-4 rounded-lg bg-amber-50/50">
                  <h3 className="flex items-center mb-2 font-medium">
                    <Wallet className="w-4 h-4 mr-2" />
                    Pendidikan
                  </h3>
                  <p className="text-sm text-gray-600">Dana untuk kegiatan pendidikan di TPQ dan madrasah</p>
                </div>
              </div>

              <Separator className="my-6" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
