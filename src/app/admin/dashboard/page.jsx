import { DashboardHeader } from "../../../components/dashboard-header"
import { DashboardCards } from "../../../components/dashboard-card"

export default function DashboardPage() {
    return (
        <div className="flex flex-col">
            <DashboardHeader />
            <div className="flex-1 p-4 pt-6 space-y-4 md:p-8">
                <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                </div>
                <DashboardCards />
            </div>
        </div>
    )
}
