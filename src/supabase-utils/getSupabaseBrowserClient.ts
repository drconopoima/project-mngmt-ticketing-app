import { createBrowserClient } from '@supabase/ssr';
import { SupabaseClient } from "@supabase/supabase-js";
import { Response, SupabaseClientResponse, SerializeCookie, DbConnectionConfig } from './interfaces';

export const getSupabaseBrowserClient = ( dbConfig: DbConnectionConfig ): SupabaseClient => {
    return createBrowserClient(
        dbConfig.dbUrl,
        dbConfig.dbKey
    )
}
