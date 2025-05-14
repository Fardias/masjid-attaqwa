import { supabase } from '@/lib/supabase/supabaseClient'

export const getUpcomingEvents = async () => {
    const { data, error } = await supabase
        .from('upcoming_events')
        .select('*')
        .order('tanggal_mulai', { ascending: true })

    if (error) throw error
    console.log('Data fetched:', data) // Log data yang diambil
    return data
}


export const addEvent = async (event) => {
    const { data, error } = await supabase
        .from('upcoming_events')
        .insert([event])
    if (error) throw error
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
