'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const EASE = [0.22, 1, 0.36, 1] as const

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden border-b border-cream-400"
      style={{ aspectRatio: '4/3', maxHeight: '90vh', minHeight: '480px' }}
    >
      {/* Full-bleed background image — anchored top so arch stays visible */}
      <Image
        src="/images/hero.png"
        alt="QUEVI Wellness Clinic"
        fill
        className="object-cover object-top"
        priority
        sizes="100vw"
      />

      {/* Left gradient — warm cream fade so text stays readable against light photo */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(100deg, rgba(237,233,224,0.95) 0%, rgba(237,233,224,0.82) 32%, rgba(237,233,224,0.38) 58%, transparent 78%)',
        }}
      />

      {/* Mobile: top fade */}
      <div
        className="absolute inset-0 lg:hidden"
        style={{
          background:
            'linear-gradient(180deg, rgba(237,233,224,0.94) 0%, rgba(237,233,224,0.72) 50%, rgba(237,233,224,0.08) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-[2] h-full flex items-center">
        <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">
          <motion.div
            className="flex flex-col gap-[22px] py-20 sm:py-28 max-w-[520px]"
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
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
            <p className="text-[17px] text-carbon-500 my-1.5 mb-3 max-w-[440px] leading-[1.6]">
              Una clínica de bienestar que cruza diagnóstico médico, terapia regenerativa y
              cosmética magistral de precisión — porque tu piel no necesita una novedad, necesita tu historia.
            </p>

            {/* CTAs */}
            <div className="flex gap-3 flex-wrap">
              <a
                href="#diagnostico"
                className="group inline-flex items-center gap-2 px-7 py-3 bg-brand-600 text-cream-50 rounded-full font-medium text-[13px] tracking-[0.02em] shadow-brand transition-all duration-200 hover:bg-brand-700 hover:-translate-y-0.5 active:scale-[0.97] will-change-transform"
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
                className="inline-flex items-center gap-2 px-[26px] py-3 text-carbon-900 rounded-full font-medium text-[13px] tracking-[0.02em] border border-cream-400 bg-transparent transition-all duration-200 hover:bg-cream-300 hover:-translate-y-0.5 active:scale-[0.97] will-change-transform"
                style={{ transitionTimingFunction: 'cubic-bezier(0.22,1,0.36,1)' }}
              >
                Ver toda la tienda
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
