
// import { createBrowserClient } from "@supabase/ssr";

// export const createClient = () =>
//     createBrowserClient(
//         process.env.NEXT_PUBLIC_SUPABASE_URL || "",
//         process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
//     );


import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey) 
