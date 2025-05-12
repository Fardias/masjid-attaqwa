"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "./ui/button"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import { Menu } from "lucide-react"

import { usePathname } from "next/navigation"


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

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
            <div className="flex justify-between items-center w-full px-4">
              <Link href="/" className="font-bold uppercase text-amber-600
              ">Masjid At-Taqwa</Link>
              <SheetTrigger asChild>
                <Button c variant="default" size="icon" className="lg:hidden bg-amber-600 hover:opacity-90
              ]
                ">
                  <Menu className="h-6 w-6 text-white" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
            </div>

            <SheetContent side="left" className="w-[300px] sm:w-[400px]">

              <nav className="flex flex-col gap-4 p-4 mt-10">
                <div>
                  <Link href="/" className="text-lg font-bold">Masjid At-Taqwa</Link>
                </div>
                {navLinks.map((link) => {
                  const isActive = pathname === link.href

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`text-lg font-medium transition-colors ${isActive ? "text-amber-600 font-bold" : "hover:text-amber-600"
                        }`}
                    >
                      {link.name}
                    </Link>
                  )
                })}


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
          {navLinks.map((link) => {
            const isActive = pathname === link.href

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`text-lg font-medium transition-colors ${isActive ? "text-amber-600 font-bold" : "hover:text-amber-600"
                  }`}
              >
                {link.name}
              </Link>
            )
          })}

        </nav>

        <div className="hidden lg:block lg:ml-4">
          <Button className="bg-amber-600 hover:bg-amber-700">
            <Link href="/donasi">Donasi Sekarang</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
