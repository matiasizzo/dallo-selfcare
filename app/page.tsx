import Navbar          from '@/components/Navbar'
import Hero            from '@/components/Hero'
import Services        from '@/components/Services'
import Treatments      from '@/components/Treatments'
import ProductsPreview from '@/components/ProductsPreview'
import Rituales        from '@/components/Rituales'
import Testimonials    from '@/components/Testimonials'
import FAQ             from '@/components/FAQ'
import Booking         from '@/components/Booking'
import Footer          from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Treatments />
        <ProductsPreview />
        <Rituales />
        <Testimonials />
        <FAQ />
        <Booking />
      </main>
      <Footer />
    </>
  )
}
