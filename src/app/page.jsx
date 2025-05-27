'use client'
import DonationCta from "./components/donation-cta";
import Hero from "./components/Hero";
import LatestAnnouncements from "./components/latest-announcements";
import PrayerTimes from "./components/prayer-times";
import UpcomingEvents from "./components/upcoming-events";
import Script from 'next/script'

export default function page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Mosque",
    "name": "Masjid At-Taqwa",
    "description": "Masjid At-Taqwa adalah pusat kegiatan islami yang menyediakan berbagai program keagamaan, kajian, dan kegiatan sosial untuk masyarakat.",
    "url": "https://masjid-attaqwa.com",
    "address": {
      "@type": "PostalAddress",
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
      "https://facebook.com/masjid-at-taqwa",
      "https://instagram.com/masjid-at-taqwa"
    ]
  }

  return (
    <>
      <Script
        id="json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container px-4 py-8 mx-auto">
        <Hero />
        <div className="grid grid-cols-1 gap-8 mt-12 md:grid-cols-3">
          <div className="md:col-span-2">
            <UpcomingEvents />
            <LatestAnnouncements className="mt-8" />
          </div>
          <div className="md:col-span-1">
            <PrayerTimes />
            <DonationCta className="mt-8" />
          </div>
        </div>
      </div>
    </>
  )
}
