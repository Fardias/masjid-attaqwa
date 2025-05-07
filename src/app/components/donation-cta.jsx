import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Heart } from "lucide-react"
import Link from "next/link"

export default function DonationCta({ className }) {
  return (
    <Card className={className}>
      <CardHeader className="bg-amber-50">
        <CardTitle className="flex items-center">
          <Heart className="h-5 w-5 mr-2" />
          Donasi untuk Masjid
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <p className="text-gray-600">
            Berkontribusi dalam pembangunan dan pemeliharaan Masjid At-Taqwa. Setiap donasi Anda akan digunakan untuk
            kegiatan masjid dan pemberdayaan umat.
          </p>
          <div className="bg-amber-50/50 p-4 rounded-lg">
            <p className="font-medium mb-2">Bank Syariah Indonesia (BSI)</p>
            <p className="text-gray-600">No. Rekening: 7654321098</p>
            <p className="text-gray-600 mb-4">Atas Nama: Masjid At-Taqwa</p>
          </div>
          <Button className="w-full bg-amber-600 hover:bg-amber-700" asChild>
            <Link href="/donasi">Donasi Sekarang</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
