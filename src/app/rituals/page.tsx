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
    name: 'Shield',
    role: 'Bio-protección',
    body: 'El seguro de vida de tu piel contra el daño ambiental. Blindaje preventivo, análisis de precisión (luz de Wood), peelings, limpieza profunda, oxigenoterapia y nutricosmética clínica.',
    cta: 'Reservar diagnóstico',
    icon: (
      <svg viewBox="0 0 64 64" width="52" height="52" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" stroke="url(#rosegold)">
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
    name: 'Repair',
    role: 'Regeneración',
    body: 'Restauramos la capacidad biológica de la piel para sanarse. Medicina regenerativa: células madre, PRP, bioestimuladores de colágeno, redensificación hialurónica y plan de nutrición y suplementación.',
    cta: 'Ver tratamientos',
    icon: (
      <svg viewBox="0 0 64 64" width="52" height="52" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" stroke="url(#rosegold)">
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
    name: 'Boost',
    role: 'Optimización',
    body: 'Biohacking y máximo rendimiento celular. Terapias de precisión con exosomas, luz LED y fotobiomodulación, ozonoterapia, optimización de sueño y energía, mantenimiento mensual.',
    cta: 'Programar sesión',
    icon: (
      <svg viewBox="0 0 64 64" width="52" height="52" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" stroke="url(#rosegold)">
        <path d="M36 4 L14 36 H28 L26 60 L50 26 H34 Z"/>
        <path d="M36 10 L20 34 H30 L28 52 L44 28 H34 Z"/>
      </svg>
    ),
  },
  {
    num: '04',
    name: 'Reset · Soul',
    role: 'Mente & equilibrio',
    body: 'Armonía para una belleza consciente. Cortamos el cortisol (la hormona del estrés) y trabajamos el bienestar holístico en paz: rituales sensoriales, aromaterapia, piedras volcánicas y mindfulness estético.',
    cta: 'Reservar ritual',
    icon: (
      <svg viewBox="0 0 64 64" width="52" height="52" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" stroke="url(#rosegold)">
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

        {/* SVG gradient defs (rose-gold for phase icons) */}
        <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
          <defs>
            <linearGradient id="rosegold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fce6cf"/>
              <stop offset="35%" stopColor="#e8c4a4"/>
              <stop offset="60%" stopColor="#c79477"/>
              <stop offset="100%" stopColor="#8a5a3f"/>
            </linearGradient>
          </defs>
        </svg>

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

        {/* ── Las 4 fases ── */}
        <section className="px-8 py-20 border-b border-[#e8dccb]" style={{ background: '#f5efe6' }}>
          <div className="max-w-[1600px] mx-auto">

            {/* Section header */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
              <div>
                <span
                  className="block text-[10px] tracking-[0.3em] uppercase mb-4"
                  style={{ color: '#a07a5a', opacity: 0.8 }}
                >
                  — Las 4 fases · Cuidas de la piel QUEVI
                </span>
                <h2
                  className="font-cormorant font-[300] text-cocoa-900 m-0 leading-[1.1]"
                  style={{ fontSize: 'clamp(34px, 4vw, 58px)' }}
                >
                  Cuatro <em>fases</em>.<br />Una piel.
                </h2>
              </div>
              <p
                className="text-[#5a4a3d] leading-[1.7] max-w-[400px] m-0"
                style={{ fontSize: 'clamp(14px, 1.2vw, 16px)' }}
              >
                Un protocolo construido en consulta por el Dr. Dall&apos;Ó.
                Cada fase tiene su lugar y su momento — juntas componen el cuidado completo.
              </p>
            </div>

            {/* 2×2 grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5">
              {phases.map((phase) => (
                <article
                  key={phase.num}
                  className="relative overflow-hidden rounded-xl p-8 lg:p-10 flex flex-col gap-6"
                  style={{
                    background: 'linear-gradient(145deg, #2e1a0e 0%, #3d2411 50%, #2a1a0a 100%)',
                  }}
                >
                  {/* Grain overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-[0.06]"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
                      backgroundSize: '200px 200px',
                    }}
                  />

                  {/* Number */}
                  <span
                    className="font-cormorant italic"
                    style={{ fontSize: 13, color: '#c79477', opacity: 0.7, letterSpacing: '0.04em' }}
                  >
                    {phase.num} — Phase
                  </span>

                  {/* Head: text + icon */}
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3
                        className="font-cormorant font-[400] m-0 leading-none mb-1"
                        style={{ fontSize: 'clamp(28px, 3vw, 38px)', color: '#f2e8de' }}
                      >
                        {phase.name}
                      </h3>
                      <span
                        className="font-cormorant italic"
                        style={{ fontSize: 'clamp(14px, 1.3vw, 17px)', color: '#c79477' }}
                      >
                        {phase.role}
                      </span>
                    </div>
                    <div className="flex-shrink-0 mt-1">
                      {phase.icon}
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-px" style={{ background: 'linear-gradient(90deg, #c7947760, transparent)' }} />

                  {/* Body */}
                  <p
                    className="m-0 leading-[1.75] flex-1"
                    style={{ fontSize: 'clamp(13px, 1.1vw, 15px)', color: '#c4b0a0' }}
                  >
                    {phase.body}
                  </p>

                  {/* CTA */}
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 self-start text-[12px] tracking-[0.1em] uppercase transition-opacity duration-200 hover:opacity-70"
                    style={{ color: '#e8c4a4', borderBottom: '1px solid #c7947780', paddingBottom: 2 }}
                  >
                    {phase.cta}
                    <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M13 6l6 6-6 6"/>
                    </svg>
                  </a>
                </article>
              ))}
            </div>

            {/* QUEVI watermark */}
            <div className="mt-12 flex items-center gap-4">
              <div className="h-px flex-1" style={{ background: '#e0d3c4' }} />
              <div className="text-center">
                <span
                  className="block text-[10px] tracking-[0.25em] uppercase mb-1"
                  style={{ color: '#a07a5a', opacity: 0.6 }}
                >
                  — Las 4 fases · Cuidas de la piel
                </span>
                <span
                  className="font-cormorant italic"
                  style={{ fontSize: 28, color: '#a07a5a', opacity: 0.5 }}
                >
                  QUEVI
                </span>
              </div>
              <div className="h-px flex-1" style={{ background: '#e0d3c4' }} />
            </div>
          </div>
        </section>

        {/* ── Filosofía ── */}
        <section className="px-8 py-20 border-b border-[#e8dccb]">
          <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-start">

            <div>
              <span
                className="block text-[10px] tracking-[0.28em] uppercase mb-6"
                style={{ color: QUEIVI_GREEN, opacity: 0.75 }}
              >
                — Nuestra filosofía
              </span>
              <blockquote
                className="font-cormorant font-[300] italic text-cocoa-900 m-0 mb-8 leading-[1.4]"
                style={{ fontSize: 'clamp(20px, 2vw, 26px)' }}
              >
                &ldquo;La piel no se trata, se acompaña. Cada gesto es una decisión clínica,
                cada ritual es una conversación con tu biología.&rdquo;
              </blockquote>
              <p className="text-[15px] text-[#5a4a3d] leading-[1.75] m-0">
                Trabajamos en la intersección entre la medicina estética de precisión y el bienestar
                sensorial. Diagnóstico clínico, tecnología regenerativa y un cierre íntimo en sala
                — los rituales QUEVI nacen para acompañar el ciclo completo de cuidado.
              </p>
            </div>

            {/* Ritual firma card */}
            <div
              className="rounded-2xl p-8 md:p-10"
              style={{ background: 'linear-gradient(145deg, #f0ebe2 0%, #e4d8c8 100%)', border: '1px solid #ddd1bd' }}
            >
              <span
                className="block text-[10px] tracking-[0.3em] uppercase mb-4"
                style={{ color: QUEIVI_GREEN }}
              >
                — Ritual firma
              </span>
              <h3
                className="font-cormorant font-[400] text-cocoa-900 m-0 mb-2 leading-tight"
                style={{ fontSize: 'clamp(22px, 2.4vw, 30px)' }}
              >
                QUEVI <em>Pro-Experience</em><br />Facial &amp; corporal.
              </h3>
              <div className="h-px my-6" style={{ background: '#ddd1bd' }} />
              <p className="text-[14px] text-[#5a4a3d] leading-[1.7] m-0 mb-4">
                90 minutos de sinergia: diagnóstico, reparación bioactiva y cierre sensorial.
                Una experiencia diseñada por el equipo clínico y los protocolos QUEVI.
              </p>
              <p className="text-[13px] text-[#7a6a5a] leading-[1.65] m-0 mb-8">
                Combina las cuatro fases en una sola visita — análisis con luz de Wood,
                peeling de precisión, fotobiomodulación LED, masaje craneal con aromaterapia
                y piedras volcánicas.
              </p>
              <div className="flex gap-3 flex-wrap">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3 text-[12px] tracking-[0.08em] uppercase font-[500] rounded-full transition-all duration-300 hover:opacity-90 active:scale-[0.97]"
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
          </div>
        </section>

        {/* ── Dirección + Mapa ── */}
        <section className="px-8 py-20">
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
                Clínica <em>Dall&apos;Ó</em><br />Barcelona.
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
