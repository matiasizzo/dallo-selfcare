import type { Metadata } from 'next'
import AnnouncementBar from '@/components/AnnouncementBar'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ProductGrid from '@/components/ProductGrid'
import { getProducts } from '@/lib/products'

export const metadata: Metadata = {
  title: "Todos los productos",
  description: "Descubre la línea completa de suplementos y cosmética de Dall'Ó Selfcare. Ciencia aplicada al bienestar y la longevidad.",
  alternates: { canonical: '/productos' },
}

export default async function ProductsPage() {
  const products = await getProducts()

  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main className="min-h-screen bg-white">
        <div className="max-w-screen-xl mx-auto px-8 pt-20 pb-4 border-b border-sand-300">
          <p className="text-[10px] tracking-[0.3em] uppercase text-text-muted mb-4">Catálogo</p>
          <h1 className="font-cormorant text-6xl font-light text-cocoa-900">
            Todos los productos
          </h1>
        </div>
        <ProductGrid products={products} showViewAll={false} title="" />
      </main>
      <Footer />
    </>
  )
}
