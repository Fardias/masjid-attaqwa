import { DashboardHeader } from "@/components/dashboard-header"
import { AlbumsGrid } from "@/components/albums-grid"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"

export default function AlbumsPage() {
    return (
        <div className="flex flex-col">
            <DashboardHeader />
            <div className="flex-1 p-4 pt-6 space-y-4 md:p-8">
                <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-bold tracking-tight">Album Foto</h2>
                    <Link href="/admin/dashboard/albums/new" >
                        <Button className="cursor-pointer">
                            <Plus className="w-4 h-4 mr-2" />
                            Tambah Album
                        </Button>
                    </Link>
                </div>

                <Tabs defaultValue="all" className="w-full">
                    <TabsList>
                        <TabsTrigger value="all">Semua</TabsTrigger>
                        <TabsTrigger value="social_activities">Kegiatan Sosial</TabsTrigger>
                        <TabsTrigger value="islamic_holidays">Hari Besar Islam</TabsTrigger>
                    </TabsList>
                    <TabsContent value="all">
                        <AlbumsGrid filter="all" />
                    </TabsContent>
                    <TabsContent value="social_activities">
                        <AlbumsGrid filter="social_activities" />
                    </TabsContent>
                    <TabsContent value="islamic_holidays">
                        <AlbumsGrid filter="islamic_holidays" />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
