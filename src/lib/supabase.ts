import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Product = {
  id: string
  name: string
  slug: string
  description: string | null
  category_id: string | null
  store_id: string | null
  images: string[] | null
  line: string | null
  created_at: string
}

export type ProductVariant = {
  id: string
  product_id: string
  name: string
  price: number
  sku: string | null
  stock: number | null
}
