'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const EASE = [0.22, 1, 0.36, 1] as const

export default function Hero() {
  return (
    <section
      className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] relative border-b border-cream-400"
      style={{ background: '#ede9e0', minHeight: 'clamp(520px, 75vh, 760px)' }}
    >
      {/* Copy side */}
      <motion.div
        className="flex flex-col justify-center gap-4 lg:gap-[22px] px-6 sm:px-10 lg:px-16 py-14 lg:py-[90px] text-carbon-900 relative z-[2]"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        {/* Eyebrow */}
        <span className="inline-flex items-center gap-[10px] text-[11px] tracking-[0.24em] uppercase text-brand-700 font-medium">
          <span className="inline-block w-7 h-px bg-brand-500" />
          Wellness Clinic · Cosmética médica
        </span>

        {/* H1 */}
        <h1
          className="font-serif font-bold leading-[0.96] tracking-[-0.022em] m-0 text-carbon-900 text-balance"
          style={{ fontSize: 'clamp(44px, 6.8vw, 96px)', maxWidth: '13ch' }}
        >
          Tu rutina, <em className="not-italic font-normal text-brand-600">prescrita</em>.
          <br />No vendida.
        </h1>

        {/* Subheadline */}
        <p className="text-[15px] sm:text-[17px] text-carbon-500 my-1 mb-2 max-w-[440px] leading-[1.6]">
          Una clínica de bienestar que cruza diagnóstico médico, terapia regenerativa y
          cosmética magistral de precisión — porque tu piel no necesita una novedad, necesita tu historia.
        </p>

        {/* CTAs */}
        <div className="flex gap-3 flex-wrap">
          <a
            href="#diagnostico"
            className="group inline-flex items-center gap-2 px-6 sm:px-7 py-3 bg-brand-600 text-cream-50 rounded-full font-medium text-[13px] tracking-[0.02em] shadow-brand transition-all duration-200 hover:bg-brand-700 hover:-translate-y-0.5 active:scale-[0.97] will-change-transform"
            style={{ transitionTimingFunction: 'cubic-bezier(0.22,1,0.36,1)' }}
          >
            Reservar diagnóstico
            <svg className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </a>
          <a
            href="/shop"
            className="inline-flex items-center gap-2 px-5 sm:px-[26px] py-3 text-carbon-900 rounded-full font-medium text-[13px] tracking-[0.02em] border border-cream-400 bg-transparent transition-all duration-200 hover:bg-cream-300 hover:-translate-y-0.5 active:scale-[0.97] will-change-transform"
            style={{ transitionTimingFunction: 'cubic-bezier(0.22,1,0.36,1)' }}
          >
            Ver toda la tienda
          </a>
        </div>

        {/* Stats */}
        <div
          className="flex flex-wrap gap-5 sm:gap-10 pt-6 sm:pt-[30px] mt-2 sm:mt-3"
          style={{ borderTop: '1px solid #ddd8cc' }}
        >
          {[
            { v: '12', l: 'Fórmulas magistrales' },
            { v: '+2k', l: 'Pacientes activos' },
            { v: '100%', l: 'Formulación médica' },
            { v: '4,9★', l: 'Reseñas verificadas' },
          ].map((s) => (
            <div key={s.l} className="flex flex-col gap-1">
              <span className="font-serif text-[22px] sm:text-[26px] font-bold text-brand-700 leading-none">
                {s.v}
              </span>
              <span className="text-[10px] tracking-[0.18em] uppercase text-carbon-500">
                {s.l}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Image side — fixed height on mobile, fills column on desktop */}
      <motion.div
        className="relative overflow-hidden bg-brand-700 h-64 sm:h-80 lg:h-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
      >
        <Image
          src="/images/hero.png"
          alt="Quevi clinic"
          fill
          className="object-cover"
          style={{ filter: 'saturate(0.92) contrast(1.05)' }}
          priority
          sizes="(max-width: 1024px) 100vw, 55vw"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, transparent 55%, rgba(22,35,26,0.45))' }}
        />
      </motion.div>
    </section>
  )
}
