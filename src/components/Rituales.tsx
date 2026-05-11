import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Clock, Sparkles } from 'lucide-react'
import { RITUALES, SELLO_DALLO } from '../content'
import { fadeUp, staggerContainer, scaleIn } from '../lib/animations'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

export default function Rituales() {
  const { ref, isInView } = useScrollAnimation()
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <section id="rituales" className="py-28 bg-gradient-to-b from-cream-300 to-cream-200 overflow-hidden">
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
            Rituales de Firma QUEVI
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="text-4xl sm:text-5xl font-bold text-carbon-900 mb-4 text-balance"
          >
            Ingeniería cutánea{' '}
            <span className="text-brand-600">& Biohacking</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-carbon-500 text-lg max-w-2xl mx-auto">
            Experiencias de 60 a 90 minutos que combinan la pureza molecular de la línea
            Dall'O Skin con tecnologías de entrega transdérmica para cuidar tu piel y tu cuerpo desde el interior.
          </motion.p>
        </motion.div>

        {/* Ritual cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid sm:grid-cols-2 gap-6 mb-12"
        >
          {RITUALES.map((ritual) => {
            const isOpen = openId === ritual.id
            return (
              <motion.div
                key={ritual.id}
                variants={scaleIn}
                className={`rounded-3xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'border-brand-300 bg-cream-100 shadow-xl shadow-brand-100/30'
                    : 'border-cream-400 bg-cream-200 hover:border-brand-200 hover:shadow-lg'
                }`}
              >
                {/* Card header — always visible */}
                <button
                  onClick={() => setOpenId(isOpen ? null : ritual.id)}
                  className="w-full text-left p-7"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex flex-col gap-2 flex-1">
                      <span className="inline-block px-3 py-1 rounded-full bg-terra-100 text-terra-700 text-xs font-medium w-fit">
                        {ritual.badge}
                      </span>
                      <h3 className="text-xl font-bold text-carbon-900 font-serif leading-snug">
                        {ritual.name}
                      </h3>
                      <p className="text-sm text-brand-600 font-medium italic">{ritual.tagline}</p>
                      <p className="text-sm text-carbon-500 leading-relaxed mt-1">
                        {ritual.description}
                      </p>
                      <div className="flex items-center gap-2 mt-2 text-carbon-400 text-xs">
                        <Clock size={12} />
                        <span>{ritual.duration}</span>
                        {ritual.price && (
                          <>
                            <span className="text-cream-500">·</span>
                            <span className="text-terra-600 font-medium">{ritual.price}</span>
                          </>
                        )}
                      </div>
                    </div>

                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                      className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center mt-1 transition-colors ${
                        isOpen ? 'bg-brand-600 text-cream-50' : 'bg-cream-400 text-carbon-500'
                      }`}
                    >
                      <ChevronDown size={16} />
                    </motion.div>
                  </div>
                </button>

                {/* Expandable detail */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="detail"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="px-7 pb-7 flex flex-col gap-5 border-t border-cream-400 pt-5">
                        {/* Results */}
                        <div>
                          <p className="text-xs font-semibold text-carbon-400 uppercase tracking-wider mb-3">
                            Resultados
                          </p>
                          <ul className="flex flex-col gap-2">
                            {ritual.results.map((r) => (
                              <li key={r} className="flex items-start gap-2 text-sm text-carbon-700">
                                <Sparkles size={13} className="text-terra-400 mt-0.5 flex-shrink-0" />
                                {r}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Phases */}
                        <div>
                          <p className="text-xs font-semibold text-carbon-400 uppercase tracking-wider mb-3">
                            El ritual en 3 fases
                          </p>
                          <ol className="flex flex-col gap-3">
                            {ritual.phases.map((phase, i) => (
                              <li key={i} className="flex gap-3">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-100 text-brand-700 text-xs font-bold flex items-center justify-center mt-0.5">
                                  {i + 1}
                                </span>
                                <div>
                                  <p className="text-sm font-semibold text-carbon-800">{phase.title}</p>
                                  <p className="text-xs text-carbon-500 leading-relaxed mt-0.5">{phase.desc}</p>
                                </div>
                              </li>
                            ))}
                          </ol>
                        </div>

                        <a
                          href="#booking"
                          className="inline-flex items-center justify-center gap-2 w-full py-3 bg-brand-600 hover:bg-brand-700 text-cream-50 text-sm font-medium rounded-full transition-colors duration-200"
                        >
                          Reservar este ritual
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Sello Dall'O */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="rounded-3xl bg-gradient-to-br from-carbon-900 to-carbon-800 p-8 sm:p-10 text-cream-50 flex flex-col sm:flex-row gap-8 items-start"
        >
          <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-terra-500/20 border border-terra-400/30 flex items-center justify-center">
            <span className="text-terra-300 text-2xl font-serif">D</span>
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-bold font-serif">{SELLO_DALLO.title}</h3>
            <p className="text-carbon-300 text-sm leading-relaxed">{SELLO_DALLO.description}</p>
            <p className="text-carbon-400 text-sm leading-relaxed italic">{SELLO_DALLO.homecare}</p>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
