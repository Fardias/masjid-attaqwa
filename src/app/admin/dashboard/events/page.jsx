import { DashboardHeader } from "../../../../components/dashboard-header"
import { EventsTable } from "../../../../components/events-table"
import { Button } from "../../../../components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { Suspense } from "react"

export default function EventsPage() {
    return (
        <div className="flex flex-col">
            <DashboardHeader />
            <div className="flex-1 p-4 pt-6 space-y-4 md:p-8">
                <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-bold tracking-tight">Acara Mendatang</h2>
                    <Link href="/admin/dashboard/events/new">
                        <Button className={'cursor-pointer'}>
                            <Plus className="w-4 h-4 mr-2" />
                            Tambah Acara
                        </Button>
                    </Link>
                </div>
                <Suspense fallback={<div>Loading events...</div>}>
                    <EventsTable />
                </Suspense>
            </div>
        </div>
    )
}