'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import { SERVICES } from '@/content'
import { fadeUp, staggerContainer, scaleIn } from '@/lib/animations'
import { useScrollAnimation } from '@/lib/useScrollAnimation'

const SERVICE_IMAGES: Record<string, string> = {
  shield: '/images/shield.png',
  repair: '/images/repair.png',
  boost:  '/images/boost.png',
  reset:  '/images/reset.jpeg',
}

export default function Services() {
  const { ref, isInView } = useScrollAnimation()

  return (
    <section id="services" className="py-28 bg-cream-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <motion.span
            variants={fadeUp}
            className="inline-block px-4 py-1.5 rounded-full bg-brand-100 text-brand-700 text-sm font-medium mb-4"
          >
            Nuestros protocolos
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="text-4xl sm:text-5xl font-bold text-carbon-900 mb-4 text-balance"
          >
            Tratamientos diseñados<br />
            <span className="text-brand-600">para tu piel</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-carbon-500 text-lg max-w-xl mx-auto"
          >
            Desde medicina estética avanzada hasta biohacking dérmico, tenemos la solución perfecta para cada necesidad.
          </motion.p>
        </motion.div>

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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-center mt-12"
        >
          <a
            href="#booking"
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-100 hover:bg-brand-200 text-brand-700 font-medium rounded-full transition-colors duration-200"
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
  const img = SERVICE_IMAGES[service.id]

  return (
    <motion.a
      href={service.href}
      variants={scaleIn}
      custom={index}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="group relative flex flex-col rounded-3xl overflow-hidden border border-cream-400 bg-cream-100 hover:border-brand-300 hover:shadow-xl hover:shadow-brand-100/40 transition-all duration-300 cursor-pointer"
    >
      {img && (
        <div className="aspect-[4/3] overflow-hidden bg-brand-100 relative">
          <Image
            src={img}
            alt={service.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </div>
      )}

      <div className="flex flex-col gap-3 p-6 flex-1">
        <div className="w-10 h-10 rounded-xl bg-brand-100 group-hover:bg-brand-200 flex items-center justify-center text-brand-600 text-xl transition-colors duration-200">
          {service.icon}
        </div>
        <h3 className="text-base font-semibold text-carbon-900 group-hover:text-brand-700 transition-colors leading-snug">
          {service.title}
        </h3>
        <p className="text-xs text-carbon-500 leading-relaxed">{service.description}</p>
        <div className="flex items-center gap-1 text-brand-600 text-xs font-medium mt-auto pt-2">
          Ver detalle
          <ArrowUpRight
            size={12}
            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </div>
      </div>
    </motion.a>
  )
}
