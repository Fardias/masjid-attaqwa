import { DashboardHeader } from "../../../../../components/dashboard-header"
import { EventForm } from "../../../../../components/event-form"

export default function NewEventPage() {
    return (
        <div className="flex flex-col">
            <DashboardHeader />
            <div className="flex-1 p-4 pt-6 space-y-4 md:p-8">
                <div className="flex items-center">
                    <h2 className="text-3xl font-bold tracking-tight">Tambah Acara Baru</h2>
                </div>
                <EventForm />
            </div>
        </div>
    )
}
