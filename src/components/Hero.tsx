'use client'

import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative w-full min-h-[88vh] grid grid-cols-1 md:grid-cols-2 overflow-hidden bg-bg">

      {/* Left: copy */}
      <div className="flex flex-col justify-center gap-7 px-[6vw] py-[8vh] order-2 md:order-1 relative z-10">
        <div className="reveal flex items-center gap-[14px] text-[11px] tracking-[0.32em] uppercase text-ink-soft">
          <span className="w-9 h-px bg-ink-soft inline-block flex-shrink-0" />
          Skin Longevity Science
        </div>

        <h1 className="reveal font-cormorant font-light leading-[0.98] tracking-[-0.015em] text-ink m-0"
          style={{ fontSize: 'clamp(48px, 6.5vw, 96px)' }}
          data-d="1">
          La alquimia <em style={{ fontStyle: 'italic', fontWeight: 300, color: '#6b3722' }}>se convierte</em><br />
          en ciencia de<br />
          longevidad.
        </h1>

        <p className="reveal text-[16px] leading-[1.6] max-w-[460px] text-ink-soft font-light" data-d="2">
          Fórmulas magistrales elaboradas bajo pedido, en pequeños lotes,
          para reprogramar la biología de tu piel desde el primer gesto.
        </p>

        <div className="reveal flex items-center gap-[14px] mt-2" data-d="3">
          <Link
            href="/productos"
            className="inline-flex items-center gap-[10px] px-7 py-[14px] text-[13px] tracking-[0.12em] uppercase border border-ink bg-ink text-paper rounded-full hover:bg-accent-deep hover:border-accent-deep transition-all duration-300"
          >
            Explorar la trilogía
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="transition-transform duration-300 group-hover:translate-x-1">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
          <Link
            href="/sobre"
            className="inline-flex items-center gap-[10px] px-7 py-[14px] text-[13px] tracking-[0.12em] uppercase border border-ink bg-transparent text-ink rounded-full hover:bg-ink hover:text-paper transition-all duration-300"
          >
            Nuestra filosofía
          </Link>
        </div>
      </div>

      {/* Right: image placeholder with gradient */}
      <div className="relative min-h-[50vh] md:min-h-0 overflow-hidden order-1 md:order-2">
        {/* Gradient placeholder — replace with <Image> when real hero photo is ready */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(at 30% 40%, #d4a98c 0%, transparent 55%), radial-gradient(at 70% 60%, #c98a6e 0%, transparent 55%), linear-gradient(135deg, #e9c8ad 0%, #b88565 100%)'
        }} />
        {/* Product tag overlay */}
        <div className="absolute top-10 right-10 bg-paper rounded-[6px] p-4 max-w-[220px] text-[12px] leading-[1.5] text-ink z-10 border-l-2 border-accent">
          <b className="font-cormorant font-[500] text-[15px] block mb-1 tracking-[0.02em]">D-Senolytic Serum</b>
          NMN + GHK-Cu · 20 mL. Recuperación celular avanzada para una piel visiblemente más densa.
        </div>
        {/* Vertical meta text */}
        <div className="absolute bottom-8 right-10 text-[11px] tracking-[0.24em] uppercase text-paper opacity-85 z-10"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
          Lanzamiento · 31 · Mayo · 2026
        </div>
      </div>
    </section>
  )
}
