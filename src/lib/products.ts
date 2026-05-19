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

export const CARD_BG: Record<string, string> = {
  skin:       'radial-gradient(ellipse at 50% 40%, #faf3e8 0%, #eddec8 65%, #d9c0a0 100%)',
  aceites:    'radial-gradient(ellipse at 50% 40%, #faf3e8 0%, #eddec8 65%, #d9c0a0 100%)',
  serums:     'radial-gradient(ellipse at 50% 40%, #faf3e8 0%, #eddec8 65%, #d9c0a0 100%)',
  limpiadores:'radial-gradient(ellipse at 50% 40%, #faf3e8 0%, #eddec8 65%, #d9c0a0 100%)',
  balance:    'radial-gradient(ellipse at 50% 40%, #edf4f1 0%, #c4dcd5 65%, #9ec4bc 100%)',
  energy:     'radial-gradient(ellipse at 50% 40%, #faf3e4 0%, #f0dcb0 65%, #ddc078 100%)',
  metabolism: 'radial-gradient(ellipse at 50% 40%, #faf0f0 0%, #e8c4c0 65%, #d4a0a0 100%)',
  protection: 'radial-gradient(ellipse at 50% 40%, #f2f0f8 0%, #ccc8e8 65%, #aca8d4 100%)',
  senolytic:  'radial-gradient(ellipse at 50% 40%, #eef4f8 0%, #bcd4e8 65%, #90bcd4 100%)',
  nutri:      'radial-gradient(ellipse at 50% 40%, #faf3e8 0%, #eddec8 65%, #d9c0a0 100%)',
}
export const DEFAULT_CARD_BG = 'radial-gradient(ellipse at 50% 40%, #faf3e8 0%, #ebdec8 65%, #d9c8ad 100%)'

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
  const all = (data as Product[]) ?? []
  // Exclude products whose default variant has price 0 (not yet for sale)
  return all.filter((p) => {
    const v = getDefaultVariant(p)
    return v !== null && Number(v.price_cents) > 0
  })
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

// Maps a "line" slug to the actual category slugs it groups together
const CATEGORY_GROUPS: Record<string, string[]> = {
  skin: ['skin', 'aceites', 'serums', 'limpiadores'],
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  const slugsToFetch = CATEGORY_GROUPS[categorySlug] ?? [categorySlug]

  const { data: cats } = await supabase
    .from('categories')
    .select('id')
    .in('slug', slugsToFetch)

  if (!cats || cats.length === 0) return []

  const categoryIds = cats.map((c: { id: string }) => c.id)

  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      categories ( id, name, slug ),
      product_variants ( * )
    `)
    .eq('active', true)
    .in('category_id', categoryIds)
    .or(DALLO_FILTER)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('getProductsByCategory error:', error.message)
    return []
  }
  const all = (data as Product[]) ?? []
  return all.filter((p) => {
    const v = getDefaultVariant(p)
    return v !== null && Number(v.price_cents) > 0
  })
}

export function getDefaultVariant(product: Product) {
  const variants = product.product_variants ?? []
  return variants.find((v) => v.is_default && v.active)
    ?? variants.find((v) => v.active)
    ?? variants[0]
    ?? null
}
