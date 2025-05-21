// import { createBrowserClient } from "@supabase/ssr";

// export const createClient = () =>
//     createBrowserClient(
//         process.env.NEXT_PUBLIC_SUPABASE_URL || "",
//         process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
//     );


import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase environment variables')
    throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseKey) 
