import type { Metadata } from 'next'
import Image from 'next/image'
import AnnouncementBar from '@/components/AnnouncementBar'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: "Rituals — QUEIVI Wellness Clinic · Dall'Ó",
  description:
    "Rituales firma de optimización celular diseñados por el Dr. Dall'O. La intersección entre estética personalizada de precisión y el bienestar sensorial. Estepona, Málaga.",
}

const QUEIVI_GREEN = '#2d4a30'
const QUEIVI_LOGO  = 'https://niuaflxfiyafckvseruu.supabase.co/storage/v1/object/public/assets/Quevi/quevi-claro.jpeg'
const WHATSAPP_URL = 'https://wa.me/34683462705'
const WEBSITE_URL  = 'https://www.queviwellnessclinic.es'
const PHONE        = '+34 683 462 705'

const phases = [
  {
    num: '01',
    tag: 'Shield',
    title: 'Bio-Protección',
    body: 'El seguro de vida de tu piel contra el daño ambiental. Blindaje preventivo, análisis de precisión (luz de Wood), peelings, limpieza profunda, oxigenoterapia y nutricosmética clínica.',
    gradient: 'linear-gradient(160deg, #3a5e44 0%, #2a4a34 50%, #1e3828 100%)',
    iconColor: 'rgba(255,255,255,0.55)',
    icon: (
      <svg viewBox="0 0 64 64" width="56" height="56" fill="none" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" stroke="rgba(255,255,255,0.55)">
        <path d="M32 6 L54 14 V30 C54 44 44 54 32 60 C20 54 10 44 10 30 V14 Z"/>
        <path d="M32 12 L48 18 V30 C48 41 40 49 32 54 C24 49 16 41 16 30 V18 Z"/>
        <path d="M32 22 V46 M22 32 L42 32"/>
        <circle cx="32" cy="32" r="4"/>
        <path d="M28 18 Q32 14 36 18"/>
      </svg>
    ),
  },
  {
    num: '02',
    tag: 'Repair',
    title: 'Regeneración',
    body: 'Restauramos la capacidad biológica de la piel para sanarse. Medicina regenerativa: células madre, PRP, bioestimuladores de colágeno, redensificación hialurónica y plan de nutrición y suplementación.',
    gradient: 'linear-gradient(160deg, #c49a7a 0%, #a87860 50%, #8a5e48 100%)',
    iconColor: 'rgba(255,255,255,0.55)',
    icon: (
      <svg viewBox="0 0 64 64" width="56" height="56" fill="none" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" stroke="rgba(255,255,255,0.55)">
        <path d="M8 24 L16 44 H48 L56 24 L46 32 L38 16 L32 30 L26 16 L18 32 Z"/>
        <path d="M16 44 H48 V50 H16 Z"/>
        <circle cx="8" cy="24" r="2.2"/>
        <circle cx="56" cy="24" r="2.2"/>
        <circle cx="32" cy="20" r="2"/>
        <circle cx="20" cy="38" r="1.4"/>
        <circle cx="32" cy="38" r="1.4"/>
        <circle cx="44" cy="38" r="1.4"/>
      </svg>
    ),
  },
  {
    num: '03',
    tag: 'Boost',
    title: 'Optimización',
    body: 'Biohacking y máximo rendimiento celular. Terapias de precisión con exosomas, luz LED y fotobiomodulación, ozonoterapia, optimización de sueño y energía, mantenimiento mensual.',
    gradient: 'linear-gradient(160deg, #b88868 0%, #9a6e54 50%, #7e5440 100%)',
    iconColor: 'rgba(255,255,255,0.55)',
    icon: (
      <svg viewBox="0 0 64 64" width="56" height="56" fill="none" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" stroke="rgba(255,255,255,0.55)">
        <path d="M36 4 L14 36 H28 L26 60 L50 26 H34 Z"/>
        <path d="M36 10 L20 34 H30 L28 52 L44 28 H34 Z"/>
      </svg>
    ),
  },
  {
    num: '04',
    tag: 'Reset / Soul',
    title: 'Equilibrio',
    body: 'Armonía para una belleza consciente. Cortamos el cortisol (la hormona del estrés) y trabajamos el bienestar holístico: rituales sensoriales, aromaterapia, piedras volcánicas y mindfulness estético.',
    gradient: 'linear-gradient(160deg, #1e3828 0%, #162c20 50%, #0e2018 100%)',
    iconColor: 'rgba(255,255,255,0.55)',
    icon: (
      <svg viewBox="0 0 64 64" width="56" height="56" fill="none" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" stroke="rgba(255,255,255,0.55)">
        <circle cx="22" cy="32" r="14"/>
        <path d="M30 40 L38 48"/>
        <path d="M44 18 C50 22 52 28 50 34 C48 38 44 40 40 38 C42 32 42 24 44 18 Z"/>
        <path d="M44 18 C42 24 42 32 40 38"/>
        <circle cx="22" cy="32" r="3"/>
      </svg>
    ),
  },
]

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
          <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-10">
            <div>
              <nav className="flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-[#8a7060] mb-8">
                <a href="/" className="hover:text-cocoa-900 transition-colors">Home</a>
                <span className="opacity-40">/</span>
                <span>Rituals</span>
              </nav>
              <h1
                className="font-cormorant font-[300] text-cocoa-900 m-0 mb-5 leading-[1.05]"
                style={{ fontSize: 'clamp(44px, 5.5vw, 80px)', letterSpacing: '-0.01em' }}
              >
                <em>Rituals</em><br />de longevidad.
              </h1>
              <p
                className="text-[#5a4a3d] m-0 max-w-[520px] leading-[1.65]"
                style={{ fontSize: 'clamp(15px, 1.4vw, 17px)' }}
              >
                Cuatro fases que convierten una rutina en un protocolo —
                ciencia de precisión, gesto sensorial.
              </p>
            </div>

            <div className="flex-shrink-0">
              <Image
                src={QUEIVI_LOGO}
                alt="QUEIVI Wellness Clinic"
                width={340}
                height={190}
                className="object-contain"
                style={{ mixBlendMode: 'multiply', maxHeight: 170 }}
              />
            </div>
          </div>
        </section>

        {/* ── Los 4 pilares (sección única unificada) ── */}
        <section className="px-6 py-16 md:py-20 border-b border-[#e8dccb]" style={{ background: '#f2ece3' }}>
          <div className="max-w-[1600px] mx-auto">

            {/* Header row */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
              <div>
                <span
                  className="block text-[10px] tracking-[0.3em] uppercase mb-4"
                  style={{ color: QUEIVI_GREEN, opacity: 0.7 }}
                >
                  — Protocolos clínicos
                </span>
                <h2
                  className="font-cormorant font-[300] text-cocoa-900 m-0 leading-[1.05]"
                  style={{ fontSize: 'clamp(30px, 3.5vw, 52px)' }}
                >
                  Los 4 <em>pilares</em> del tratamiento.
                </h2>
              </div>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="self-start sm:self-end inline-flex items-center gap-2 px-6 py-3 text-[12px] tracking-[0.06em] uppercase font-[500] rounded-full transition-all duration-300 hover:opacity-90 whitespace-nowrap"
                style={{ background: QUEIVI_GREEN, color: '#f5efe6' }}
              >
                Reservar diagnóstico
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6"/>
                </svg>
              </a>
            </div>

            {/* 4 cards in a row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {phases.map((phase) => (
                <article
                  key={phase.num}
                  className="relative overflow-hidden rounded-xl flex flex-col"
                  style={{ minHeight: 480 }}
                >
                  {/* Gradient area with icon */}
                  <div
                    className="relative flex items-center justify-center"
                    style={{ background: phase.gradient, flex: '1 1 60%', minHeight: 260 }}
                  >
                    {/* Number top-left */}
                    <span
                      className="absolute top-5 left-5 font-cormorant italic"
                      style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.04em' }}
                    >
                      {phase.num}
                    </span>
                    {/* Icon centered */}
                    <div className="opacity-70">
                      {phase.icon}
                    </div>
                  </div>

                  {/* Text area */}
                  <div
                    className="flex flex-col gap-3 p-6"
                    style={{ background: '#1a1410', flex: '0 0 auto' }}
                  >
                    <div>
                      <span
                        className="block text-[10px] tracking-[0.22em] uppercase mb-2"
                        style={{ color: 'rgba(255,255,255,0.4)' }}
                      >
                        {phase.tag}
                      </span>
                      <h3
                        className="font-cormorant font-[400] m-0 leading-tight"
                        style={{ fontSize: 'clamp(22px, 2vw, 28px)', color: '#f0e8e0' }}
                      >
                        {phase.title}
                      </h3>
                    </div>
                    <p
                      className="m-0 leading-[1.7]"
                      style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}
                    >
                      {phase.body}
                    </p>
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[11px] tracking-[0.12em] uppercase transition-opacity duration-200 hover:opacity-60 mt-1 w-fit"
                      style={{ color: 'rgba(255,255,255,0.55)', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: 2 }}
                    >
                      Reservar
                      <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M13 6l6 6-6 6"/>
                      </svg>
                    </a>
                  </div>
                </article>
              ))}
            </div>

            {/* Quote strip */}
            <div className="mt-16 text-center max-w-[820px] mx-auto">
              <blockquote
                className="font-cormorant font-[300] italic text-cocoa-900 m-0 leading-[1.3]"
                style={{ fontSize: 'clamp(20px, 2.2vw, 30px)' }}
              >
                &ldquo;La piel no se trata, se acompaña. Cada gesto es una decisión clínica,
                cada ritual es una conversación con tu biología.&rdquo;
              </blockquote>
              <p
                className="mt-4 text-[11px] tracking-[0.22em] uppercase"
                style={{ color: QUEIVI_GREEN, opacity: 0.65 }}
              >
                Dra. Quevi × Dr. Dall&apos;Ó — Fundadores
              </p>
            </div>
          </div>
        </section>

        {/* ── Ritual firma ── */}
        <section className="px-6 py-16 md:py-20 border-b border-[#e8dccb]">
          <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-center">

            <div>
              <span
                className="block text-[10px] tracking-[0.28em] uppercase mb-6"
                style={{ color: QUEIVI_GREEN, opacity: 0.75 }}
              >
                — Ritual firma
              </span>
              <h2
                className="font-cormorant font-[300] text-cocoa-900 m-0 mb-6 leading-tight"
                style={{ fontSize: 'clamp(28px, 3vw, 46px)' }}
              >
                QUEVI <em>Pro-Experience</em><br />Facial &amp; corporal.
              </h2>
              <p className="text-[15px] text-[#5a4a3d] leading-[1.75] m-0 mb-3">
                90 minutos de sinergia: diagnóstico, reparación bioactiva y cierre sensorial.
                Una experiencia diseñada por el equipo clínico y los protocolos QUEVI.
              </p>
              <p className="text-[14px] text-[#7a6a5a] leading-[1.65] m-0 mb-10">
                Combina las cuatro fases en una sola visita — análisis con luz de Wood,
                peeling de precisión, fotobiomodulación LED, masaje craneal con aromaterapia
                y piedras volcánicas.
              </p>
              <div className="flex gap-3 flex-wrap">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3 text-[12px] tracking-[0.08em] uppercase font-[500] rounded-full transition-all duration-300 hover:opacity-90"
                  style={{ background: QUEIVI_GREEN, color: '#f5efe6' }}
                >
                  Reservar ahora
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 6l6 6-6 6"/>
                  </svg>
                </a>
                <a
                  href={WEBSITE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3 text-[12px] tracking-[0.08em] uppercase font-[500] rounded-full transition-all duration-300 hover:opacity-80"
                  style={{ border: `1px solid ${QUEIVI_GREEN}`, color: QUEIVI_GREEN }}
                >
                  Ver protocolo
                </a>
              </div>
            </div>

            {/* Decorative panel */}
            <div
              className="rounded-2xl overflow-hidden"
              style={{ background: 'linear-gradient(145deg, #1e3828 0%, #2a4a35 100%)', minHeight: 380, padding: '48px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}
            >
              <span
                className="font-cormorant italic"
                style={{ fontSize: 'clamp(48px, 5vw, 72px)', color: 'rgba(255,255,255,0.08)', lineHeight: 1, display: 'block', marginBottom: 32 }}
              >
                QUEVI
              </span>
              <div className="h-px mb-6" style={{ background: 'rgba(255,255,255,0.12)' }} />
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, margin: 0 }}>
                Clínica de medicina estética de precisión.<br />
                Estepona, Málaga · Por cita previa.
              </p>
            </div>
          </div>
        </section>

        {/* ── Dirección + Mapa ── */}
        <section className="px-6 py-16 md:py-20">
          <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-start">

            <div>
              <span
                className="block text-[10px] tracking-[0.28em] uppercase mb-6"
                style={{ color: QUEIVI_GREEN, opacity: 0.75 }}
              >
                — Dónde realizarlo
              </span>
              <h2
                className="font-cormorant font-[300] text-cocoa-900 m-0 mb-8 leading-tight"
                style={{ fontSize: 'clamp(28px, 3vw, 44px)' }}
              >
                QUEIVI<br /><em>Wellness Clinic</em>
              </h2>

              <address className="not-italic mb-8 space-y-[6px]">
                <p className="text-[15px] text-[#3a2f25] m-0">Cl. Gibraltar, 2 LC Pta. Bjo</p>
                <p className="text-[15px] text-[#3a2f25] m-0">29680 Estepona, Málaga</p>
                <p className="text-[15px] text-[#3a2f25] m-0 pt-2">
                  <a href={`tel:${PHONE.replace(/\s/g, '')}`} className="hover:underline">{PHONE}</a>
                </p>
                <p className="text-[15px] m-0">
                  <a
                    href={WEBSITE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                    style={{ color: QUEIVI_GREEN }}
                  >
                    queviwellnessclinic.es
                  </a>
                </p>
              </address>

              <div className="flex flex-col gap-3">
                <a
                  href="https://maps.google.com/?q=Calle+Gibraltar+2,+29680+Estepona,+Malaga"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[13px] tracking-[0.04em] border-b pb-px w-fit transition-opacity duration-200 hover:opacity-70"
                  style={{ color: QUEIVI_GREEN, borderColor: QUEIVI_GREEN }}
                >
                  Abrir en Google Maps
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                    <polyline points="15 3 21 3 21 9"/>
                    <line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                </a>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[13px] tracking-[0.04em] border-b pb-px w-fit transition-opacity duration-200 hover:opacity-70"
                  style={{ color: QUEIVI_GREEN, borderColor: QUEIVI_GREEN }}
                >
                  Contactar por WhatsApp
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 6l6 6-6 6"/>
                  </svg>
                </a>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl" style={{ border: '1px solid #ddd1bd' }}>
              <iframe
                title="QUEIVI Wellness Clinic — Estepona"
                src="https://maps.google.com/maps?q=Calle+Gibraltar+2,+29680+Estepona,+Malaga,+Spain&output=embed&z=17&hl=es"
                width="100%"
                height="420"
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
