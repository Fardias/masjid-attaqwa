'use client'

import { useState } from "react"
import { DashboardHeader } from "../../../../../components/dashboard-header"
import { PengurusForm } from "../../../../../components/pengurus-form"

export default function PengurusPage() {

    return (
        <div className="flex flex-col">
            <DashboardHeader />
            <div className="flex-1 p-4 pt-6 space-y-4 md:p-8">
                <div className="flex items-center">
                    <h2 className="text-3xl font-bold tracking-tight">Tambah Pengurus Baru</h2>
                </div>
                <PengurusForm />
            </div>
        </div>
    )
}
