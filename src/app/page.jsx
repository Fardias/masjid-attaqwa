'use client'

import Script from 'next/script'
import Hero from './components/Hero'
import UpcomingEvents from './components/upcoming-events'
import LatestAnnouncements from './components/latest-announcements'
import PrayerTimes from './components/prayer-times'
import DonationCta from './components/donation-cta'

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Mosque",
    "name": "Masjid At-Taqwa Puri Bintaro Hijau",
    "description": "Masjid At-Taqwa Puri Bintaro Hijau adalah pusat kegiatan islami yang menyediakan berbagai program keagamaan, kajian, dan kegiatan sosial untuk masyarakat.",
    "url": "https://masjidattaqwa-pbh.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Puri Bintaro Hijau",
      "addressRegion": "Tangerang Selatan",
      "postalCode": "15414",
      "addressCountry": "ID"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "-6.252576",
      "longitude": "106.708341"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "04:00",
      "closes": "22:00"
    },
    "sameAs": [
      "https://facebook.com/masjidattaqwa.pbh",
      "https://instagram.com/masjidattaqwa.pbh"
    ]
  }

  return (
    <>
      {/* JSON-LD Structured Data */}
      <Script
        id="json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="container px-4 py-8 mx-auto">
        {/* Hero dengan <h1> */}
        <Hero />

        {/* Section utama dengan kegiatan */}
        <section aria-labelledby="agenda-title" className="grid grid-cols-1 gap-8 mt-12 md:grid-cols-3">
          <div className="md:col-span-2">
            <h2 id="agenda-title" className="sr-only">Agenda Masjid</h2>
            <UpcomingEvents />
            <LatestAnnouncements className="mt-8" />
          </div>

          {/* Sidebar kanan */}
          <aside className="md:col-span-1">
            <PrayerTimes />
            <DonationCta className="mt-8" />
          </aside>
        </section>
      </main>
    </>
  )
}
