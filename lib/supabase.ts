import { createClient } from '@supabase/supabase-js'
import type { Database } from './database.types'

const supabaseUrl  = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''

export const supabase = supabaseUrl
  ? createClient<Database>(supabaseUrl, supabaseAnon)
  : null as unknown as ReturnType<typeof createClient<Database>>
