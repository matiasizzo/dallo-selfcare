'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const EASE = [0.22, 1, 0.36, 1] as const

export default function Hero() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 border-b border-cream-400 overflow-hidden">

      {/* Left — clean cream background, text only */}
      <motion.div
        className="flex flex-col justify-center gap-[22px] px-6 sm:px-10 lg:px-16 py-16 lg:py-[100px] order-2 lg:order-1"
        style={{ background: '#ede9e0', minHeight: 'clamp(480px, 65vh, 760px)' }}
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
          style={{ fontSize: 'clamp(44px, 5.2vw, 88px)', maxWidth: '13ch' }}
        >
          Tu rutina, <em className="not-italic font-normal text-brand-600">prescrita</em>.
          <br />No vendida.
        </h1>

        {/* Subheadline */}
        <p className="text-[16px] sm:text-[17px] text-carbon-500 max-w-[420px] leading-[1.65]">
          Una clínica de bienestar que cruza diagnóstico médico, terapia regenerativa y
          cosmética magistral de precisión — porque tu piel no necesita una novedad, necesita tu historia.
        </p>

        {/* CTAs */}
        <div className="flex gap-3 flex-wrap pt-1">
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

      {/* Right — full photo */}
      <motion.div
        className="relative h-72 sm:h-96 lg:h-auto order-1 lg:order-2"
        style={{ minHeight: 'clamp(300px, 50vw, 760px)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
      >
        <Image
          src="/images/hero.png"
          alt="QUEVI Wellness Clinic — arco y productos"
          fill
          className="object-cover object-center"
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </motion.div>

    </section>
  )
}
