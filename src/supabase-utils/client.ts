import { createClient } from '@supabase/supabase-js';
import { SupabaseClient } from "@supabase/supabase-js";

export const createSupabaseClient = (): SupabaseClient => {
    return createClient(
        <string>process.env.NEXT_PUBLIC_SUPABASE_URL?.toString(),
        <string>process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.toString(),
    )
}