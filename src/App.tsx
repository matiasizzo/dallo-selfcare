import Navbar       from './components/Navbar'
import Hero         from './components/Hero'
import Services     from './components/Services'
import Stats        from './components/Stats'
import About        from './components/About'
import Treatments   from './components/Treatments'
import Rituales     from './components/Rituales'
import Testimonials from './components/Testimonials'
import Blog         from './components/Blog'
import FAQ          from './components/FAQ'
import Booking      from './components/Booking'
import Footer       from './components/Footer'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Stats />
        <About />
        <Treatments />
        <Rituales />
        <Testimonials />
        <Blog />
        <FAQ />
        <Booking />
      </main>
      <Footer />
    </>
  )
}
