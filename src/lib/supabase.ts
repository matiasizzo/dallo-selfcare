import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let _supabase: SupabaseClient | null = null

export function getSupabase(): SupabaseClient {
  if (!_supabase) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if (!url || !key) throw new Error('Missing Supabase env vars')
    _supabase = createClient(url, key)
  }
  return _supabase
}

// kept for backwards compat — resolved lazily on first property access
export const supabase = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    return (getSupabase() as unknown as Record<string | symbol, unknown>)[prop]
  },
})

export type Store = {
  id: string
  name: string
  domain: string
  stripe_account_id: string | null
  nif: string | null
  email: string | null
  phone: string | null
  address: string | null
  created_at: string
}

export type Category = {
  id: string
  name: string
  slug: string
  created_at: string
}

export type Product = {
  id: string
  category_id: string | null
  name: string
  slug: string
  tagline: string | null
  description: string | null
  ingredients: string | null
  usage_instructions: string | null
  dosage: string | null
  frequency: string | null
  storage: string | null
  shelf_life_months: number | null
  skin_type: string[] | null
  volume_ml: number | null
  active: boolean
  featured: boolean
  available_on: string[] | null
  image_url: string | null
  nutritional_info: {
    serving?: string
    items?: Array<{ name: string; amount: string; nrv?: string }>
  } | null
  net_weight: string | null
  created_at: string
  updated_at: string
  // joined
  categories?: Category | null
  product_variants?: ProductVariant[]
}

export type ProductVariant = {
  id: string
  product_id: string
  name: string
  price_cents: number
  compare_at_cents: number | null
  stripe_price_id: string | null
  stock_quantity: number | null
  is_default: boolean
  active: boolean
  created_at: string
}
