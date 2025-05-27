import { Geist, Geist_Mono, Outfit } from "next/font/google"
import "./globals.css"
import LayoutWrapper from "./components/LayoutWrapper"

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata = {
  title: "Masjid At-Taqwa - Pusat Kegiatan Islami",
  description: "Masjid At-Taqwa adalah pusat kegiatan islami yang menyediakan berbagai program keagamaan, kajian, dan kegiatan sosial untuk masyarakat. Temukan jadwal sholat, kajian, dan informasi kegiatan masjid.",
  keywords: "masjid, at-taqwa, islam, kajian, sholat, kegiatan islami, masjid at-taqwa",
  authors: [{ name: "Masjid At-Taqwa" }],
  creator: "Masjid At-Taqwa",
  publisher: "Masjid At-Taqwa",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://masjid-at-taqwa.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Masjid At-Taqwa - Pusat Kegiatan Islami',
    description: 'Masjid At-Taqwa adalah pusat kegiatan islami yang menyediakan berbagai program keagamaan, kajian, dan kegiatan sosial untuk masyarakat.',
    url: 'https://masjid-at-taqwa.com',
    siteName: 'Masjid At-Taqwa',
    images: [
      {
        url: '/images/masjid-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Masjid At-Taqwa',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Masjid At-Taqwa - Pusat Kegiatan Islami',
    description: 'Masjid At-Taqwa adalah pusat kegiatan islami yang menyediakan berbagai program keagamaan, kajian, dan kegiatan sosial untuk masyarakat.',
    images: ['/images/masjid-og.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body className={`${outfit.variable} antialiased`}>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  )
}

