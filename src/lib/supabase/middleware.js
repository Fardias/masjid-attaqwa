
import { createServerClient} from "@supabase/ssr";
import {  NextResponse } from "next/server";

export const createClient = () => {
    let supabaseResponse = NextResponse.next({
        request: {
            headers: request.headers,
        },
    });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL || '',
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
        {
            cookies: {
                getAll() {
                    return document.cookie.split("; ").map(cookie => {
                        const [name, value] = cookie.split("=");
                        return { name, value };
                    });
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) => {
                        document.cookie = `${name}=${value}; ${options}`;
                    });
                    supabaseResponse = NextResponse.next({
                        request,
                    })
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    )
                },
            },
        },
    );

    return supabaseResponse
};

