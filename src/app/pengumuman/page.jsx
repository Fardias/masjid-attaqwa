import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Badge } from "@/app/components/ui/badge"
import { CalendarIcon } from "lucide-react"

export default function AnnouncementsPage() {
  // Sample announcements data
  const announcements = [
    // {
    //   id: 1,
    //   title: "Jadwal Sholat Tarawih Ramadhan 1445 H",
    //   date: "15 Februari 2024",
    //   category: "Ibadah",
    //   content:
    //     "Diumumkan kepada seluruh jamaah Masjid At-Taqwa bahwa sholat tarawih akan dimulai pada tanggal 12 Maret 2024 setelah sholat Isya. Imam tarawih akan dipimpin oleh Ustadz Ahmad Syafii dan Ustadz Zainuddin secara bergantian.",
    // },
    // {
    //   id: 2,
    //   title: "Pengajian Akbar Menyambut Tahun Baru Islam 1446 H",
    //   date: "20 Februari 2024",
    //   category: "Kajian",
    //   content:
    //     "Masjid At-Taqwa akan menyelenggarakan pengajian akbar dalam rangka menyambut tahun baru Islam 1446 H pada hari Minggu, 7 Juli 2024 pukul 08.00 - 12.00 WIB. Pengajian akan diisi oleh Ustadz Dr. Abdul Somad, Lc., MA. Diharapkan seluruh jamaah dapat hadir untuk memeriahkan acara ini.",
    // },
    // {
    //   id: 3,
    //   title: "Pembukaan Pendaftaran TPQ Masjid At-Taqwa",
    //   date: "1 Maret 2024",
    //   category: "Pendidikan",
    //   content:
    //     "Dibuka pendaftaran santri baru Taman Pendidikan Al-Quran (TPQ) Masjid At-Taqwa untuk tahun ajaran 2024/2025. Pendaftaran dibuka mulai tanggal 1-30 April 2024. Formulir pendaftaran dapat diambil di sekretariat masjid atau diunduh melalui website resmi Masjid At-Taqwa.",
    // },
    // {
    //   id: 4,
    //   title: "Kegiatan Bakti Sosial dan Santunan Anak Yatim",
    //   date: "10 Maret 2024",
    //   category: "Sosial",
    //   content:
    //     "Masjid At-Taqwa akan mengadakan kegiatan bakti sosial dan santunan anak yatim pada hari Sabtu, 20 April 2024. Bagi jamaah yang ingin berpartisipasi dalam kegiatan ini, dapat menghubungi panitia atau menyalurkan donasi melalui rekening resmi Masjid At-Taqwa.",
    // },
    // {
    //   id: 5,
    //   title: "Jadwal Khatib Jumat Bulan April 2024",
    //   date: "25 Maret 2024",
    //   category: "Ibadah",
    //   content:
    //     "Berikut adalah jadwal khatib Jumat untuk bulan April 2024:\n- 5 April: Ustadz Ahmad Syafii\n- 12 April: Ustadz Dr. Muhammad Nur Ihsan\n- 19 April: Ustadz Zainuddin\n- 26 April: Ustadz H. Abdul Karim",
    // },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Pengumuman</h1>

      {announcements.length > 0 ? (
        <div className="grid gap-6">
          {announcements.map((announcement) => (
            <Card key={announcement.id} className="overflow-hidden">
              <CardHeader className="bg-amber-50">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{announcement.title}</CardTitle>
                    <CardDescription className="flex items-center mt-2">
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      {announcement.date}
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-200">
                    {announcement.category}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-gray-700 whitespace-pre-line">{announcement.content}</p>
              </CardContent>
              <CardFooter className="border-t bg-amber-50/50 flex justify-end">
                <p className="text-sm text-gray-500">Diumumkan oleh Pengurus Masjid At-Taqwa</p>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">Tidak ada pengumuman</p>
      )}
    </div>
  )
}
