import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { BellRing } from "lucide-react"
import Link from "next/link"
import { Button } from "./ui/button"

export default function LatestAnnouncements({ className }) {
  // Sample announcements data
  const announcements = [
    // {
    //   id: 1,
    //   title: "Jadwal Sholat Tarawih Ramadhan 1445 H",
    //   date: "15 Februari 2024",
    //   category: "Ibadah",
    //   excerpt:
    //     "Diumumkan kepada seluruh jamaah Masjid At-Taqwa bahwa sholat tarawih akan dimulai pada tanggal 12 Maret 2024 setelah sholat Isya...",
    // },
    // {
    //   id: 2,
    //   title: "Pengajian Akbar Menyambut Tahun Baru Islam 1446 H",
    //   date: "20 Februari 2024",
    //   category: "Kajian",
    //   excerpt:
    //     "Masjid At-Taqwa akan menyelenggarakan pengajian akbar dalam rangka menyambut tahun baru Islam 1446 H pada hari Minggu, 7 Juli 2024...",
    // },
    // {
    //   id: 3,
    //   title: "Pembukaan Pendaftaran TPQ Masjid At-Taqwa",
    //   date: "1 Maret 2024",
    //   category: "Pendidikan",
    //   excerpt:
    //     "Dibuka pendaftaran santri baru Taman Pendidikan Al-Quran (TPQ) Masjid At-Taqwa untuk tahun ajaran 2024/2025. Pendaftaran dibuka mulai tanggal...",
    // },
  ]

  return (
    <Card className={className}>
      <CardHeader className="">
        <CardTitle className="flex items-center">
          <BellRing className="h-5 w-5 mr-2 text-amber-600" />
          Pengumuman Terbaru
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        {announcements.length > 0 ? (
          <div className="space-y-6">
            {announcements.map((announcement) => (
              <div key={announcement.id} className="border-b pb-4 last:border-0 last:pb-0">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium">{announcement.title}</h3>
                  <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-200">
                    {announcement.category}
                  </Badge>
                </div>
                <p className="text-gray-600 text-sm mb-2">{announcement.date}</p>
                <p className="text-gray-600 mb-3">{announcement.excerpt}</p>
                <Link
                  href={`/pengumuman#${announcement.id}`}
                  className="text-amber-600 hover:text-amber-700 text-sm font-medium"
                >
                  Baca selengkapnya
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center">Tidak ada pengumuman terbaru</p>
        )}
        {announcements.length > 0 && (
          <div className="mt-6 text-center">
            <Button variant="outline" asChild>
              <Link href="/pengumuman">Lihat Semua Pengumuman</Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
