'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
    Card, CardContent, CardDescription, CardHeader, CardTitle
} from "./ui/card"
import {
    Form, FormControl, FormField, FormItem, FormLabel, FormMessage
} from "./ui/form"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { useForm } from "react-hook-form"
import { valibotResolver } from "@hookform/resolvers/valibot"
import { minLength, object, string } from "valibot"
import { toast, Toaster } from "sonner"
import { addPengurus, updatePengurus } from "../lib/services/pengurusService"
import { mutate } from "swr"

const formSchema = object({
    nama: string([minLength(3, "Nama minimal 3 karakter.")]),
    role: string([minLength(3, "Jabatan minimal 3 karakter.")]),
})

export function PengurusForm({ initialData = null, isEditing = false }) {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const form = useForm({
        resolver: valibotResolver(formSchema),
        defaultValues: {
            nama: initialData?.nama || "",
            role: initialData?.role || "",
        },
    })

    async function onSubmit(values) {
        setIsSubmitting(true)

        try {
            if (isEditing && initialData?.id) {
                // Update mode
                await updatePengurus(initialData.id, values)
                toast.success("Data pengurus berhasil diperbarui!")
            } else {
                // Add mode
                await addPengurus(values)
                toast.success("Data pengurus berhasil ditambahkan!")
            }

            mutate("pengurusMasjid")
            router.push("/admin/dashboard/pengurus")
        } catch (error) {
            toast.error("Gagal menyimpan data. Silakan coba lagi.")
        } finally {
            setIsSubmitting(false)
        }
    }

    const jabatanOptions = [
        { value: "ketua", label: "Ketua" },
        { value: "wakil", label: "Wakil Ketua" },
        { value: "sekretaris", label: "Sekretaris" },
        { value: "bendahara", label: "Bendahara" },
        { value: "anggota", label: "Anggota" },
    ]

    return (
        <Card>
            <Toaster position="top-center" />
            <CardHeader>
                <CardTitle>{isEditing ? "Edit Pengurus Masjid" : "Tambah Pengurus Masjid"}</CardTitle>
                <CardDescription>
                    {isEditing
                        ? "Perbarui data nama dan jabatan pengurus masjid."
                        : "Masukkan nama dan jabatan pengurus masjid."}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="nama"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nama</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Nama lengkap pengurus" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="role"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Jabatan</FormLabel>
                                    <FormControl>
                                        <select
                                            className="w-full px-3 py-2 border rounded"
                                            {...field}
                                            value={field.value || ""}
                                        >
                                            <option value="" disabled>
                                                Pilih jabatan
                                            </option>
                                            {jabatanOptions.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex justify-end space-x-4">
                            <Button variant="outline" type="button" onClick={() => router.back()}>
                                Batal
                            </Button>
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? (isEditing ? "Menyimpan..." : "Menyimpan...") : (isEditing ? "Simpan Perubahan" : "Simpan")}
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}
