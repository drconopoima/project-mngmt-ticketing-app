import { createServerClient } from '@supabase/ssr';
import { SupabaseClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';
import { SerializeOptions } from 'cookie';

interface Response {
    value: NextResponse<unknown>
};
interface SupabaseClientResponse {
    client: SupabaseClient,
    res: Response
}
interface SerializeCookie {
    name: string,
    value: string,
    options?: SerializeOptions
}

export function getSupabaseReqClient( req : NextRequest,  dbConfig: { dbUrl: string; dbKey: string } ): SupabaseClientResponse {
    let response: Response = {
        value: NextResponse.next( { request: req })
    };
    const client = createServerClient(
        dbConfig.dbUrl,
        dbConfig.dbKey,
        {
            cookies: {
                getAll() {
                    return req.cookies.getAll();
                },
                setAll(cookiesToSet: SerializeCookie[]) {
                    cookiesToSet.forEach(({ name, value, options }) => {
                        response.value.cookies.set(name, value, options);
                    });
                    response.value = NextResponse.next({ request: req, });
                    cookiesToSet.forEach(( {name, value, options }) => {
                        response.value.cookies.set(name,value,options)
                    })
                }
            }
        }
    );
    return { client, res: response }
}
