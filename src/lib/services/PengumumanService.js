import { supabase } from '@/lib/supabase/supabaseClient'

export const getPengumuman = async () => {
    const { data, error } = await supabase
        .from('latest_announcements')
        .select('*')
        .order('date', { ascending: false })

    if (error) throw error
    return data
}