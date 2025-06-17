import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Heart } from "lucide-react"
import Link from "next/link"

export default function DonationCta({ className }) {
  return (
    <Card className={className}>
      <CardHeader className="">
        <CardTitle className="flex items-center">
          <Heart className="w-5 h-5 mr-2 text-amber-600" />
          Donasi untuk Masjid
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-1">
        <div className="space-y-4">
          <p className="text-gray-600">
            Berkontribusi dalam pembangunan dan pemeliharaan Masjid At-Taqwa. Setiap donasi Anda akan digunakan untuk
            kegiatan masjid.
          </p>
          {/* <div className="p-4 rounded-lg bg-amber-50/50">
            <p className="mb-2 font-medium">Bank Syariah Indonesia (BSI)</p>
            <p className="text-gray-600">No. Rekening: 7654321098</p>
            <p className="mb-4 text-gray-600">Atas Nama: Masjid At-Taqwa</p>
          </div> */}
          <Button className="w-full bg-amber-600 hover:bg-amber-700" asChild>
            <Link href="/donasi">Donasi Sekarang</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
