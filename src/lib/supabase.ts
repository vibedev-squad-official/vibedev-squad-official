import { createClient } from '@supabase/supabase-js'
import { Database } from '../types/database.types'

let supabaseClient: ReturnType<typeof createClient<Database>> | null = null

export function getSupabase() {
  if (!supabaseClient) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Missing Supabase environment variables')
    }
    
    supabaseClient = createClient<Database>(supabaseUrl, supabaseAnonKey)
  }
  
  return supabaseClient
}

// For backward compatibility
export const supabase = {
  get from() { return getSupabase().from },
  get auth() { return getSupabase().auth },
  get storage() { return getSupabase().storage },
  get functions() { return getSupabase().functions },
  get realtime() { return getSupabase().realtime },
} 