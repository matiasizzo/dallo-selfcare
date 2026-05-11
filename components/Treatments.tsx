'use client'
import Image from 'next/image'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Clock, Repeat2, CheckCircle2, AlertCircle } from 'lucide-react'
import { TREATMENTS, type Treatment } from '@/content'
import { fadeUp, staggerContainer, slideInLeft, slideInRight } from '@/lib/animations'
import { useScrollAnimation } from '@/lib/useScrollAnimation'


export default function Treatments() {
  const { ref, isInView } = useScrollAnimation()

  return (
    <section id="treatments" className="py-28 bg-cream-200 overflow-hidden">
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
          <motion.h2
            variants={fadeUp}
            className="text-4xl sm:text-5xl font-bold text-carbon-900 mb-4"
          >
            Tratamientos para{' '}
            <span className="text-brand-600">cada condición</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-carbon-500 text-lg max-w-lg mx-auto">
            Abordamos tanto condiciones médicas como estéticas con el mismo nivel de excelencia y personalización.
          </motion.p>
        </motion.div>

        {/* Image banner */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="rounded-3xl overflow-hidden mb-12 aspect-[21/6] relative"
          >
            <Image
              src="/images/treatments.png"
              alt="Tratamientos QUEVI"
              fill
              className="object-cover"
              sizes="100vw"
            />
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
                {detail.duration && (
                  <MetaTag icon={<Clock size={10} />} label={detail.duration} />
                )}
                {detail.sessions && (
                  <MetaTag icon={<Repeat2 size={10} />} label={detail.sessions} />
                )}
                {detail.durability && (
                  <MetaTag icon={<span className="text-[10px]">⏳</span>} label={detail.durability} />
                )}
                {detail.anesthesia && (
                  <MetaTag icon={<span className="text-[10px]">💉</span>} label={`Anestesia: ${detail.anesthesia}`} />
                )}
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
