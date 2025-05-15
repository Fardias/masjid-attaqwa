import { supabase } from '@/lib/supabase/supabaseClient'

export const getAllAlbums = async () => {
    const { data, error } = await supabase
        .from("albums")
        .select("*")
        .order("created_at", { ascending: false })

    if (error) throw error
    return data
}

export const getAlbumsByCategory = async (category) => {
    const { data, error } = await supabase
        .from("albums")
        .select("*")
        .eq("category", category)
        .order("created_at", { ascending: false })

    if (error) throw error
    return data
}

export const getAlbumById = async (id) => {
    const { data, error } = await supabase
        .from("albums")
        .select("*")
        .eq("id", id)
        .single()

    if (error) throw error
    return data
}

export const createAlbum = async ({ category, title, image_url }) => {
    const { data, error } = await supabase
        .from("albums")
        .insert([{ category, title, image_url }])
        .select()
        .single()

    if (error) throw error
    return data
}

export const deleteAlbum = async (id) => {
    const { error } = await supabase
        .from("albums")
        .delete()
        .eq("id", id)

    if (error) throw error
    return true
}
