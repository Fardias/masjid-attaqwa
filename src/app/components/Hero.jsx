import { Button } from "./ui/button"
import Link from "next/link"

export default function Hero() {
    return (
        <div className="relative overflow-hidden rounded-xl  ">
            <div className="container  mx-auto px-4 py-8 relative z-10 md:flex md:items-center md:justify-between md:gap-8 
            xl:items-start">
                <img src="hero.jpeg" alt="masjid" className="mb-5 md:mb-0 rounded-md md:w-[300px] md:h-[250px] object-cover xl:w-[500px] xl:h-[250px] 2xl:w-[800px] 2xl:h-[500px]" />
                <div className="max-w-xl 
                ">
                    <h1 className="text-4xl md:text-3xl font-bold mb-4 md:mb-1 xl:text-5xl">Selamat Datang di Masjid At-Taqwa</h1>
                    <p className="text-lg text-gray-700 mb-8 md:mb-3 md:mt-5">
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
        </div>
    )
}
