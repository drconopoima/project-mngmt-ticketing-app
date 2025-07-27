import { createServerClient } from '@supabase/ssr';
import { NextRequest, NextResponse } from 'next/server';
import { Response, SupabaseClientResponse, SerializeCookie } from './interfaces';

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
