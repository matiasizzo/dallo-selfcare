import type { Metadata } from 'next'
import AnnouncementBar from '@/components/AnnouncementBar'

export const metadata: Metadata = {
  title: "Dall'Ó Selfcare — Longevidad en salud",
  description: "Suplementación de precisión y cosmética de alto rendimiento para quienes entienden la ciencia del bienestar.",
  alternates: { canonical: '/' },
}


import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Editorial from '@/components/Editorial'
import ProductGrid from '@/components/ProductGrid'
import Collections from '@/components/Collections'
import Footer from '@/components/Footer'
import { getProducts } from '@/lib/products'

export default async function HomePage() {
  const products = await getProducts()

  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main>
        <Hero />
        <Editorial />
        <ProductGrid products={products} />
        <Collections />
      </main>
      <Footer />
    </>
  )
}
