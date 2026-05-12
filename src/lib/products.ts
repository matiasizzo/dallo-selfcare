import { supabase, type Product } from './supabase'

export type { Product }

// "both" = available on Dall'O + QUEVI. "dallo" = Dall'O exclusive.
const DALLO_FILTER = `available_on.cs.{"both"},available_on.cs.{"dallo"}`

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

export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      categories ( id, name, slug ),
      product_variants ( * )
    `)
    .eq('active', true)
    .or(DALLO_FILTER)
    .order('created_at', { ascending: false })

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
  const { data: cat } = await supabase
    .from('categories')
    .select('id')
    .eq('slug', categorySlug)
    .single<{ id: string }>()

  if (!cat) return []

  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      categories ( id, name, slug ),
      product_variants ( * )
    `)
    .eq('active', true)
    .eq('category_id', cat.id)
    .or(DALLO_FILTER)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('getProductsByCategory error:', error.message)
    return []
  }
  return (data as Product[]) ?? []
}

export function getDefaultVariant(product: Product) {
  const variants = product.product_variants ?? []
  return variants.find((v) => v.is_default && v.active)
    ?? variants.find((v) => v.active)
    ?? variants[0]
    ?? null
}
