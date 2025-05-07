import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Clock } from "lucide-react"

export default function PrayerTimes() {
  // Sample prayer times data
  const prayerTimes = [
    { name: "Subuh", time: "04:30" },
    { name: "Dzuhur", time: "12:00" },
    { name: "Ashar", time: "15:15" },
    { name: "Maghrib", time: "18:00" },
    { name: "Isya", time: "19:15" },
  ]

  return (
    <Card>
      <CardHeader className="bg-amber-50">
        <CardTitle className="flex items-center">
          <Clock className="h-5 w-5 mr-2" />
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
