import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { TREATMENTS } from '../content'
import { fadeUp, staggerContainer, slideInLeft, slideInRight } from '../lib/animations'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import treatmentsImg from '../assets/treatments.png'

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
        {treatmentsImg && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="rounded-3xl overflow-hidden mb-12 aspect-[21/6]"
          >
            <img
              src={treatmentsImg}
              alt="Tratamientos QUEVI"
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}

        {/* Two-column accordion */}
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
                    <li
                      key={item.name}
                      className="group flex items-start justify-between gap-4 p-4 rounded-2xl bg-cream-200 hover:bg-brand-50 border border-transparent hover:border-brand-200 transition-all duration-200 cursor-pointer"
                    >
                      <div className="flex flex-col gap-1">
                        <span className="font-semibold text-carbon-800 group-hover:text-brand-700 transition-colors text-sm">
                          {item.name}
                        </span>
                        <span className="text-xs text-carbon-400 leading-relaxed">{item.desc}</span>
                      </div>
                      <ArrowUpRight
                        size={16}
                        className="text-cream-500 group-hover:text-brand-500 flex-shrink-0 mt-0.5 transition-colors"
                      />
                    </li>
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
