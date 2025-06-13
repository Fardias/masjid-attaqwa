"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../../../components/ui/card"
import { Button } from "../../../../../components/ui/button"
import { Input } from "../../../../../components/ui/input"
import { Label } from "../../../../../components/ui/label"
import { toast } from "sonner"

export default function EditAlbumPage({ params }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [albumData, setAlbumData] = useState({
    title: "",
    description: "",
    date: "",
  })

  useEffect(() => {
    // Fetch album data when component mounts
    const fetchAlbumData = async () => {
      try {
        const response = await fetch(`/api/albums/${params.id}`)
        if (!response.ok) throw new Error("Failed to fetch album data")
        const data = await response.json()
        setAlbumData(data)
      } catch (error) {
        console.error("Error fetching album:", error)
        toast.error("Gagal memuat data album")
      }
    }

    fetchAlbumData()
  }, [params.id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch(`/api/albums/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(albumData),
      })

      if (!response.ok) throw new Error("Failed to update album")

      toast.success("Album berhasil diperbarui")
      router.push("/admin/dashboard/albums")
    } catch (error) {
      console.error("Error updating album:", error)
      toast.error("Gagal memperbarui album")
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setAlbumData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Edit Album</CardTitle>
          <CardDescription>Edit informasi album galeri</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Judul Album</Label>
              <Input
                id="title"
                name="title"
                value={albumData.title}
                onChange={handleChange}
                placeholder="Masukkan judul album"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Deskripsi</Label>
              {/* <Textarea
                id="description"
                name="description"
                value={albumData.description}
                onChange={handleChange}
                placeholder="Masukkan deskripsi album"
                required
              /> */}
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Tanggal</Label>
              <Input
                id="date"
                name="date"
                type="date"
                value={albumData.date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex gap-4">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Menyimpan..." : "Simpan Perubahan"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/admin/dashboard/albums")}
              >
                Batal
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
