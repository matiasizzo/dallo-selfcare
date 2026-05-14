import type { Metadata } from 'next'
import AnnouncementBar from '@/components/AnnouncementBar'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import BrandManifesto from '@/components/BrandManifesto'
import ObjectiveFilter from '@/components/ObjectiveFilter'
import LineasGallery from '@/components/LineasGallery'
import Footer from '@/components/Footer'
import { getProducts } from '@/lib/products'

export const revalidate = 60

export const metadata: Metadata = {
  title: "Dall'Ó Selfcare — Longevidad en salud",
  description: "Suplementación de precisión y cosmética de alto rendimiento para quienes entienden la ciencia del bienestar.",
  alternates: { canonical: '/' },
}

export default async function HomePage() {
  const products = await getProducts()

  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main>
        <Hero />
        <BrandManifesto />
        <ObjectiveFilter products={products} />
        <LineasGallery />
      </main>
      <Footer />
    </>
  )
}
