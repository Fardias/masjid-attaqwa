import { Button } from "./ui/button"
import Link from "next/link"

export default function Hero() {
    return (
        <div className="relative overflow-hidden rounded-xl bg-amber-50">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-100/80 to-transparent" />
            <div className="container mx-auto px-4 py-8 md:py-24 relative z-10">
                <img src="hero.jpeg" alt="masjid" className="mb-5 rounded-md" />
                <div className="max-w-xl">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Selamat Datang di Masjid At-Taqwa</h1>
                    <p className="text-lg text-gray-700 mb-8">
                        Pusat ibadah dan pembinaan umat yang nyaman dan representatif. Mari bersama-sama memakmurkan masjid dan
                        membangun umat yang bertaqwa.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button className="bg-amber-600 hover:bg-amber-700">
                            <Link href="/profil">Tentang Kami</Link>
                        </Button>
                        <Button variant="outline">
                            <Link href="/pengumuman">Lihat Pengumuman</Link>
                        </Button>
                    </div>
                </div>
            </div>
            <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-amber-200/20 hidden md:block" />
        </div>
    )
}
