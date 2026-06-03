'use client'

import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@/lib/animations'
import { useScrollAnimation } from '@/lib/useScrollAnimation'

const PILLARS = [
  {
    num: '01',
    pillar: 'SHIELD',
    title: 'Bio-Protección',
    desc: 'SPF inteligente, microbioma y antioxidación avanzada. La primera barrera clínica que escribe tu mejor mañana.',
    bg: 'linear-gradient(160deg, #93b196 0%, #2c472f 100%)',
    href: '#booking',
  },
  {
    num: '02',
    pillar: 'REPAIR',
    title: 'Regeneración',
    desc: 'PDRN, péptidos biomiméticos y células madre vegetales. Reparación celular medible desde la 4ª semana.',
    bg: 'linear-gradient(160deg, #d4a987 0%, #6b3722 100%)',
    href: '#booking',
  },
  {
    num: '03',
    pillar: 'BOOST',
    title: 'Optimización',
    desc: 'Vitamina C estabilizada, oligoelementos y terapia LED. La piel que respira, refleja luz y recobra densidad.',
    bg: 'linear-gradient(160deg, #e0a98e 0%, #884e34 100%)',
    href: '#booking',
  },
  {
    num: '04',
    pillar: 'RESET / SOUL',
    title: 'Equilibrio',
    desc: 'CBD tópico, adaptógenos y melatonina. Apagamos el cortisol cutáneo para que la piel descanse de verdad.',
    bg: 'linear-gradient(160deg, #4a5d4c 0%, #16231a 100%)',
    href: '#booking',
  },
]

export default function Treatments() {
  const { ref, isInView } = useScrollAnimation()

  return (
    <section id="treatments" className="bg-cream-200 py-24">
      <div ref={ref} className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-9">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14"
        >
          <div>
            <motion.span variants={fadeUp} className="text-[11px] tracking-[0.32em] uppercase text-carbon-400 block mb-4">
              — Protocolos clínicos
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="font-serif font-normal leading-[1] tracking-[-0.018em] m-0 text-carbon-900"
              style={{ fontSize: 'clamp(38px, 4.8vw, 68px)' }}
            >
              Los 4 <em className="italic text-brand-600">pilares</em> del tratamiento.
            </motion.h2>
          </div>
          <motion.div variants={fadeUp}>
            <a
              href="#booking"
              className="inline-flex items-center gap-2 px-7 py-3 bg-brand-600 text-cream-50 rounded-full font-medium text-[13px] tracking-[0.02em] transition-all duration-200 hover:bg-brand-700 hover:-translate-y-0.5 active:scale-[0.97] will-change-transform whitespace-nowrap"
              style={{ transitionTimingFunction: 'cubic-bezier(0.22,1,0.36,1)' }}
            >
              Reservar diagnóstico
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
              </svg>
            </a>
          </motion.div>
        </motion.div>

        {/* 4 cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid gap-[14px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        >
          {PILLARS.map((p) => (
            <motion.a
              key={p.pillar}
              variants={fadeUp}
              href={p.href}
              className="relative overflow-hidden flex flex-col justify-between rounded-[4px] text-cream-100 cursor-pointer group will-change-transform"
              style={{
                minHeight: 'clamp(320px, 36vw, 480px)',
                transition: 'transform 0.2s cubic-bezier(0.22,1,0.36,1)',
              }}
              whileHover={{ y: -5, transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] } }}
            >
              {/* Background */}
              <div
                className="absolute inset-0 group-hover:scale-[1.04] transition-transform duration-[800ms]"
                style={{ background: p.bg, transitionTimingFunction: 'cubic-bezier(0.22,1,0.36,1)' }}
              />
              {/* Overlay */}
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(22,35,26,0.72) 0%, rgba(22,35,26,0.1) 55%, transparent 100%)' }} />

              {/* Number */}
              <span className="relative z-[2] font-serif italic text-[13px] tracking-[0.04em] p-7 pb-0" style={{ color: 'rgba(245,242,236,0.6)' }}>
                {p.num}
              </span>

              {/* Content */}
              <div className="relative z-[2] flex flex-col gap-3 p-7">
                <span className="text-[10px] tracking-[0.26em] uppercase font-medium" style={{ color: 'rgba(245,242,236,0.7)' }}>
                  {p.pillar}
                </span>
                <h3 className="font-serif font-normal leading-[1.05] m-0 tracking-[-0.01em] text-cream-100" style={{ fontSize: 'clamp(28px, 2.8vw, 38px)' }}>
                  {p.title}
                </h3>
                <p className="text-[14px] leading-[1.6] m-0" style={{ color: 'rgba(245,242,236,0.8)' }}>
                  {p.desc}
                </p>
                <span
                  className="inline-flex items-center gap-[10px] text-[11px] tracking-[0.22em] uppercase text-cream-100 mt-2 pb-1 border-b self-start group-hover:gap-[16px] transition-all duration-300"
                  style={{ borderColor: 'rgba(245,242,236,0.45)' }}
                >
                  Reservar
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                  </svg>
                </span>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
