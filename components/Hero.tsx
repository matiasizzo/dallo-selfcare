'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Star, ChevronDown } from 'lucide-react'
import Image from 'next/image'
import { HERO } from '@/content'
import { fadeUp, fadeIn, staggerContainer } from '@/lib/animations'

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-gradient-to-br from-cream-200 via-cream-100 to-cream-300"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full bg-brand-100/30 blur-3xl" />
        <div className="absolute bottom-0 -left-40 w-[500px] h-[500px] rounded-full bg-terra-100/25 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-cream-300/60 blur-3xl" />
      </div>

      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233d6045' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6"
          >
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-100 text-brand-700 text-sm font-medium">
                <Star size={13} className="fill-brand-500 text-brand-500" />
                {HERO.badge}
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-carbon-900 leading-[1.05] tracking-tight text-balance"
            >
              {HERO.headline.split('\n').map((line, i) => (
                <span key={i} className={i === 1 ? 'text-brand-600' : ''}>
                  {line}
                  {i === 0 && <br />}
                </span>
              ))}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-lg text-carbon-500 max-w-lg leading-relaxed"
            >
              {HERO.subheadline}
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mt-2">
              <a
                href={HERO.cta1.href}
                className="group inline-flex items-center gap-2 px-6 py-3.5 bg-brand-600 hover:bg-brand-700 text-cream-50 font-medium rounded-full transition-all duration-200 shadow-lg shadow-brand-300/30 hover:-translate-y-0.5"
              >
                {HERO.cta1.label}
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href={HERO.cta2.href}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-cream-200 hover:bg-cream-100 text-carbon-800 font-medium rounded-full border border-cream-400 transition-all duration-200 hover:-translate-y-0.5"
              >
                {HERO.cta2.label}
              </a>
            </motion.div>

            <motion.div
              variants={fadeIn}
              className="flex flex-wrap gap-6 mt-4 pt-6 border-t border-cream-400"
            >
              {HERO.stats.map((s) => (
                <div key={s.label} className="flex flex-col">
                  <span className="text-2xl font-bold text-brand-700">{s.value}</span>
                  <span className="text-xs text-carbon-400 mt-0.5">{s.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden lg:block"
          >
            <div className="relative rounded-3xl overflow-hidden bg-brand-200 aspect-[4/5] shadow-2xl shadow-brand-900/20">
              <Image
                src="/images/hero.png"
                alt="QUEVI Wellness Clinic"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 0px, 50vw"
              />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="absolute top-6 left-6 bg-cream-200 rounded-2xl px-4 py-3 shadow-lg"
              >
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} className="fill-terra-500 text-terra-500" />
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-carbon-800">4.9 / 5</span>
                </div>
                <p className="text-[10px] text-carbon-400 mt-0.5">+2.000 pacientes</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75, duration: 0.5 }}
                className="absolute bottom-6 right-6 bg-cream-200 rounded-2xl px-4 py-3 shadow-lg"
              >
                <p className="text-xs text-carbon-400">Próxima disponibilidad</p>
                <p className="text-sm font-bold text-brand-700 mt-0.5">Esta semana</p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="absolute -right-8 top-1/3 bg-cream-200 rounded-2xl px-5 py-4 shadow-xl border border-cream-400 w-48"
            >
              <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center mb-2">
                <span className="text-brand-600 text-sm">✓</span>
              </div>
              <p className="text-xs font-semibold text-carbon-800">Consulta gratuita</p>
              <p className="text-[10px] text-carbon-400 mt-0.5">Sin compromiso</p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-carbon-400"
      >
        <span className="text-xs tracking-wider uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </motion.div>
    </section>
  )
}
