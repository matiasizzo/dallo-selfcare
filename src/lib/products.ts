import { supabase, type Product, type Store } from './supabase'

export type { Product }

const DALLO_DOMAIN = 'dalloselfcare.com'

// Maps category slug → line color
export const LINE_COLORS: Record<string, string> = {
  balance:    '#7EB8A0',
  energy:     '#E8A84C',
  metabolism: '#D4687A',
  protection: '#8B7BB5',
  senolytic:  '#5BA3C9',
  skin:       '#C9A96E',
}

export function formatPrice(cents: number) {
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(cents / 100)
}

async function getDalloStoreId(): Promise<string | null> {
  const { data } = await supabase
    .from('stores')
    .select('id')
    .eq('domain', DALLO_DOMAIN)
    .single<Pick<Store, 'id'>>()
  return data?.id ?? null
}

export async function getProducts(): Promise<Product[]> {
  const storeId = await getDalloStoreId()

  let query = supabase
    .from('products')
    .select(`
      *,
      categories ( id, name, slug ),
      product_variants ( * )
    `)
    .eq('active', true)
    .order('created_at', { ascending: false })

  if (storeId) {
    query = query.contains('available_on', [storeId])
  }

  const { data, error } = await query
  if (error) {
    console.error('getProducts error:', error.message)
    return []
  }
  return (data as Product[]) ?? []
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      categories ( id, name, slug ),
      product_variants ( * )
    `)
    .eq('slug', slug)
    .eq('active', true)
    .single<Product>()

  if (error) {
    console.error('getProductBySlug error:', error.message)
    return null
  }
  return data
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  const storeId = await getDalloStoreId()

  // Get category id first
  const { data: cat } = await supabase
    .from('categories')
    .select('id')
    .eq('slug', categorySlug)
    .single<{ id: string }>()

  if (!cat) return []

  let query = supabase
    .from('products')
    .select(`
      *,
      categories ( id, name, slug ),
      product_variants ( * )
    `)
    .eq('active', true)
    .eq('category_id', cat.id)
    .order('created_at', { ascending: false })

  if (storeId) {
    query = query.contains('available_on', [storeId])
  }

  const { data, error } = await query
  if (error) {
    console.error('getProductsByCategory error:', error.message)
    return []
  }
  return (data as Product[]) ?? []
}

export function getDefaultVariant(product: Product) {
  const variants = product.product_variants ?? []
  return variants.find((v) => v.is_default && v.active) ?? variants.find((v) => v.active) ?? variants[0] ?? null
}
