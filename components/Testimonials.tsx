'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { TESTIMONIALS } from '@/content'
import { fadeUp, staggerContainer } from '@/lib/animations'
import { useScrollAnimation } from '@/lib/useScrollAnimation'

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
    <section id="testimonials" className="py-28 bg-gradient-to-b from-cream-200 to-cream-300">
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
          <motion.h2
            variants={fadeUp}
            className="text-4xl sm:text-5xl font-bold text-carbon-900 mb-4"
          >
            Más de{' '}
            <span className="text-brand-600">2.000 pacientes</span>
            <br />confían en nosotros
          </motion.h2>
          <motion.div variants={fadeUp} className="flex items-center justify-center gap-2 mt-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} className="fill-terra-500 text-terra-500" />
              ))}
            </div>
            <span className="text-2xl font-bold text-carbon-900">4.9</span>
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
                <Quote size={36} className="text-brand-200 mb-6" />
                <p className="text-xl sm:text-2xl text-carbon-700 font-medium leading-relaxed mb-8">
                  "{t.text}"
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-carbon-900">{t.name}</p>
                    <p className="text-sm text-carbon-400 mt-0.5">{t.role}</p>
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} size={14} className="fill-terra-500 text-terra-500" />
                    ))}
                  </div>
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
              className={`text-left p-4 rounded-2xl border transition-all duration-200 ${
                i === current
                  ? 'border-brand-300 bg-brand-50 shadow-sm'
                  : 'border-cream-400 bg-cream-200 hover:border-brand-200'
              }`}
            >
              <div className="flex gap-0.5 mb-2">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} size={11} className="fill-terra-500 text-terra-500" />
                ))}
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
