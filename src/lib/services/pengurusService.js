import { supabase } from '../supabase/supabaseClient'

export const getPengurus = async () => {
    const { data, error } = await supabase
        .from("pengurus")
        .select("*")
        .order("created_at", { ascending: false })

    if (error) throw error
    return data
}


export const addPengurus = async (pengurus) => {
    const { data, error } = await supabase
        .from("pengurus")
        .insert([pengurus])
        .select()

    if (error) throw error
    return data
}

export const updatePengurus = async (id, pengurus) => {
    const { data, error } = await supabase
        .from("pengurus")
        .update(pengurus)
        .eq("id", id)
        .select()

    if (error) throw error
    return data
}

export const deletePengurus = async (id) => {
    const { data, error } = await supabase
        .from("pengurus")
        .delete()
        .eq("id", id)
        .select()

    if (error) throw error
    return data
}
