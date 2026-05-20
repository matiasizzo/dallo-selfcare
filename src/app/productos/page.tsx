export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import AnnouncementBar from '@/components/AnnouncementBar'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CollectionClient from '@/components/CollectionClient'
import { getProducts } from '@/lib/products'

export const metadata: Metadata = {
  title: "Todos los productos | Dall'Ó Selfcare",
  description: "Descubre la línea completa de suplementos nutricionales y cosmética de Dall'Ó Selfcare. Elaborados bajo pedido en Barcelona y Málaga.",
  alternates: { canonical: '/productos' },
}

export default async function ProductsPage() {
  const products = await getProducts()

  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main className="min-h-screen bg-cream">
        <CollectionClient products={products} />
      </main>
      <Footer />
    </>
  )
}
