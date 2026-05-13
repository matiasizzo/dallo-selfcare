import type { Metadata } from 'next'
import AnnouncementBar from '@/components/AnnouncementBar'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import ToneStrip from '@/components/ToneStrip'
import ProductCarousels from '@/components/ProductCarousels'
import LineasGallery from '@/components/LineasGallery'
import Footer from '@/components/Footer'
import { getProducts } from '@/lib/products'

export const revalidate = 60

export const metadata: Metadata = {
  title: "Dall'Ó Selfcare — Longevidad en salud",
  description: "Suplementación de precisión y cosmética de alto rendimiento para quienes entienden la ciencia del bienestar.",
  alternates: { canonical: '/' },
}

const NUTRI_SLUGS = ['balance', 'energy', 'metabolism', 'protection', 'senolytic']

export default async function HomePage() {
  const products = await getProducts()

  const skinProducts = products.filter(p => p.categories?.slug === 'skin')
  const nutriProducts = products.filter(p => NUTRI_SLUGS.includes(p.categories?.slug ?? ''))

  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main>
        <Hero />

        <ToneStrip
          tagline="Longevidad es salud"
          sub="Fórmulas magistrales elaboradas bajo pedido para reprogramar la biología de tu piel desde el primer gesto."
          imgSrc="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=900&q=85"
          imgAlt="Ritual de skincare Dall'Ó"
        />

        <ToneStrip
          tagline="Alchemy and Longevity"
          sub="Suplementación de precisión, formulada en cápsulas de liberación retardada para soportar tu ciclo biológico."
          imgSrc="https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=900&q=85"
          imgAlt="Suplementos Dall'Ó Nutri"
          reverse
        />

        <ProductCarousels skinProducts={skinProducts} nutriProducts={nutriProducts} />

        <LineasGallery />
      </main>
      <Footer />
    </>
  )
}
