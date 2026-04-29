import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { SERVICES } from '../content'
import { fadeUp, staggerContainer, scaleIn } from '../lib/animations'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

export default function Services() {
  const { ref, isInView } = useScrollAnimation()

  return (
    <section id="services" className="py-28 bg-white">
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
            className="inline-block px-4 py-1.5 rounded-full bg-brand-50 text-brand-700 text-sm font-medium mb-4"
          >
            Nuestros servicios
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-4 text-balance"
          >
            Tratamientos diseñados<br />
            <span className="text-brand-600">para tu piel</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-neutral-500 text-lg max-w-xl mx-auto"
          >
            Desde dermatología médica hasta estética avanzada, tenemos la solución perfecta para cada necesidad.
          </motion.p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-center mt-12"
        >
          <a
            href="#booking"
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-50 hover:bg-brand-100 text-brand-700 font-medium rounded-full transition-colors duration-200"
          >
            Reservar consulta gratuita
            <ArrowUpRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

function ServiceCard({
  service,
  index,
}: {
  service: (typeof SERVICES)[0]
  index: number
}) {
  return (
    <motion.a
      href={service.href}
      variants={scaleIn}
      custom={index}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="group relative flex flex-col gap-4 p-7 rounded-3xl border border-neutral-100 bg-white hover:border-brand-200 hover:shadow-xl hover:shadow-brand-100/50 transition-all duration-300 cursor-pointer"
    >
      {/* Icon */}
      <div className="w-12 h-12 rounded-2xl bg-brand-50 group-hover:bg-brand-100 flex items-center justify-center text-brand-600 text-2xl transition-colors duration-200">
        {service.icon}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 flex-1">
        <h3 className="text-lg font-semibold text-neutral-900 group-hover:text-brand-700 transition-colors">
          {service.title}
        </h3>
        <p className="text-sm text-neutral-500 leading-relaxed">{service.description}</p>
      </div>

      {/* Arrow */}
      <div className="flex items-center gap-1 text-brand-600 text-sm font-medium mt-auto">
        Ver detalle
        <ArrowUpRight
          size={14}
          className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </div>

      {/* Hover gradient border */}
      <div className="absolute inset-0 rounded-3xl ring-1 ring-brand-300/0 group-hover:ring-brand-300/60 transition-all duration-300 pointer-events-none" />
    </motion.a>
  )
}
