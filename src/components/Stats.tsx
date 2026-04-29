import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { STATS } from '../content'
import { fadeUp, staggerContainer } from '../lib/animations'

function useCountUp(target: number, isActive: boolean, duration = 1800) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isActive) return
    const start = performance.now()
    const step = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [isActive, target, duration])

  return count
}

function StatItem({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const count = useCountUp(value, isInView)

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      className="flex flex-col items-center text-center gap-1"
    >
      <span className="text-4xl sm:text-5xl font-bold text-white">
        {count.toLocaleString('es-ES')}
        <span className="text-brand-200">{suffix}</span>
      </span>
      <span className="text-brand-100 text-sm font-medium">{label}</span>
    </motion.div>
  )
}

export default function Stats() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section className="py-24 bg-gradient-to-r from-brand-600 to-brand-800 relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
        >
          {STATS.map((s) => (
            <StatItem key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
