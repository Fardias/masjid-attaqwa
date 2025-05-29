"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarIcon } from "lucide-react";
import { Button } from "../components/ui/button";
import { Calendar } from "../components/ui/calendar";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle
} from "../components/ui/card";
import {
  Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage
} from "../components/ui/form";
import { Input } from "../components/ui/input";
import {
  Popover, PopoverContent, PopoverTrigger
} from "../components/ui/popover";
import { Textarea } from "../components/ui/textarea";
import { cn } from "../lib/utils";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useForm } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { minLength, object, string, date } from "valibot";
import { addPengumuman, updatePengumuman } from "../lib/services/PengumumanService";
import { mutate } from "swr";
import { toast, Toaster } from "sonner";

const formSchema = object({
  title: string([minLength(3, "Judul harus minimal 3 karakter.")]),
  date: date("Tanggal pengumuman diperlukan."),
  excerpt: string([minLength(10, "Konten harus minimal 10 karakter.")]),
  category: string([minLength(3, "Kategori harus minimal 3 karakter.")]),
});

export function AnnouncementForm({ initialData = null, isEditing = false }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const processedInitialData = initialData
    ? {
        ...initialData,
        date: initialData.date instanceof Date ? initialData.date : new Date(initialData.date),
      }
    : {
        title: "",
        date: new Date(),
        excerpt: "",
        category: "",
      };

  const form = useForm({
    resolver: valibotResolver(formSchema),
    defaultValues: processedInitialData,
  });

  async function onSubmit(values) {
    setIsSubmitting(true);

    const formattedValues = {
      ...values,
      date: format(values.date, "yyyy-MM-dd"),
    };

    try {
      if (isEditing && initialData) {
        await updatePengumuman(initialData.id, formattedValues);
        mutate(`announcement-${initialData.id}`);
        toast.success("Pengumuman berhasil diperbarui!");
        router.push("/admin/dashboard/announcements?status=updated");
      } else {
        await addPengumuman(formattedValues);
        mutate("all-announcements");
        toast.success("Pengumuman berhasil ditambahkan!");
        router.push("/admin/dashboard/announcements?status=created");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card>
      <Toaster position="top-center" />
      <CardHeader>
        <CardTitle>{isEditing ? "Edit Pengumuman" : "Detail Pengumuman"}</CardTitle>
        <CardDescription>
          {isEditing
            ? "Ubah informasi pengumuman yang sudah ada."
            : "Masukkan informasi lengkap tentang pengumuman yang akan dipublikasikan."}
        </CardDescription>
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
                            variant="outline"
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
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kategori</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="flex w-full h-10 px-3 py-2 text-sm border rounded-md border-input bg-background ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <option value="" disabled>Pilih kategori</option>
                        <option value="Ibadah">Ibadah</option>
                        <option value="Kajian">Kajian</option>
                        <option value="Sosial">Sosial</option>
                        <option value="Pendidikan">Pendidikan</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="excerpt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Konten Pengumuman</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Masukkan konten pengumuman"
                      className="min-h-32"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Berikan informasi lengkap tentang pengumuman yang akan dipublikasikan.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-4">
              <Button variant="outline" type="button" onClick={() => router.back()}>
                Batal
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Menyimpan..." : isEditing ? "Update Pengumuman" : "Simpan Pengumuman"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
