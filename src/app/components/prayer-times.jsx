import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Clock } from "lucide-react"
import useSWR from 'swr'
import { format } from 'date-fns'

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function PrayerTimes() {
  const currentDate = format(new Date(), 'yyyy/MM')
  const { data, error, isLoading } = useSWR(`https://api.myquran.com/v2/sholat/jadwal/1107/${currentDate}`, fetcher)

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="h-5 w-5 mr-2 text-amber-600" />
            Jadwal Sholat Hari Ini
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="text-center text-gray-500">Loading...</p>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="h-5 w-5 mr-2 text-amber-600" />
            Jadwal Sholat Hari Ini
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="text-center text-red-500">Error loading prayer times</p>
        </CardContent>
      </Card>
    )
  }

  const todayPrayerTimes = data?.data?.jadwal?.[0]

  if (!todayPrayerTimes) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="h-5 w-5 mr-2 text-amber-600" />
            Jadwal Sholat Hari Ini
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="text-center text-gray-500">Jadwal sholat tidak tersedia</p>
        </CardContent>
      </Card>
    )
  }

  const prayerTimes = [
    { name: "Subuh", time: todayPrayerTimes.subuh },
    { name: "Dzuhur", time: todayPrayerTimes.dzuhur },
    { name: "Ashar", time: todayPrayerTimes.ashar },
    { name: "Maghrib", time: todayPrayerTimes.maghrib },
    { name: "Isya", time: todayPrayerTimes.isya },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Clock className="h-5 w-5 mr-2 text-amber-600" />
          Jadwal Sholat Hari Ini
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          {prayerTimes.map((prayer) => (
            <div key={prayer.name} className="flex justify-between items-center p-3 rounded-lg bg-amber-50/50">
              <span className="font-medium">{prayer.name}</span>
              <span className="text-gray-600">{prayer.time} WIB</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
