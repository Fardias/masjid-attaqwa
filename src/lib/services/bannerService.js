import { supabase } from "../supabase/supabaseClient"

export const getBannerImage = async () => {
    const { data, error } = await supabase.from("banner")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(1)
        .single()

    if (error) throw error
    return data
}