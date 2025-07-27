import { NextResponse } from 'next/server';
import { SupabaseClient } from '@supabase/supabase-js';
import { SerializeOptions } from 'cookie';

export interface Response {
    value: NextResponse<unknown>
};
export interface SupabaseClientResponse {
    client: SupabaseClient,
    res: Response
}
export interface SerializeCookie {
    name: string,
    value: string,
    options?: SerializeOptions
}
