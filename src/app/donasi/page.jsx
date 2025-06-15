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
    const qrCode = document.getElementById("qr-code");
    if (!qrCode) {
      toast.error("QR Code tidak ditemukan", {
        description: "Terjadi kesalahan saat mengunduh QR Code.",
        duration: 3000,
      });
      return;
    }

    // Create a temporary link element
    const link = document.createElement("a");
    link.href = qrCode.src;
    link.download = "qris-masjid-at-taqwa.jpg"; // Set a more descriptive filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success("QR Code diunduh!", {
      description: "Kode QRIS telah berhasil diunduh.",
      duration: 3000,
    });
  };

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
                    {/* <div className="p-4 rounded-lg bg-amber-50">
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
                    </div> */}

                    <div className="p-4 rounded-lg bg-amber-50">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Bank BNI</p>
                          <p className="text-gray-600">No. Rekening: --</p>
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
                    0812-9023-188
                  </p>
                  {/* <p className="text-sm text-gray-500">Atau email ke: donasi@masjidattaqwa.org</p> */}
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
                        id="qr-code"
                        src="images/qris.jpeg"
                        alt="QRIS Code Masjid At-Taqwa"
                        className="object-cover w-full h-full"
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

                {/* <div className="p-4 rounded-lg bg-amber-50/50">
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
                </div> */}
              </div>

              <Separator className="my-6" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
