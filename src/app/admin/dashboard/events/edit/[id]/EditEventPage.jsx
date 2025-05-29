"use client"

import { useRouter } from "next/navigation"
import useSWR from "swr"
import { getEventById } from "../../../../../../lib/services/eventService"
import { EventForm } from "../../../../../../components/event-form"

export default function EditEventPageClient({ params }) {
    const router = useRouter()

    const id = params?.value ? JSON.parse(params.value)?.id : undefined

    const { data: event, error, isLoading } = useSWR(id ? `event-${id}` : null, () => getEventById(id))


    if (isLoading) return <div className="p-8 text-center">Loading event data...</div>
    if (error) return <div className="p-8 text-center text-red-500">Failed to load event data</div>
    if (!event) return <div className="p-8 text-center text-red-500">Event not found</div>;

    return (
        <div className="p-6">
            <h1 className="mb-6 text-2xl font-bold">Edit Event</h1>
            <EventForm initialData={event} isEditing={true} />
        </div>
    )
}
