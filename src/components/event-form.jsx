"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { CalendarIcon, Clock } from "lucide-react"
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
import { minLength, object, string, date } from "valibot"

const formSchema = object({
    title: string([minLength(3, "Judul harus minimal 3 karakter.")]),
    date: date("Tanggal event diperlukan."),
    time: string([minLength(1, "Waktu event diperlukan.")]),
    location: string([minLength(3, "Lokasi harus minimal 3 karakter.")]),
    description: string([minLength(10, "Deskripsi harus minimal 10 karakter.")]),
})

export function EventForm() {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const form = useForm({
        resolver: valibotResolver(formSchema),
        defaultValues: {
            title: "",
            date: undefined,
            time: "",
            location: "",
            description: "",
        },
    })

    function onSubmit(values) {
        setIsSubmitting(true)

        // Simulasi pengiriman data ke server
        setTimeout(() => {
            console.log(values)
            setIsSubmitting(false)
            router.push("/dashboard/events")
        }, 1000)
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Detail Event</CardTitle>
                <CardDescription>Masukkan informasi lengkap tentang event yang akan diadakan.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Judul Event</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Masukkan judul event" {...field} />
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
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={(date) => date < new Date()}
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
                                name="time"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Waktu</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Input type="time" {...field} />
                                                <Clock className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="location"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Lokasi</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Masukkan lokasi event" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Deskripsi</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Masukkan deskripsi lengkap tentang event" className="min-h-32" {...field} />
                                    </FormControl>
                                    <FormDescription>Berikan informasi lengkap tentang event yang akan diadakan.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex justify-end space-x-4">
                            <Button variant="outline" type="button" onClick={() => router.back()}>
                                Batal
                            </Button>
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? "Menyimpan..." : "Simpan Event"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}
