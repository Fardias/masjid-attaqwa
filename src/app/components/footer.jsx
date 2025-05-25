import Link from "next/link"
import { ChurchIcon as Mosque, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react"
import PrayerTimes from "./prayer-times"

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="container px-4 py-12 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* About Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-amber-600">Masjid At-Taqwa</span>
            </div>
            <p className="text-gray-600">
              Masjid At-Taqwa adalah tempat ibadah dan pusat kegiatan Islam yang berlokasi di Kota Indah. Kami
              berkomitmen untuk menyediakan lingkungan yang nyaman bagi jamaah untuk beribadah dan mengembangkan diri
              dalam nilai-nilai Islam.
            </p>
            <div className="flex space-x-4 pt-2">
              <Link href="#" className="text-gray-600 hover:text-amber-600 transition-colors">
                <Facebook className="w-5 h-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-600 hover:text-amber-600 transition-colors">
                <Twitter className="w-5 h-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-600 hover:text-amber-600 transition-colors">
                <Instagram className="w-5 h-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-600 hover:text-amber-600 transition-colors">
                <Youtube className="w-5 h-5" />
                <span className="sr-only">Youtube</span>
              </Link>
            </div>
          </div>

          {/* Menu Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-amber-600">Menu</h3>
            <ul className="grid grid-cols-2 gap-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-amber-600 transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/profil" className="text-gray-600 hover:text-amber-600 transition-colors">
                  Profil
                </Link>
              </li>
              <li>
                <Link href="/pengumuman" className="text-gray-600 hover:text-amber-600 transition-colors">
                  Pengumuman
                </Link>
              </li>
              <li>
                <Link href="/album" className="text-gray-600 hover:text-amber-600 transition-colors">
                  Album
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-600 hover:text-amber-600 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/donasi" className="text-gray-600 hover:text-amber-600 transition-colors">
                  Donasi Online
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-amber-600 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/admin/dashboard" className="text-gray-600 hover:text-amber-600 transition-colors">
                  Admin
                </Link>
              </li>
            </ul>
          </div>

          {/* Prayer Times Section */}
          {/* <div className="space-y-4">
            <h3 className="text-lg font-bold text-amber-600">Jadwal Sholat</h3>
            <div className="bg-white rounded-lg shadow-sm">
              <PrayerTimes />
            </div>
          </div> */}

          {/* Contact Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-amber-600">Kontak</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-amber-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-600">
                  Jl. Masjid Raya No. 123, Kelurahan Sejahtera, Kecamatan Bahagia, Kota Indah, 12345
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-2 text-amber-600 flex-shrink-0" />
                <span className="text-gray-600">(021) 1234-5678</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-2 text-amber-600 flex-shrink-0" />
                <span className="text-gray-600">info@masjidattaqwa.org</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 mt-12 text-center text-gray-600 border-t">
          <p>&copy; {new Date().getFullYear()} Masjid At-Taqwa. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
