'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const EASE = [0.22, 1, 0.36, 1] as const

export default function Hero() {
  return (
    <section
      className="grid min-h-[620px] relative border-b border-cream-400"
      style={{
        gridTemplateColumns: '1fr 1.1fr',
        background: '#ede9e0',
      }}
    >
      {/* Copy side */}
      <motion.div
        className="flex flex-col justify-center gap-[22px] px-16 py-[90px] text-carbon-900 relative z-[2]"
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
          style={{ fontSize: 'clamp(50px, 6.8vw, 96px)', maxWidth: '13ch' }}
        >
          Tu rutina, <em className="not-italic font-normal text-brand-600">prescrita</em>.
          <br />No vendida.
        </h1>

        {/* Subheadline */}
        <p className="text-[17px] text-carbon-500 my-1.5 mb-3 max-w-[440px] leading-[1.6]">
          Una clínica de bienestar que cruza diagnóstico médico, terapia regenerativa y
          cosmética magistral. Formulamos con{' '}
          <strong className="text-brand-700 font-semibold italic">DALL&apos;Ó SKIN</strong>
          {' '}y prescribimos en consulta — porque tu piel no necesita una novedad, necesita tu historia.
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

        {/* Stats */}
        <div
          className="flex gap-10 pt-[30px] mt-3 max-w-[520px]"
          style={{ borderTop: '1px solid #ddd8cc' }}
        >
          {[
            { v: '12', l: 'Fórmulas magistrales' },
            { v: '+2k', l: 'Pacientes activos' },
            { v: '100%', l: 'Formulación médica', suf: '' },
            { v: '4,9★', l: 'Reseñas verificadas' },
          ].map((s) => (
            <div key={s.l} className="flex flex-col gap-1">
              <span className="font-serif text-[26px] font-bold text-brand-700 leading-none">
                {s.v}
              </span>
              <span className="text-[10px] tracking-[0.18em] uppercase text-carbon-500">
                {s.l}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Image side */}
      <motion.div
        className="relative overflow-hidden bg-brand-700"
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
          sizes="55vw"
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, transparent 55%, rgba(22,35,26,0.45))' }}
        />

        {/* Stamp */}
        <div className="absolute right-8 bottom-8 z-[3] flex items-center gap-[14px]">
          <div
            className="w-24 h-24 rounded-full flex flex-col items-center justify-center text-cream-100 text-center leading-[1.1] relative"
            style={{
              border: '1px solid rgba(245,242,236,0.45)',
              background: 'rgba(245, 242, 236, 0.12)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <div
              className="absolute inset-[6px] rounded-full"
              style={{ border: '1px dashed rgba(245,242,236,0.35)' }}
            />
            <span className="font-serif italic text-[11px] mb-0.5">est.</span>
            <span className="font-serif font-bold text-[19px] tracking-[0.06em]">Q × D</span>
            <span className="text-[8px] tracking-[0.22em] uppercase mt-0.5 opacity-85">2026</span>
          </div>
          <div
            className="max-w-[220px] text-[11px] text-cream-100 leading-[1.55] tracking-[0.01em]"
            style={{ textShadow: '0 1px 6px rgba(0,0,0,0.4)' }}
          >
            <strong className="block font-serif italic text-[14px] text-cream-100 font-normal mb-1">
              Estética consciente.
            </strong>
            Una colaboración clínica entre QUEVI y DALL&apos;Ó — diagnóstico genómico y
            formulación magistral en un mismo ritual.
          </div>
        </div>
      </motion.div>
    </section>
  )
}
