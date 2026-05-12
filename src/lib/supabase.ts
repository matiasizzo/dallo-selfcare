import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

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
