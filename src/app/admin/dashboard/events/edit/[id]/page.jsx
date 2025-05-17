import { getUpcomingEvents } from "@/lib/services/eventService"
import EditEventPageClient from "./EditEventPage"

export async function generateStaticParams() {
    try {
        const events = await getUpcomingEvents()

        return events.map((event) => ({
            id: event.id.toString(),
        }))
    } catch (error) {
        console.error("Error generating static params:", error)
        return [] 
    }
}

export default function EditEventPage({ params }) {
    return <EditEventPageClient params={params} />
}

