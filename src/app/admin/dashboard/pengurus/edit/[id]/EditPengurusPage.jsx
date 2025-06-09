"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import useSWR from "swr"
import { getPengurusById } from "../../../../../../lib/services/pengurusService"
import { PengurusForm } from "../../../../../../components/pengurus-form"

export default function EditPengurusClient({ params }) {
    const router = useRouter()
    const [id, setId] = useState(undefined);

    useEffect(() => {
        if (params?.value) {
            try {
                setId(JSON.parse(params.value)?.id);
            } catch (e) {
                setId(undefined);
            }
        }
    }, [params?.value]);

    const { data: pengurus, error, isLoading } = useSWR(
        id ? `pengurus-${id}` : null,
        () => getPengurusById(id)
    );

    return (
        <div className="p-6">
            <h1 className="mb-6 text-2xl font-bold">Edit Pengurus</h1>
            {isLoading && <div className="p-8 text-center">Loading pengurus data...</div>}
            {error && <div className="p-8 text-center text-red-500">Failed to load pengurus data</div>}
            {!pengurus && !isLoading && <div className="p-8 text-center text-red-500">Pengurus not found</div>}
            {pengurus && (
                <PengurusForm initialData={pengurus} isEditing={true} />
            )}
        </div>
    )
}
