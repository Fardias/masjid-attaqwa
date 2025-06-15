import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Clock } from "lucide-react"
import useSWR from 'swr'
import { format } from 'date-fns'
import { useState, useEffect } from 'react'

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function PrayerTimes() {
  const currentDate = format(new Date(), 'yyyy/MM')
  const { data, error, isLoading } = useSWR(`https://api.myquran.com/v2/sholat/jadwal/1107/${currentDate}`, fetcher)
  const [currentTime, setCurrentTime] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const hours = now.getHours().toString().padStart(2, '0')
      const minutes = now.getMinutes().toString().padStart(2, '0')
      const seconds = now.getSeconds().toString().padStart(2, '0')
      setCurrentTime(`${hours}:${minutes}:${seconds}`)
    }

    updateTime() // Initial call
    const interval = setInterval(updateTime, 1000)

    return () => clearInterval(interval) // Cleanup on unmount
  }, [])

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
      <CardContent className="">
        <div className="text-center mb-3 p-3 rounded-lg bg-amber-100/50">
          <p className="text-sm text-gray-500">Waktu Saat Ini</p>
          <p className="text-xl font-semibold text-amber-600">{currentTime} WIB</p>
        </div>
        <div className="space-y-4">
          <p className="text-center mb-4">- Kota Tangerang Selatan -</p>
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
