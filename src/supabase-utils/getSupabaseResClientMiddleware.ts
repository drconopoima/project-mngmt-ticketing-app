import { createServerClient } from '@supabase/ssr';
import { SupabaseClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
interface Response {
    value: NextResponse<unknown>
};
interface SupabaseClientResponse {
    client: SupabaseClient,
    res?: Response
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
                setAll(cookiesToSet: any) {
                    cookiesToSet.forEach((name: any, value: any, options: any) => {
                        response.value.cookies.set(name, value, options);
                    });
                    response.value = NextResponse.next({ request: req, });
                    cookiesToSet.foreach((name: any, value: any, options: any) => {
                        response.value.cookies.set(name,value,options)
                    })
                }
            }
        }
    );
    return { client, res: response }
}
