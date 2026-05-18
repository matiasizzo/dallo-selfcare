'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { TESTIMONIALS } from '@/content'
import { fadeUp, staggerContainer } from '@/lib/animations'
import { useScrollAnimation } from '@/lib/useScrollAnimation'

function StarRating({ count = 5, size = 14 }: { count?: number; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(count)].map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill="#c4876a" stroke="#c4876a" strokeWidth="1">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  )
}

export default function Testimonials() {
  const { ref, isInView } = useScrollAnimation()
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)

  const next = useCallback(() => {
    setDirection(1)
    setCurrent((c) => (c + 1) % TESTIMONIALS.length)
  }, [])

  const prev = useCallback(() => {
    setDirection(-1)
    setCurrent((c) => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
  }, [])

  useEffect(() => {
    if (!isInView) return
    const id = setInterval(next, 5000)
    return () => clearInterval(id)
  }, [isInView, next])

  const variants = {
    enter:  (dir: number) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const } },
    exit:   (dir: number) => ({ opacity: 0, x: dir > 0 ? -60 : 60, transition: { duration: 0.3 } }),
  }

  const t = TESTIMONIALS[current]

  return (
    <section id="testimonials" className="py-28 bg-cream-200">
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
            Lo que dicen nuestros pacientes
          </motion.span>
          <motion.h2 variants={fadeUp} className="font-serif font-normal text-4xl sm:text-5xl leading-[1.05] tracking-tight text-carbon-900 mb-4">
            Los rituales que tu piel{' '}
            <em className="italic font-normal text-brand-600">reconoce</em>.
          </motion.h2>
          <motion.div variants={fadeUp} className="flex items-center justify-center gap-2 mt-4">
            <StarRating count={5} size={20} />
            <span className="text-2xl font-bold text-carbon-900 ml-2">4,9</span>
            <span className="text-carbon-400 text-sm">de 5 estrellas</span>
          </motion.div>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="relative max-w-3xl mx-auto"
        >
          <div className="relative overflow-hidden rounded-3xl bg-cream-100 border border-cream-400 shadow-xl shadow-carbon-900/5 min-h-[280px] flex items-center">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="p-10 sm:p-14 w-full"
              >
                {/* Quote mark */}
                <div className="mb-6">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#adc5af" strokeWidth="1.2">
                    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
                    <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
                  </svg>
                </div>
                <p className="text-xl sm:text-2xl text-carbon-700 font-medium leading-relaxed mb-8">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-carbon-900">{t.name}</p>
                    <p className="text-sm text-carbon-400 mt-0.5">{t.role}</p>
                  </div>
                  <StarRating count={t.rating} size={14} />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-cream-400 bg-cream-200 hover:bg-brand-50 hover:border-brand-200 flex items-center justify-center transition-colors"
              aria-label="Anterior"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i) }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current ? 'w-6 bg-brand-600' : 'w-2 bg-cream-500'
                  }`}
                  aria-label={`Testimonio ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-cream-400 bg-cream-200 hover:bg-brand-50 hover:border-brand-200 flex items-center justify-center transition-colors"
              aria-label="Siguiente"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </motion.div>

        {/* Mini cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-14"
        >
          {TESTIMONIALS.map((t, i) => (
            <button
              key={i}
              onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i) }}
              className={`text-left p-4 rounded-3xl border transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform ${
                i === current
                  ? 'border-brand-300 bg-cream-100 shadow-sm shadow-brand-100/30'
                  : 'border-cream-400 bg-cream-100 hover:border-brand-300 hover:shadow-lg hover:shadow-brand-100/40 hover:-translate-y-1'
              }`}
            >
              <div className="mb-2">
                <StarRating count={t.rating} size={11} />
              </div>
              <p className="text-xs text-carbon-600 line-clamp-2">{t.text}</p>
              <p className="text-xs font-semibold text-carbon-800 mt-2">{t.name}</p>
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
