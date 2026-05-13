import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import AnnouncementBar from '@/components/AnnouncementBar'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ProductGrid from '@/components/ProductGrid'
import { getProductsByCategory, LINE_COLORS } from '@/lib/products'
import { supabase } from '@/lib/supabase'

export const revalidate = 60

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const { data: cat } = await supabase
    .from('categories')
    .select('name')
    .eq('slug', slug)
    .single<{ name: string }>()

  const name = cat?.name ?? 'Colección'
  return {
    title: name,
    description: `Descubre la línea ${name} de Dall'Ó Selfcare. Suplementación y cosmética de alto rendimiento.`,
    alternates: { canonical: `/coleccion/${slug}` },
  }
}

export default async function CollectionPage({ params }: Props) {
  const { slug } = await params

  const { data: category } = await supabase
    .from('categories')
    .select('id, name, slug')
    .eq('slug', slug)
    .single<{ id: string; name: string; slug: string }>()

  if (!category) notFound()

  const products = await getProductsByCategory(slug)
  const lineColor = LINE_COLORS[slug] ?? '#C9A96E'

  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main className="min-h-screen bg-white">
        <div className="max-w-screen-xl mx-auto px-8 pt-20 pb-6 border-b border-sand-300">
          <div className="w-8 h-0.5 mb-6" style={{ backgroundColor: lineColor }} />
          <h1 className="font-cormorant text-6xl font-light text-cocoa-900 mb-3">
            {category.name}
          </h1>
          <p className="text-xs tracking-[0.15em] uppercase text-text-muted">
            {products.length} {products.length === 1 ? 'producto' : 'productos'}
          </p>
        </div>
        <ProductGrid products={products} showViewAll={false} title="" />
      </main>
      <Footer />
    </>
  )
}
