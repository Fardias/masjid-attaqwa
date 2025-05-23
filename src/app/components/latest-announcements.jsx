import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { BellRing } from "lucide-react"
import Link from "next/link"
import { Button } from "../../components/ui/button"
import { getPengumuman } from "../../lib/services/PengumumanService"
import useSWR from "swr"

const fetchAnnouncements = () => getPengumuman()

export default function LatestAnnouncements({ className }) {
  const { data: announcements, error } = useSWR("latest_announcements", fetchAnnouncements)

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(date)
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center">
          <BellRing className="w-5 h-5 mr-2 text-amber-600" />
          Pengumuman Terbaru
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        {announcements && announcements.length > 0 ? (
          <>
            <div className="space-y-6">
              {announcements.map((announcement) => (
                <div key={announcement.id} className="pb-4 border-b last:border-0 last:pb-0">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium">{announcement.title}</h3>
                    <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-200">
                      {announcement.category}
                    </Badge>
                  </div>
                  <p className="mb-2 text-sm text-gray-600">{formatDate(announcement.date)}</p>
                  <p className="mb-3 text-gray-600 whitespace-normal break-words">
                    {announcement.excerpt}
                  </p>
                  <Link
                    href={`/pengumuman#${announcement.id}`}
                    className="text-sm font-medium text-amber-600 hover:text-amber-700"
                  >
                    Baca selengkapnya
                  </Link>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Button variant="outline" asChild>
                <Link href="/pengumuman">Lihat Semua Pengumuman</Link>
              </Button>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-600">Tidak ada pengumuman terbaru</p>
        )}
      </CardContent>
    </Card>
  )
}
