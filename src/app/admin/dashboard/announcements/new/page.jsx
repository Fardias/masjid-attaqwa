import { DashboardHeader } from "@/components/dashboard-header"
import { AnnouncementForm } from "@/components/announcement-form"

export default function NewAnnouncementPage() {
    return (
        <div className="flex flex-col">
            <DashboardHeader />
            <div className="flex-1 p-4 pt-6 space-y-4 md:p-8">
                <div className="flex items-center">
                    <h2 className="text-3xl font-bold tracking-tight">Tambah Pengumuman Baru</h2>
                </div>
                <AnnouncementForm />
            </div>
        </div>
    )
}
