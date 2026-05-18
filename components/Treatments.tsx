'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Clock, Repeat2, CheckCircle2, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { TREATMENTS, type Treatment } from '@/content'
import { fadeUp, staggerContainer, slideInLeft, slideInRight } from '@/lib/animations'
import { useScrollAnimation } from '@/lib/useScrollAnimation'

const LINEAS = [
  { label: 'Línea ', labelEm: 'Shield', href: '/shop#shield', bg: 'linear-gradient(160deg, #93b196 0%, #2c472f 100%)' },
  { label: 'Línea ', labelEm: 'Repair', href: '/shop#repair', bg: 'linear-gradient(160deg, #d4a987 0%, #6b3722 100%)' },
  { label: 'Línea ', labelEm: 'Boost', href: '/shop#boost', bg: 'linear-gradient(160deg, #e0a98e 0%, #884e34 100%)' },
  { label: 'Línea ', labelEm: 'Reset / Soul', href: '/shop#reset', bg: 'linear-gradient(160deg, #4a5d4c 0%, #16231a 100%)' },
  { label: 'Diagnóstico ', labelEm: 'BIO-SCAN 360°', href: '#diagnostico', bg: 'linear-gradient(160deg, #2c472f 0%, #16231a 100%)' },
  { label: 'Toda la ', labelEm: 'tienda', href: '/shop', bg: 'linear-gradient(160deg, #93b196 0%, #355539 100%)' },
]

export default function Treatments() {
  const { ref, isInView } = useScrollAnimation()

  return (
    <>
      {/* Lineas gallery */}
      <section
        className="grid gap-[14px] p-[14px] bg-cream-200"
        style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}
        id="treatments"
      >
        {LINEAS.map((l) => (
          <Link
            key={l.labelEm}
            href={l.href}
            className="relative overflow-hidden cursor-pointer rounded-[2px] group"
            style={{ aspectRatio: '4/3' }}
          >
            {/* Background */}
            <div
              className="absolute inset-0 group-hover:scale-[1.05] transition-transform duration-[800ms]"
              style={{ background: l.bg, transitionTimingFunction: 'cubic-bezier(0.22,1,0.36,1)' }}
            />
            {/* Overlay */}
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(22,35,26,0.55) 0%, rgba(22,35,26,0.05) 65%, transparent 100%)' }} />
            {/* Label */}
            <div className="absolute inset-x-0 bottom-0 z-[2] px-7 py-[26px] flex items-center justify-between gap-3 text-cream-100 font-serif text-[18px] font-normal tracking-[0.01em]">
              <span>
                {l.label}<em className="italic text-brand-200">{l.labelEm}</em>
              </span>
              <span
                className="w-8 h-8 rounded-full inline-flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-cream-100 group-hover:rotate-[-45deg]"
                style={{ background: 'rgba(245,242,236,0.16)', border: '1px solid rgba(245,242,236,0.32)', color: 'inherit' }}
              >
                <svg className="w-3.5 h-3.5 group-hover:text-brand-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                </svg>
              </span>
            </div>
          </Link>
        ))}
      </section>

      {/* Treatments detail accordion */}
      <section className="py-28 bg-cream-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            ref={ref}
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="text-center mb-16"
          >
            <motion.span
              variants={fadeUp}
              className="inline-block px-4 py-1.5 rounded-full bg-terra-100 text-terra-700 text-sm font-medium mb-4"
            >
              Áreas de especialización
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-bold text-carbon-900 mb-4">
              Tratamientos para{' '}
              <span className="text-brand-600">cada condición</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-carbon-500 text-lg max-w-lg mx-auto">
              Abordamos tanto condiciones médicas como estéticas con el mismo nivel de excelencia y personalización.
            </motion.p>
          </motion.div>

          {/* Two-column list */}
          <div className="grid lg:grid-cols-2 gap-8">
            {TREATMENTS.map((group, gi) => {
              const anim = gi === 0 ? slideInLeft : slideInRight
              return (
                <motion.div
                  key={group.category}
                  variants={anim}
                  initial="hidden"
                  animate={isInView ? 'visible' : 'hidden'}
                  transition={{ delay: gi * 0.1 }}
                  className="rounded-3xl border border-cream-400 bg-cream-300 p-8"
                >
                  <h3 className="text-xl font-bold text-carbon-900 mb-6 pb-4 border-b border-cream-400">
                    {group.category}
                  </h3>
                  <ul className="flex flex-col gap-3">
                    {group.items.map((item) => (
                      <TreatmentItem key={item.name} item={item} />
                    ))}
                  </ul>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}

function TreatmentItem({ item }: { item: Treatment }) {
  const [open, setOpen] = useState(false)
  const { detail } = item

  return (
    <li className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
      open
        ? 'border-brand-300 bg-cream-100 shadow-sm'
        : 'border-transparent bg-cream-200 hover:border-brand-200'
    }`}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-start justify-between gap-4 p-4 text-left"
        aria-expanded={open}
      >
        <div className="flex flex-col gap-0.5">
          <span className={`font-semibold text-sm transition-colors ${open ? 'text-brand-700' : 'text-carbon-800'}`}>
            {item.name}
          </span>
          <span className="text-xs text-carbon-400 leading-relaxed">{item.desc}</span>
        </div>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center mt-0.5 transition-colors ${
            open ? 'bg-brand-600 text-cream-50' : 'bg-cream-400 text-carbon-400'
          }`}
        >
          <ChevronDown size={13} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="detail"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="px-4 pb-4 flex flex-col gap-3 border-t border-cream-400 pt-3">
              {detail.application && (
                <p className="text-xs text-carbon-600 leading-relaxed">{detail.application}</p>
              )}
              {detail.benefits && detail.benefits.length > 0 && (
                <div>
                  <p className="text-[10px] font-semibold text-carbon-400 uppercase tracking-wider mb-2">Beneficios</p>
                  <ul className="flex flex-col gap-1">
                    {detail.benefits.map((b) => (
                      <li key={b} className="flex items-center gap-2 text-xs text-carbon-600">
                        <CheckCircle2 size={11} className="text-brand-500 flex-shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="flex flex-wrap gap-2">
                {detail.duration && <MetaTag icon={<Clock size={10} />} label={detail.duration} />}
                {detail.sessions && <MetaTag icon={<Repeat2 size={10} />} label={detail.sessions} />}
                {detail.durability && <MetaTag icon={<span className="text-[10px]">⏳</span>} label={detail.durability} />}
                {detail.anesthesia && <MetaTag icon={<span className="text-[10px]">💉</span>} label={`Anestesia: ${detail.anesthesia}`} />}
              </div>
              {detail.requirements && (
                <p className="text-xs text-carbon-500 leading-relaxed">
                  <span className="font-medium text-carbon-700">Requisitos: </span>
                  {detail.requirements}
                </p>
              )}
              {detail.aftercare && (
                <p className="text-xs text-carbon-500 leading-relaxed">
                  <span className="font-medium text-carbon-700">Post-tratamiento: </span>
                  {detail.aftercare}
                </p>
              )}
              {detail.note && (
                <div className="flex items-start gap-2 p-3 rounded-xl bg-terra-50 border border-terra-200">
                  <AlertCircle size={12} className="text-terra-500 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-terra-700 leading-relaxed">{detail.note}</p>
                </div>
              )}
              <a
                href="#booking"
                className="inline-flex items-center justify-center w-full py-2.5 bg-brand-600 hover:bg-brand-700 text-cream-50 text-xs font-medium rounded-full transition-colors duration-200 mt-1"
              >
                Consultar este tratamiento
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  )
}

function MetaTag({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cream-300 text-carbon-600 text-[10px] font-medium border border-cream-400">
      {icon}
      {label}
    </span>
  )
}
