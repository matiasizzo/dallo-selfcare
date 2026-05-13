import type { Metadata } from 'next'
import AnnouncementBar from '@/components/AnnouncementBar'

export const revalidate = 60

export const metadata: Metadata = {
  title: "Dall'Ó Selfcare — Longevidad en salud",
  description: "Suplementación de precisión y cosmética de alto rendimiento para quienes entienden la ciencia del bienestar.",
  alternates: { canonical: '/' },
}


import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Values from '@/components/Values'
import Collections from '@/components/Collections'
import ProductGrid from '@/components/ProductGrid'
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
        <Values />
        <Collections />
        <ProductGrid
          products={products}
          eyebrow="Formulaciones activas"
          title='Todos los <em>productos</em>.'
          showViewAll={false}
        />
      </main>
      <Footer />
    </>
  )
}
