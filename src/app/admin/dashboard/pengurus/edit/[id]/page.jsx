import { getUpcomingEvents } from "../../../../../../lib/services/eventService"
import EditPengurusClient from "./EditPengurusPage"

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

export default function EditPengurusPage({ params }) {
    return <EditPengurusClient params={params} />
}

