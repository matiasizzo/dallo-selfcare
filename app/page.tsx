import Navbar       from '@/components/Navbar'
import Hero         from '@/components/Hero'
import Services     from '@/components/Services'
import About        from '@/components/About'
import Treatments   from '@/components/Treatments'
import Rituales     from '@/components/Rituales'
import Testimonials from '@/components/Testimonials'
import FAQ          from '@/components/FAQ'
import Booking      from '@/components/Booking'
import Footer       from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <About />
        <Treatments />
        <Rituales />
        <Testimonials />
        <FAQ />
        <Booking />
      </main>
      <Footer />
    </>
  )
}
