"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { CalendarIcon, ImagePlus, X } from "lucide-react"
import { Button } from "../components/ui/button"
import { Calendar } from "../components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../components/ui/form"
import { Input } from "../components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover"
import { Textarea } from "../components/ui/textarea"
import { cn } from "../lib/utils"
import { format } from "date-fns"
import { id } from "date-fns/locale"
import { useForm } from "react-hook-form"
import { valibotResolver } from "@hookform/resolvers/valibot"
import { minLength, object, string, date, enum_ } from "valibot"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import Image from "next/image"
import { uploadAlbum } from "../lib/services/albumsService"
import { uploadToCloudinary } from "../lib/cloudinary"

const MAX_FILE_SIZE_MB = 5

const formSchema = object({
    title: string([minLength(3, "Judul harus minimal 3 karakter.")]),
    date: date("Tanggal album diperlukan."),
    description: string([minLength(10, "Deskripsi harus minimal 10 karakter.")]),
    category: enum_(["social_activities", "islamic_holidays"], "Kategori harus dipilih."),
})

export function AlbumForm() {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [uploadedImages, setUploadedImages] = useState([])
    const [isDragging, setIsDragging] = useState(false)

    const form = useForm({
        resolver: valibotResolver(formSchema),
        defaultValues: {
            title: "",
            date: new Date(),
            description: "",
            category: "",
        },
    })

    const onSubmit = async (values) => {
        setIsSubmitting(true)

        const formattedDate = new Date(values.date).toISOString().split('T')[0];
    
        const { error } = await uploadAlbum({
            title: values.title,
            date: formattedDate,
            description: values.description,
            category: values.category,
            images_url: uploadedImages,
        })
    
        setIsSubmitting(false)
        if (!error) {
            router.push("/admin/dashboard/albums")
        } else {
            console.error(error)
            alert("Gagal menyimpan album")
        }
    }
    

    const handleImageUpload = async (e) => {
        const files = Array.from(e.target.files || [])

        for (const file of files) {
            if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
                alert(`${file.name} melebihi 5MB dan tidak diunggah.`)
                continue
            }
    
            try {
                const imageUrl = await uploadToCloudinary(file)
                setUploadedImages(prev => [...prev, imageUrl])
            } catch (error) {
                console.error('Error uploading image:', error)
                alert("Upload gagal: " + error.message)
            }
        }
    }
    

    const handleDragOver = (e) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = () => {
        setIsDragging(false)
    }

    const handleDrop = async (e) => {
        e.preventDefault()
        setIsDragging(false)

        if (e.dataTransfer.files) {
            const files = Array.from(e.dataTransfer.files)
            const validImages = files.filter(file => file.size <= MAX_FILE_SIZE_MB * 1024 * 1024)

            if (validImages.length < files.length) {
                alert("Beberapa file melebihi 5MB dan tidak diunggah.")
            }

            for (const file of validImages) {
                try {
                    const imageUrl = await uploadToCloudinary(file)
                    setUploadedImages(prev => [...prev, imageUrl])
                } catch (error) {
                    console.error('Error uploading image:', error)
                    alert("Upload gagal: " + error.message)
                }
            }
        }
    }

    const removeImage = (index) => {
        setUploadedImages(prev => prev.filter((_, i) => i !== index))
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Detail Album</CardTitle>
                <CardDescription>Masukkan informasi lengkap tentang album foto yang akan dibuat.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Judul Album</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Masukkan judul album" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <FormField
                                control={form.control}
                                name="date"
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
                                                <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="category"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Kategori</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Pilih kategori album" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="social_activities">Kegiatan Sosial</SelectItem>
                                                <SelectItem value="islamic_holidays">Hari Besar Islam</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Deskripsi</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Masukkan deskripsi album" className="min-h-24" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="space-y-4">
                            <div className="flex flex-col space-y-2">
                                <FormLabel>Unggah Foto</FormLabel>
                                <div
                                    className={cn(
                                        "border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-gray-400 transition-colors",
                                        isDragging && "border-amber-500 bg-amber-50",
                                    )}
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                >
                                    <div className="flex flex-col items-center">
                                        <ImagePlus className="w-10 h-10 mb-2 text-gray-400" />
                                        <p className="mb-4 text-sm text-gray-500">
                                            Drag & drop foto di sini, atau{" "}
                                            <label className="cursor-pointer text-amber-600 hover:text-amber-700">
                                                pilih file
                                                <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageUpload} />
                                            </label>
                                        </p>
                                        <p className="text-xs text-gray-400">Format yang didukung: JPG, PNG, GIF (Maks. 5MB per file)</p>
                                    </div>
                                </div>
                            </div>

                            {uploadedImages.length > 0 && (
                                <div className="space-y-2">
                                    <FormLabel>Foto yang Diunggah ({uploadedImages.length})</FormLabel>
                                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                                        {uploadedImages.map((image, index) => (
                                            <div key={index} className="relative group aspect-square">
                                                <Image
                                                    src={image || "/placeholder.svg"}
                                                    alt={`Uploaded image ${index + 1}`}
                                                    fill
                                                    className="object-cover rounded-md"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeImage(index)}
                                                    className="absolute p-1 text-white transition-opacity bg-red-500 rounded-full opacity-0 top-1 right-1 group-hover:opacity-100"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="flex justify-end space-x-4">
                            <Button variant="outline" type="button" onClick={() => router.back()} className="cursor-pointer">
                                Batal
                            </Button>
                            <Button type="submit" disabled={isSubmitting} className="cursor-pointer">
                                {isSubmitting ? "Menyimpan..." : "Simpan Album"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}
