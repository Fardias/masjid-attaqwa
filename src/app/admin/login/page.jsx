'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card" // Pastikan path benar
import { Input } from "../../components/ui/input" // Pastikan path benar
import { Button } from "../../components/ui/button" // Pastikan path benar
import { Label } from "../../components/ui/label" // Pastikan path benar
import { setCookie } from 'cookies-next'
import { Eye, EyeOff } from "lucide-react"

export default function AdminLoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()

    if (username === process.env.NEXT_PUBLIC_ADMIN_USERNAME &&
      password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      setCookie('isAdmin', 'true', {
        maxAge: 60 * 60 * 24, // 1 day
        path: '/',
        // secure: process.env.NODE_ENV === 'production', // Tambahkan untuk HTTPS di produksi
        // httpOnly: true, // Jika cookie tidak perlu diakses oleh JavaScript client-side (lebih aman)
        // sameSite: 'lax', // Rekomendasi untuk kebanyakan kasus
      })
      router.push('/admin/dashboard')
    } else {
      setError("Username atau password salah")
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12 bg-gray-50"> 
      <Card className="w-full max-w-md shadow-xl"> 
        <CardHeader>
          <CardTitle className="text-2xl text-center">Login Admin</CardTitle>
          <CardDescription className="text-center">
            Masukkan kredensial untuk mengakses dashboard admin
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Masukkan username admin"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Masukkan password admin"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute inset-y-0 right-0 flex items-center h-full px-3 text-gray-500 hover:text-gray-700" // Memastikan tombol terpusat vertikal
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" /> 
                  ) : (
                    <Eye className="w-5 h-5" /> 
                  )}
                </Button>
              </div>
            </div>
            {error && (
              <p className="text-sm text-center text-red-600">{error}</p> 
            )}
            <Button type="submit" className="w-full text-white bg-amber-600 hover:bg-amber-700">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}