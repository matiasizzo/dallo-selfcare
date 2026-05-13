'use client'

import { useState, useEffect } from 'react'

const MESSAGES = [
  "Envío gratuito en pedidos superiores a €120",
  "Fórmulas frescas · elaboradas bajo pedido",
  "Testado por médicos estéticos · libre de parabenos",
]

export default function AnnouncementBar() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI(v => (v + 1) % MESSAGES.length), 4200)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="w-full bg-promo text-promo-ink text-center py-[11px] px-6">
      <p className="text-[12px] tracking-[0.22em] uppercase font-light">
        <span className="opacity-60">—</span>
        <span className="mx-3">{MESSAGES[i]}</span>
        <span className="opacity-60">—</span>
      </p>
    </div>
  )
}
