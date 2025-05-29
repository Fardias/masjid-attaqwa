import { supabase } from '@/lib/supabase/supabaseClient'
import { format } from "date-fns"


export const getUpcomingEvents = async () => {
    const { data, error } = await supabase
        .from('upcoming_events')
        .select('*')
        .order('tanggal_mulai', { ascending: true })

    if (error) throw error
    return data
}


export const addEvent = async (event) => {
    if (!event?.judul || !event?.tanggal_mulai || !event?.waktu || !event?.lokasi ) {
        throw new Error("Semua field wajib diisi: judul, tanggal_mulai, waktu, lokasi")
    }

    const { data, error } = await supabase
        .from("upcoming_events")
        .insert([event])
        .select()

    if (error) {
        console.error("Gagal menambahkan event:", error.message)
        throw new Error("Gagal menambahkan event: " + error.message)
    }

    return data[0]
}

export async function getEventById(id) {
    const { data, error } = await supabase.from("upcoming_events").select("*").eq("id", id).single()

    if (error) {
        console.error("Error fetching event:", error)
        throw error
    }

    return data
}


export async function updateEvent(id, eventData) {


    const { error, data } = await supabase
        .from("upcoming_events")
        .update({
            judul: eventData.judul,
            tanggal_mulai: eventData.tanggal_mulai,
            waktu: eventData.waktu,
            lokasi: eventData.lokasi,
            deskripsi: eventData.deskripsi,
            images_url: eventData.images_url,
            pemateri: eventData.pemateri,
        })
        .eq("id", id)
        .select()


    if (error) {
        console.log("Error updating event:", error)
        throw error
    }

    return data
}



export const deleteEvent = async (id) => {
    const { data, error } = await supabase
        .from('upcoming_events')
        .delete()
        .eq('id', id)
    if (error) throw error
    return data
}
