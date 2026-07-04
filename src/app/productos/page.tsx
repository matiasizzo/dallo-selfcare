export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CollectionClient from '@/components/CollectionClient'
import { getProducts } from '@/lib/products'

export const metadata: Metadata = {
  title: "Todos los productos | Dall'Ó Selfcare",
  description: "Desarrollo de fórmulas de altísima precisión biológica — mediadores celulares, reguladores de la microbiota y escudos contra el estrés oxidativo ambiental. Elaborados bajo pedido en Barcelona y Málaga.",
  alternates: { canonical: '/productos' },
}

export default async function ProductsPage() {
  const products = await getProducts()

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-cream">
        <CollectionClient products={products} />
      </main>
      <Footer />
    </>
  )
}
