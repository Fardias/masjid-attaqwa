"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { CalendarIcon } from "lucide-react"
import { Button } from "./ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { id } from "date-fns/locale"
import { useForm } from "react-hook-form"
import { valibotResolver } from "@hookform/resolvers/valibot"
import { minLength, object, string, date, boolean } from "valibot"
import { Switch } from "@/components/ui/switch"

const formSchema = object({
    title: string([minLength(3, "Judul harus minimal 3 karakter.")]),
    date: date("Tanggal pengumuman diperlukan."),
    content: string([minLength(10, "Konten harus minimal 10 karakter.")]),
    author: string([minLength(3, "Nama penulis harus minimal 3 karakter.")]),
    isActive: boolean(),
})

export function AnnouncementForm() {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const form = useForm({
        resolver: valibotResolver(formSchema),
        defaultValues: {
            title: "",
            date: new Date(),
            content: "",
            author: "",
            isActive: true,
        },
    })

    function onSubmit(values) {
        setIsSubmitting(true)

        // Simulasi pengiriman data ke server
        setTimeout(() => {
            console.log(values)
            setIsSubmitting(false)
            router.push("/dashboard/announcements")
        }, 1000)
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Detail Pengumuman</CardTitle>
                <CardDescription>Masukkan informasi lengkap tentang pengumuman yang akan dipublikasikan.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Judul Pengumuman</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Masukkan judul pengumuman" {...field} />
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
                                name="author"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Penulis</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Masukkan nama penulis" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Konten Pengumuman</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Masukkan konten pengumuman" className="min-h-32" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Berikan informasi lengkap tentang pengumuman yang akan dipublikasikan.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="isActive"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between p-4 border rounded-lg">
                                    <div className="space-y-0.5">
                                        <FormLabel className="text-base">Status Pengumuman</FormLabel>
                                        <FormDescription>Pengumuman akan langsung dipublikasikan jika status aktif.</FormDescription>
                                    </div>
                                    <FormControl>
                                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <div className="flex justify-end space-x-4">
                            <Button variant="outline" type="button" onClick={() => router.back()}>
                                Batal
                            </Button>
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? "Menyimpan..." : "Simpan Pengumuman"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}
