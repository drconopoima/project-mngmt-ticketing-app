import { createBrowserClient } from '@supabase/ssr';
import { SupabaseClient } from "@supabase/supabase-js";

export const getSupabaseBrowserClient = (): SupabaseClient => {
    return createBrowserClient(
        <string>process.env.NEXT_PUBLIC_SUPABASE_URL?.toString(),
        <string>process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.toString(),
    )
}