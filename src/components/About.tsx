import { motion } from 'framer-motion'
import { CheckCircle2, ArrowRight } from 'lucide-react'
import { ABOUT } from '../content'
import { fadeUp, slideInLeft, staggerContainer } from '../lib/animations'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import aboutImg from '../assets/bioscan.png'

export default function About() {
  const { ref, isInView } = useScrollAnimation()

  return (
    <section id="about" className="py-28 bg-neutral-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — image + doctor card */}
          <motion.div
            ref={ref}
            variants={slideInLeft}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="relative"
          >
            {/* Main image area */}
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-brand-200 to-brand-400 aspect-[3/4] max-w-md mx-auto lg:mx-0">
              <img src={aboutImg} alt="QUEVI BIO-SCAN Diagnóstico" className="absolute inset-0 w-full h-full object-cover" />

              {/* Experience badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="absolute top-6 -right-4 bg-white rounded-2xl p-4 shadow-xl w-36"
              >
                <div className="text-3xl font-bold text-brand-700">10+</div>
                <div className="text-xs text-neutral-500 leading-tight mt-1">Años de experiencia médica</div>
              </motion.div>

              {/* Procedures badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.55, duration: 0.4 }}
                className="absolute bottom-6 -left-4 bg-brand-700 rounded-2xl p-4 shadow-xl text-white w-40"
              >
                <div className="text-3xl font-bold">2.000+</div>
                <div className="text-xs text-brand-200 leading-tight mt-1">Procedimientos realizados</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right — copy */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="flex flex-col gap-6"
          >
            <motion.span
              variants={fadeUp}
              className="inline-block px-4 py-1.5 rounded-full bg-brand-50 text-brand-700 text-sm font-medium w-fit"
            >
              {ABOUT.badge}
            </motion.span>

            <motion.h2
              variants={fadeUp}
              className="text-4xl sm:text-5xl font-bold text-neutral-900 leading-tight text-balance"
            >
              {ABOUT.headline.split('\n').map((line, i) => (
                <span key={i}>
                  {i === 1 ? <span className="text-brand-600">{line}</span> : line}
                  {i === 0 && <br />}
                </span>
              ))}
            </motion.h2>

            <motion.p variants={fadeUp} className="text-neutral-500 text-lg leading-relaxed">
              {ABOUT.description}
            </motion.p>

            {/* Features list */}
            <motion.ul variants={staggerContainer} className="flex flex-col gap-3 mt-2">
              {ABOUT.features.map((f) => (
                <motion.li
                  key={f}
                  variants={fadeUp}
                  className="flex items-start gap-3 text-neutral-700"
                >
                  <CheckCircle2 size={18} className="text-brand-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{f}</span>
                </motion.li>
              ))}
            </motion.ul>

            {/* Doctor card */}
            <motion.div
              variants={fadeUp}
              className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-neutral-100 shadow-sm mt-2"
            >
              <div className="w-14 h-14 rounded-full bg-brand-100 flex items-center justify-center flex-shrink-0">
                <span className="text-brand-600 text-xl font-serif">D</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-neutral-900">{ABOUT.doctor.name}</p>
                <p className="text-xs text-neutral-400 mt-0.5">{ABOUT.doctor.title}</p>
              </div>
            </motion.div>

            <motion.a
              variants={fadeUp}
              href="#contact"
              className="group inline-flex items-center gap-2 text-brand-600 font-medium hover:text-brand-700 transition-colors w-fit"
            >
              Conoce nuestro enfoque
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
