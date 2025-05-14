import { DashboardHeader } from "@/components/dashboard-header"
import { AnnouncementsTable } from "@/components/announcements-table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function AnnouncementsPage() {
    return (
        <div className="flex flex-col">
            <DashboardHeader />
            <div className="flex-1 p-4 pt-6 space-y-4 md:p-8">
                <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-bold tracking-tight">Pengumuman</h2>
                    <Link href="/admin/dashboard/announcements/new">
                        <Button>
                            <Plus className="w-4 h-4 mr-2" />
                            Tambah Pengumuman
                        </Button>
                    </Link>
                </div>
                <AnnouncementsTable />
            </div>
        </div>
    )
}
