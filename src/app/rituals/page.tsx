import type { Metadata } from 'next'
import AnnouncementBar from '@/components/AnnouncementBar'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: "Rituals — QUEIVI Wellness Clinic · Dall'Ó",
  description:
    'Rituales firma de optimización celular diseñados por el Dr. Dall'O. La intersección entre estética personalizada de precisión y el bienestar sensorial. Estepona, Málaga.',
}

const QUEIVI_GREEN = '#2d4a30'

export default function RitualsPage() {
  return (
    <>
      <AnnouncementBar />
      <Navbar />

      <main className="min-h-screen bg-cream">

        {/* ── Hero ── */}
        <section
          className="relative px-8 pt-24 pb-20 border-b border-[#e8dccb]"
          style={{ background: 'linear-gradient(160deg, #f5efe6 0%, #ede3d5 100%)' }}
        >
          <div className="max-w-[1600px] mx-auto">

            {/* QUEIVI wordmark */}
            <div className="mb-8">
              <p
                className="font-cormorant font-[300] tracking-[0.25em] uppercase m-0"
                style={{ fontSize: 'clamp(11px, 1.2vw, 13px)', color: QUEIVI_GREEN, letterSpacing: '0.3em' }}
              >
                Wellness Clinic
              </p>
              <h2
                className="font-cormorant font-[400] m-0 leading-none"
                style={{
                  fontSize: 'clamp(52px, 7vw, 100px)',
                  color: QUEIVI_GREEN,
                  letterSpacing: '-0.01em',
                }}
              >
                QUEIVI
              </h2>
            </div>

            {/* Divider */}
            <div className="w-12 h-px mb-8" style={{ background: QUEIVI_GREEN, opacity: 0.3 }} />

            {/* Page title + tagline */}
            <h1
              className="font-cormorant font-[300] text-cocoa-900 m-0 mb-5 leading-[1.05]"
              style={{ fontSize: 'clamp(36px, 4.5vw, 64px)', letterSpacing: '-0.01em' }}
            >
              Rituals
            </h1>
            <p
              className="text-[#5a4a3d] m-0 max-w-[560px] leading-[1.6]"
              style={{ fontSize: 'clamp(15px, 1.4vw, 17px)' }}
            >
              La intersección entre estética personalizada de precisión<br className="hidden md:block" /> y el bienestar sensorial.
            </p>
          </div>
        </section>

        {/* ── Body copy ── */}
        <section className="px-8 py-20 border-b border-[#e8dccb]">
          <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-start">

            {/* Left: description */}
            <div>
              <p
                className="text-[11px] tracking-[0.28em] uppercase text-[#8a7a6c] m-0 mb-5"
                style={{ color: QUEIVI_GREEN, opacity: 0.7 }}
              >
                Filosofía
              </p>
              <p className="text-[16px] text-[#3a2f25] leading-[1.75] m-0 mb-6">
                En QUEIVI, entendemos que la piel es el reflejo de nuestra biología interna.
                Nuestros rituales firma no son simples tratamientos de cabina; son protocolos
                de optimización celular diseñados por el Dr. Dall&apos;O para reprogramar la
                salud cutánea desde el interior.
              </p>
              <p className="text-[15px] text-[#5a4a3d] leading-[1.7] m-0">
                Cada sesión combina activos de grado biotecnológico, técnicas de
                estimulación celular y una experiencia sensorial calibrada para
                devolver a tu piel su capacidad regenerativa natural.
              </p>
            </div>

            {/* Right: featured ritual card */}
            <div
              className="rounded-2xl p-8 md:p-10"
              style={{ background: 'linear-gradient(145deg, #f0ebe2 0%, #e4d8c8 100%)', border: '1px solid #ddd1bd' }}
            >
              <p
                className="text-[10px] tracking-[0.3em] uppercase m-0 mb-4"
                style={{ color: QUEIVI_GREEN }}
              >
                Ritual Firma
              </p>
              <h3
                className="font-cormorant font-[400] text-cocoa-900 m-0 mb-3 leading-tight"
                style={{ fontSize: 'clamp(22px, 2.4vw, 30px)' }}
              >
                Facial &amp; Corporal
              </h3>
              <p
                className="font-cormorant font-[300] italic m-0 mb-6"
                style={{ fontSize: 'clamp(17px, 1.8vw, 21px)', color: QUEIVI_GREEN }}
              >
                QUEIVI Pro-Experience
              </p>
              <div className="h-px mb-6" style={{ background: '#ddd1bd' }} />
              <p className="text-[13px] text-[#5a4a3d] leading-[1.65] m-0 mb-8">
                Un protocolo de alta precisión que combina bioestimulación, drenaje
                profundo y activos de longevidad celular para una transformación
                visible desde la primera sesión.
              </p>
              <a
                href="https://wa.me/34000000000"
                className="inline-flex items-center gap-2 px-7 py-3 text-[12px] tracking-[0.08em] uppercase font-[500] rounded-full transition-all duration-300 active:scale-[0.97]"
                style={{ background: QUEIVI_GREEN, color: '#f5efe6' }}
              >
                Reservar ritual
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* ── Dirección + Mapa ── */}
        <section className="px-8 py-20">
          <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-start">

            {/* Address block */}
            <div>
              <p
                className="text-[11px] tracking-[0.28em] uppercase m-0 mb-6"
                style={{ color: QUEIVI_GREEN, opacity: 0.7 }}
              >
                Dónde encontrarnos
              </p>
              <h3
                className="font-cormorant font-[400] text-cocoa-900 m-0 mb-6 leading-tight"
                style={{ fontSize: 'clamp(28px, 3vw, 40px)' }}
              >
                QUEIVI<br />Wellness Clinic
              </h3>
              <address className="not-italic space-y-1 mb-8">
                <p className="text-[15px] text-[#3a2f25] m-0">Cl. Gibraltar, 2 LC Pta. Bjo</p>
                <p className="text-[15px] text-[#3a2f25] m-0">29680 Estepona</p>
                <p className="text-[15px] text-[#3a2f25] m-0">Málaga, España</p>
              </address>
              <a
                href="https://maps.google.com/?q=Calle+Gibraltar+2,+29680+Estepona,+Malaga"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[13px] tracking-[0.04em] border-b pb-px transition-colors duration-200"
                style={{ color: QUEIVI_GREEN, borderColor: QUEIVI_GREEN }}
              >
                Abrir en Google Maps
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            </div>

            {/* Map */}
            <div className="overflow-hidden rounded-2xl" style={{ border: '1px solid #ddd1bd' }}>
              <iframe
                title="QUEIVI Wellness Clinic — Estepona"
                src="https://maps.google.com/maps?q=Calle+Gibraltar+2,+29680+Estepona,+Malaga,+Spain&output=embed&z=17&hl=es"
                width="100%"
                height="380"
                style={{ border: 0, display: 'block' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  )
}
