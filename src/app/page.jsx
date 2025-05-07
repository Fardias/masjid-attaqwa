'use client'
import DonationCta from "./components/donation-cta";
import Hero from "./components/Hero";
import LatestAnnouncements from "./components/latest-announcements";
import PrayerTimes from "./components/prayer-times";
import UpcomingEvents from "./components/upcoming-events";

export default function page() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Hero />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
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
  )
}
