"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "./ui/button"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import { Menu } from "lucide-react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { name: "Beranda", href: "/" },
    { name: "Profil", href: "/profil" },
    { name: "Pengumuman", href: "/pengumuman" },
    { name: "Album", href: "/album" },
    { name: "FAQ", href: "/faq" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container w-full lg:px-4 flex h-16 items-center mx-auto justify-between">

        <div className="flex items-center gap-2 w-full">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <div className="flex justify-between items-center w-full  px-4">
              <h1 className="font-bold uppercase text-amber-600
              ">Masjid At-Taqwa</h1>
              <SheetTrigger asChild>
                <Button c variant="ghost" size="icon" className="lg:hidden bg-amber-600">
                  <Menu className="h-6 w-6 text-white" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
            </div>

            <SheetContent side="left" className="w-[300px] sm:w-[400px]">

              <nav className="flex flex-col gap-4 p-4 mt-10">
                <div>
                  <h2 className="text-lg font-bold">Masjid At-Taqwa</h2>
                </div>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-lg font-medium hover:text-amber-600 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}

                <Link href="/donasi" onClick={() => setIsOpen(false)}>
                  <Button className="mt-4 w-full bg-amber-600 hover:bg-amber-700">
                    Donasi Sekarang
                  </Button>
                </Link>
              </nav>
            </SheetContent>

          </Sheet>


        </div>

        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium hover:text-amber-600 transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button className="bg-amber-600 hover:bg-amber-700">
            <Link href="/donasi">Donasi Sekarang</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
