'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

const STATS_DATA = [
  { value: 12,  suffix: '',   label: 'Fórmulas magistrales' },
  { value: 2000, suffix: '+', label: 'Pacientes activos' },
  { value: 100, suffix: '%',  label: 'Formulación médica' },
  { value: 4,   suffix: ',9★', label: 'Reseñas verificadas', decimal: true },
]

function useCountUp(target: number, isActive: boolean, duration = 1800) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!isActive) return
    const start = performance.now()
    const step = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [isActive, target, duration])
  return count
}

function StatItem({ value, suffix, label, decimal }: { value: number; suffix: string; label: string; decimal?: boolean }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const count = useCountUp(value, isInView)

  // Special display for 4.9★
  const displayValue = decimal ? `4,${Math.floor((count / value) * 9)}` : count.toLocaleString('es-ES')
  const displaySuffix = decimal ? '★' : suffix

  return (
    <div ref={ref} className="flex flex-col items-center text-center gap-1">
      <span className="font-serif font-bold leading-none text-cream-100" style={{ fontSize: 'clamp(40px, 5vw, 64px)' }}>
        {displayValue}
        <span className="text-brand-300">{displaySuffix}</span>
      </span>
      <span className="text-brand-200 text-[13px] font-medium tracking-[0.06em]">{label}</span>
    </div>
  )
}

export default function Stats() {
  return (
    <section className="py-28 bg-brand-600 relative overflow-hidden">
      {/* Soft blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-brand-500/40 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-brand-700/50 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-16">
          {STATS_DATA.map((s) => (
            <StatItem key={s.label} value={s.value} suffix={s.suffix} label={s.label} decimal={s.decimal} />
          ))}
        </div>
      </div>
    </section>
  )
}
