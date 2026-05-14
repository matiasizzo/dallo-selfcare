import type { Metadata } from 'next'
import AnnouncementBar from '@/components/AnnouncementBar'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import BrandManifesto from '@/components/BrandManifesto'
import ProductCarousels from '@/components/ProductCarousels'
import LineasGallery from '@/components/LineasGallery'
import Footer from '@/components/Footer'
import { getProducts, getProductsByCategory } from '@/lib/products'

export const revalidate = 60

export const metadata: Metadata = {
  title: "Dall'Ó Selfcare — Longevidad en salud",
  description: "Suplementación de precisión y cosmética de alto rendimiento para quienes entienden la ciencia del bienestar.",
  alternates: { canonical: '/' },
}

const NUTRI_SLUGS = ['balance', 'energy', 'metabolism', 'protection', 'senolytic']

export default async function HomePage() {
  const [products, skinProducts, nutriByCategory] = await Promise.all([
    getProducts(),
    getProductsByCategory('skin'),
    getProductsByCategory('nutri'),
  ])

  const resolvedSkin = skinProducts.length > 0
    ? skinProducts
    : products.filter(p => p.categories?.slug === 'skin')

  const resolvedNutri = nutriByCategory.length > 0
    ? nutriByCategory
    : products.filter(p => NUTRI_SLUGS.includes(p.categories?.slug ?? ''))

  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main>
        <Hero />
        <BrandManifesto />
        <ProductCarousels skinProducts={resolvedSkin} nutriProducts={resolvedNutri} />
        <LineasGallery />
      </main>
      <Footer />
    </>
  )
}
