import { getPengumuman } from "@/lib/services/PengumumanService"
import EditAnnouncementPageClient from "./EditAnnouncementPage"

export async function generateStaticParams() {
    try {
        const announcements = await getPengumuman()

        return announcements.map((announcement) => ({
            id: announcement.id.toString(),
        }))
    } catch (error) {
        console.error("Error generating static params:", error)
        return [] 
    }
}

export default function EditAnnouncementPage({ params }) {
    return <EditAnnouncementPageClient params={params} />
}

