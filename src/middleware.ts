import { getSupabaseReqClient } from "@/supabase-utils/getSupabaseResClientMiddleware";
import { NextRequest } from 'next/server'
let dbConfig = {
    dbUrl: <string>process.env.NEXT_PUBLIC_SUPABASE_URL?.toString(),
    dbKey: <string>process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.toString(),
}
export async function middleware(req: NextRequest) {
  const { client, res } = getSupabaseReqClient( req, dbConfig );

  client.storage.listBuckets().then((result: any) =>
      console.log(`Bucket list: \n`, result)
  );

  return res?.value;
}
