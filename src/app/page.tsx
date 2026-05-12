import AnnouncementBar from '@/components/AnnouncementBar'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Editorial from '@/components/Editorial'
import ProductGrid from '@/components/ProductGrid'
import Collections from '@/components/Collections'
import Footer from '@/components/Footer'

export default function HomePage() {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main>
        <Hero />
        <Editorial />
        <ProductGrid />
        <Collections />
      </main>
      <Footer />
    </>
  )
}
