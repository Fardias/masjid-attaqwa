"use client"

import { usePathname } from "next/navigation"
import Navbar from "./navbar" // Pastikan path ini benar
import Footer from "./footer" // Pastikan path ini benar

export default function LayoutWrapper({ children }) {
    const pathname = usePathname()
    // Modifikasi kondisi: sekarang mengecek apakah path dimulai dengan /admin/
    const isAdminAreaPage = pathname.startsWith("/admin/")

    return (
        <>
            {/* 
              Div wrapper utama. Padding horizontal xl:px-[200px] hanya diterapkan
              jika BUKAN halaman di area admin.
            */}
            <div className={`flex min-h-screen flex-col ${!isAdminAreaPage ? "xl:px-[200px]" : ""}`}>
                {/* Navbar hanya ditampilkan jika BUKAN halaman di area admin */}
                {!isAdminAreaPage && <Navbar />}
                <main className="flex-1">{children}</main>
                {/* Footer hanya ditampilkan jika BUKAN halaman di area admin */}
                {!isAdminAreaPage && <Footer />}
            </div>
        </>
    )
}