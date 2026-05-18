'use client'

import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@/lib/animations'
import { useScrollAnimation } from '@/lib/useScrollAnimation'

const PILLARS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-brand-600">
        <path d="M9 3v6L4 19a2 2 0 0 0 2 3h12a2 2 0 0 0 2-3l-5-10V3" />
        <path d="M9 3h6M6.5 14h11" />
      </svg>
    ),
    label: 'Formulado bajo pedido',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-brand-600">
        <path d="M3 21c0-9 9-18 18-18-1 8-7 16-15 17-1 0-2 0-3 1z" />
        <path d="M3 21 13 11" />
      </svg>
    ),
    label: 'Activos de grado biotec',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-brand-600">
        <path d="M6 4v6a4 4 0 0 0 8 0V4" />
        <circle cx="18" cy="14" r="2" />
        <path d="M10 14v3a4 4 0 0 0 8 0v-1" />
      </svg>
    ),
    label: 'Avalado por médicos',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-brand-600">
        <circle cx="12" cy="12" r="9" />
        <path d="m8 12 3 3 5-6" />
      </svg>
    ),
    label: 'Sin parabenos · sin rellenos',
  },
]

export default function Services() {
  const { ref, isInView } = useScrollAnimation()

  return (
    <section id="pilares" className="bg-cream-200 py-28 border-b border-cream-400">
      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        <motion.span
          variants={fadeUp}
          className="inline-block text-[11px] tracking-[0.32em] uppercase text-carbon-400 mb-[26px]"
        >
          Dra. Quevi × Dr. Dall&apos;Ó · Medicina estética de precisión
        </motion.span>

        <motion.h2
          variants={fadeUp}
          className="font-serif font-normal leading-[1.05] tracking-[-0.012em] m-0 mb-[18px] text-carbon-900 text-balance"
          style={{ fontSize: 'clamp(36px, 4.4vw, 60px)' }}
        >
          Longevidad <em className="italic text-brand-600">externa</em>,<br />
          longevidad <em className="italic text-brand-600">interna</em>.
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="text-[15px] text-carbon-500 mx-auto mb-[60px] max-w-[560px] leading-[1.6]"
        >
          Cada fórmula nace en consulta. Cada protocolo se prepara cuando tú lo pides.
          La cosmética médica como prescripción — no como tendencia.
        </motion.p>

        <motion.ul
          variants={staggerContainer}
          className="list-none m-0 p-0 grid border-t border-cream-400"
          style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}
        >
          {PILLARS.map((p, i) => (
            <motion.li
              key={p.label}
              variants={fadeUp}
              className="py-10 px-[22px] pb-6 flex flex-col items-center gap-[18px] relative text-center group transition-all duration-200 hover:bg-cream-100 will-change-transform"
              style={{
                ...(i > 0 ? { borderLeft: '1px solid #ddd8cc' } : undefined),
                transitionTimingFunction: 'cubic-bezier(0.22,1,0.36,1)',
              }}
            >
              <span className="transition-transform duration-200 group-hover:-translate-y-0.5 will-change-transform" style={{ transitionTimingFunction: 'cubic-bezier(0.22,1,0.36,1)' }}>
                {p.icon}
              </span>
              <span className="text-[12px] tracking-[0.2em] uppercase text-carbon-900 font-medium leading-[1.5] max-w-[16ch]">
                {p.label}
              </span>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </section>
  )
}
