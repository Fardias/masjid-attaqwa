import { DashboardSidebar } from "../../../components/dashboard-sidebar"

export default function DashboardLayout({
    children,
}) {
    return (
        <div className="flex flex-col min-h-screen md:flex-row">
            <DashboardSidebar />
            <main className="flex-1">{children}</main>
        </div>
    )
}
