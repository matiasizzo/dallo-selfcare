import type { Metadata } from 'next'
import AnnouncementBar from '@/components/AnnouncementBar'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import ToneStrip from '@/components/ToneStrip'
import ProductGrid from '@/components/ProductGrid'
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

        <ToneStrip
          tagline="Longevidad es salud"
          sub="Nuestro compromiso con la excelencia se refleja en cada detalle."
          imgGradient="radial-gradient(at 30% 40%, #f6d77e 0%, transparent 55%), radial-gradient(at 70% 60%, #c9985f 0%, transparent 50%), linear-gradient(135deg, #e8c785 0%, #a07440 100%)"
        />

        <ToneStrip
          tagline="Alchemy and Longevity"
          sub="Supplementing with science."
          imgGradient="radial-gradient(at 40% 30%, #d9b394 0%, transparent 55%), linear-gradient(160deg, #b08868 0%, #5d3a23 100%)"
          reverse
        />

        <ProductGrid
          products={products}
          title="Todos os Produtos"
          showViewAll
          anchor="tienda"
        />

        <LineasGallery />
      </main>
      <Footer />
    </>
  )
}
