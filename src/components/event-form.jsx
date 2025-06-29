"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { CalendarIcon, Clock, X } from "lucide-react"
import { Button } from "../components/ui/button"
import { Calendar } from "../components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../components/ui/form"
import { Input } from "../components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Textarea } from "../components/ui/textarea"
import { cn } from "../lib/utils"
import { format } from "date-fns"
import { id } from "date-fns/locale"
import { useForm } from "react-hook-form"
import { valibotResolver } from "@hookform/resolvers/valibot"
import { minLength, object, string, date, enum_ } from "valibot"
import { addEvent, updateEvent } from "../lib/services/eventService"
import { mutate } from "swr"
import { format as formatDate } from "date-fns"
import { toast, Toaster } from "sonner"
import { uploadToCloudinary } from "../lib/cloudinary"

const formSchema = object({
    judul: string([minLength(3, "Judul harus minimal 3 karakter.")]),
    tanggal_mulai: date("Tanggal event diperlukan."),
    waktu: string([minLength(1, "Waktu event diperlukan.")]),
    lokasi: string([minLength(3, "Lokasi harus minimal 3 karakter.")]),
    deskripsi: string([minLength(10, "Deskripsi harus minimal 10 karakter.")]),
    status: enum_(["upcoming", "ongoing", "completed"], "Status event diperlukan."),
    images_url: string([minLength(1, "Gambar event diperlukan.")]),
})

export function EventForm({ initialData = null, isEditing = false }) {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [imagePreview, setImagePreview] = useState(initialData?.images_url || "")
    const [isUploading, setIsUploading] = useState(false)

    const processedInitialData = initialData
        ? {
            ...initialData,
            tanggal_mulai:
                initialData.tanggal_mulai instanceof Date ? initialData.tanggal_mulai : new Date(initialData.tanggal_mulai),
        }
        : {
            judul: "",
            tanggal_mulai: "",
            waktu: "",
            lokasi: "",
            deskripsi: "",
            status: "upcoming",
            images_url: "",
        }

    const form = useForm({
        resolver: valibotResolver(formSchema),
        defaultValues: processedInitialData,
    })

    const handleImageUpload = async (file) => {
        if (file.size > 5 * 1024 * 1024) {
            toast.error("Ukuran file melebihi 5MB")
            return
        }

        try {
            setIsUploading(true)
            const imageUrl = await uploadToCloudinary(file)
            setImagePreview(imageUrl)
            form.setValue("images_url", imageUrl)
            setIsUploading(false)
        } catch (error) {
            console.error("Upload error:", error)
            setIsUploading(false)
            toast.error("Gagal mengupload gambar. Silakan coba lagi.")
        }
    }

    const handleImageDelete = async () => {
        try {
            if (initialData?.images_url) {
                const publicId = initialData.images_url.split('/').pop().split('.')[0]
                await fetch(`/api/cloudinary?publicId=${publicId}`, {
                    method: 'DELETE',
                })
            }
            setImagePreview("")
            form.setValue("images_url", "")
        } catch (error) {
            toast.error("Gagal menghapus gambar. Silakan coba lagi.")
        }
    }

    async function onSubmit(values) {
        setIsSubmitting(true)

        const formattedValues = {
            ...values,
            tanggal_mulai: formatDate(values.tanggal_mulai, "yyyy-MM-dd"),
        }

        try {
            if (isEditing && initialData) {
                // If there's a new image and old image exists, delete the old one
                if (values.images_url !== initialData.images_url && initialData.images_url) {
                    const publicId = initialData.images_url.split('/').pop().split('.')[0]
                    await fetch(`/api/cloudinary?publicId=${publicId}`, {
                        method: 'DELETE',
                    })
                }
                await updateEvent(initialData.id, formattedValues)
                mutate(`event-${initialData.id}`)
                mutate("upcoming-events")
                toast.success("Event berhasil diperbarui!")
                setIsSubmitting(false)
                router.push("/admin/dashboard/events?status=updated")
            } else {
                await addEvent(formattedValues)
                mutate("upcoming-events")
                toast.success("Event baru berhasil ditambahkan!")
                setIsSubmitting(false)
                router.push("/admin/dashboard/events?status=created")
            }

            setIsSubmitting(false)
        } catch (error) {
            setIsSubmitting(false)
            toast.error("Terjadi kesalahan. Silakan coba lagi.")
        }
    }

    return (
        <Card>
            <Toaster position="top-center" />
            <CardHeader>
                <CardTitle>{isEditing ? "Edit Acara" : "Detail Acara"}</CardTitle>
                <CardDescription>
                    {isEditing
                        ? "Ubah informasi acara yang sudah ada."
                        : "Masukkan informasi lengkap tentang acara yang akan diadakan."}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="judul"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Judul Acara</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Masukkan judul acara" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <FormField
                                control={form.control}
                                name="tanggal_mulai"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Tanggal</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                                                    >
                                                        {field.value ? format(field.value, "PPP", { locale: id }) : <span>Pilih tanggal</span>}
                                                        <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={(date) => date < new Date() && !isEditing}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="waktu"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Waktu</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Input type="time" className="[&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-inner-spin-button]:hidden [&::-webkit-outer-spin-button]:hidden" {...field} />
                                                <Clock className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <FormField
                                control={form.control}
                                name="lokasi"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Lokasi</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Masukkan lokasi acara" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="status"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Status</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Pilih status acara" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="upcoming">Upcoming</SelectItem>
                                                <SelectItem value="ongoing">Ongoing</SelectItem>
                                                <SelectItem value="completed">Completed</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="deskripsi"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Deskripsi</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Masukkan deskripsi lengkap tentang acara" className="min-h-32" {...field} />
                                    </FormControl>
                                    <FormDescription>Berikan informasi lengkap tentang acara yang akan diadakan.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="images_url"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Gambar Acara</FormLabel>
                                    <FormControl>
                                        <div className="space-y-4">
                                            <Input 
                                                type="file" 
                                                accept="image/*"
                                                onChange={(e) => {
                                                    const file = e.target.files[0];
                                                    if (file) {
                                                        handleImageUpload(file);
                                                    }
                                                }}
                                                disabled={isUploading}
                                            />
                                            {imagePreview && (
                                                <div className="relative">
                                                    <img 
                                                        src={imagePreview} 
                                                        alt="Preview" 
                                                        className="object-cover w-32 h-32 rounded-lg"
                                                    />
                                                    <Button
                                                        type="button"
                                                        variant="destructive"
                                                        size="sm"
                                                        className="absolute -top-2 -right-2"
                                                        onClick={handleImageDelete}
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    </FormControl>
                                    {isUploading && (
                                        <p className="mt-2 text-sm text-muted-foreground">
                                            Mengupload gambar...
                                        </p>
                                    )}
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex justify-end space-x-4">
                            <Button className={"cursor-pointer"} variant="outline" type="button" onClick={() => router.back()}>
                                Batal
                            </Button>
                            <Button className={"cursor-pointer"} type="submit" disabled={isSubmitting}>
                                {isSubmitting ? "Menyimpan..." : isEditing ? "Update Acara" : "Simpan Acara"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}
