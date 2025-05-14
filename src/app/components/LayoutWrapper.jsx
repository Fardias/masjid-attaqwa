"use client"

import { usePathname } from "next/navigation"
import Navbar from "./navbar"
import Footer from "./footer"

export default function LayoutWrapper({ children }) {
    const pathname = usePathname()
    const isAdminPage = pathname.startsWith("/admin/dashboard")
    console.log("isAdminPage", isAdminPage)

    return (
        <>
            <div className={`flex min-h-screen flex-col ${!isAdminPage ? "xl:px-[200px]" : ""}`}>
                {!isAdminPage && <Navbar />}
                <main className="flex-1">{children}</main>
                {!isAdminPage && <Footer />}
            </div>
        </>
    )
}
