import { notFound } from 'next/navigation'
import AnnouncementBar from '@/components/AnnouncementBar'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ProductGrid from '@/components/ProductGrid'
import { getProductsByCategory, LINE_COLORS } from '@/lib/products'
import { supabase } from '@/lib/supabase'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const { data: cat } = await supabase
    .from('categories')
    .select('name')
    .eq('slug', slug)
    .single<{ name: string }>()
  return {
    title: cat ? `${cat.name} — Dall'Ó Selfcare` : "Colección — Dall'Ó Selfcare",
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
      <main className="min-h-screen">
        <div className="max-w-screen-xl mx-auto px-6 pt-16 pb-4">
          {/* Line accent */}
          <div className="w-8 h-0.5 mb-6" style={{ backgroundColor: lineColor }} />
          <h1
            className="font-cormorant text-5xl font-light text-cocoa-900 mb-3"
          >
            {category.name}
          </h1>
          <p className="text-sm text-text-muted font-sans">
            {products.length} {products.length === 1 ? 'producto' : 'productos'}
          </p>
        </div>
        <ProductGrid products={products} showViewAll={false} title="" />
      </main>
      <Footer />
    </>
  )
}
