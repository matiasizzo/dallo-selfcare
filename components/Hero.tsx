'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const EASE = [0.22, 1, 0.36, 1] as const

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden border-b border-cream-400"
      style={{ minHeight: 'clamp(540px, 85vh, 820px)' }}
    >
      {/* Full-bleed background image */}
      <Image
        src="/images/hero.png"
        alt="QUEVI Wellness Clinic"
        fill
        className="object-cover object-center"
        style={{ filter: 'saturate(0.88) contrast(1.04)' }}
        priority
        sizes="100vw"
      />

      {/* Left-to-right fade overlay — keeps text legible, fades out toward image */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(95deg, rgba(237,233,224,0.96) 0%, rgba(237,233,224,0.80) 34%, rgba(237,233,224,0.30) 60%, transparent 82%)',
        }}
      />

      {/* Mobile: bottom-up overlay so text on top of image is readable */}
      <div
        className="absolute inset-0 lg:hidden"
        style={{
          background:
            'linear-gradient(180deg, rgba(237,233,224,0.92) 0%, rgba(237,233,224,0.70) 55%, rgba(237,233,224,0.10) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-[2] h-full flex items-center">
        <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">
          <motion.div
            className="flex flex-col gap-5 lg:gap-[22px] py-20 sm:py-28 max-w-[520px]"
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
              style={{ fontSize: 'clamp(48px, 7vw, 100px)' }}
            >
              Tu rutina,{' '}
              <em className="not-italic font-normal text-brand-600">prescrita</em>.
              <br />No vendida.
            </h1>

            {/* Subline — short, clean */}
            <p className="text-[15px] sm:text-[17px] text-carbon-600 max-w-[400px] leading-[1.6]">
              Medicina estética de precisión en Estepona, Málaga.
            </p>

            {/* CTAs */}
            <div className="flex gap-3 flex-wrap pt-1">
              <a
                href="#diagnostico"
                className="group inline-flex items-center gap-2 px-7 py-3.5 bg-brand-600 text-cream-50 rounded-full font-medium text-[13px] tracking-[0.02em] shadow-brand transition-all duration-200 hover:bg-brand-700 hover:-translate-y-0.5 active:scale-[0.97] will-change-transform"
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
                className="inline-flex items-center gap-2 px-6 py-3.5 text-carbon-900 rounded-full font-medium text-[13px] tracking-[0.02em] border border-carbon-400 bg-transparent transition-all duration-200 hover:bg-cream-300 hover:-translate-y-0.5 active:scale-[0.97] will-change-transform"
                style={{ transitionTimingFunction: 'cubic-bezier(0.22,1,0.36,1)' }}
              >
                Ver la tienda
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
