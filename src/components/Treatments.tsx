import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { TREATMENTS } from '../content'
import { fadeUp, staggerContainer, slideInLeft, slideInRight } from '../lib/animations'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

export default function Treatments() {
  const { ref, isInView } = useScrollAnimation()

  return (
    <section id="treatments" className="py-28 bg-white overflow-hidden">
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
            className="inline-block px-4 py-1.5 rounded-full bg-skin-100 text-skin-700 text-sm font-medium mb-4"
          >
            Áreas de especialización
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-4"
          >
            Tratamientos para{' '}
            <span className="text-brand-600">cada condición</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-neutral-500 text-lg max-w-lg mx-auto">
            Abordamos tanto condiciones médicas como estéticas con el mismo nivel de excelencia y personalización.
          </motion.p>
        </motion.div>

        {/* Two columns */}
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
                className="rounded-3xl border border-neutral-100 bg-neutral-50 p-8"
              >
                <h3 className="text-xl font-bold text-neutral-900 mb-6 pb-4 border-b border-neutral-200">
                  {group.category}
                </h3>
                <ul className="flex flex-col gap-4">
                  {group.items.map((item) => (
                    <li
                      key={item.name}
                      className="group flex items-start justify-between gap-4 p-4 rounded-2xl bg-white hover:bg-brand-50 border border-transparent hover:border-brand-100 transition-all duration-200 cursor-pointer"
                    >
                      <div className="flex flex-col gap-1">
                        <span className="font-semibold text-neutral-800 group-hover:text-brand-700 transition-colors text-sm">
                          {item.name}
                        </span>
                        <span className="text-xs text-neutral-400 leading-relaxed">{item.desc}</span>
                      </div>
                      <ArrowUpRight
                        size={16}
                        className="text-neutral-300 group-hover:text-brand-500 flex-shrink-0 mt-0.5 transition-colors"
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
