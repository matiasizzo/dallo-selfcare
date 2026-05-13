'use client'

import Link from 'next/link'

export default function Hero() {
  return (
    <section
      className="w-full grid grid-cols-1 md:grid-cols-[1fr_1.25fr] min-h-[540px] relative"
      style={{ background: 'var(--color-tan, #b29d7e)' }}
    >
      {/* Left: copy */}
      <div className="flex flex-col justify-center gap-6 px-[60px] py-[70px] text-ink relative z-10 order-2 md:order-1">
        <h1
          className="reveal font-cormorant font-[400] leading-[1.05] tracking-[-0.005em] text-ink m-0"
          style={{ fontSize: 'clamp(40px, 4.6vw, 64px)' }}
        >
          Alchemy and<br />Longevity
        </h1>
        <p className="reveal text-[15px] text-ink-soft m-0 max-w-[360px]" data-d="1">
          Supplementing with science.
        </p>
        <Link
          href="/productos"
          className="reveal self-start mt-4 inline-flex items-center justify-center px-[26px] py-3 text-[13px] tracking-[0.02em] border border-ink text-ink rounded-full bg-transparent hover:bg-ink hover:text-bg transition-all duration-300"
          data-d="2"
        >
          Comprar ahora
        </Link>
      </div>

      {/* Right: gradient photo panel */}
      <div className="relative overflow-hidden min-h-[360px] md:min-h-0 order-1 md:order-2">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 35% 45%, #e7c39a 0%, transparent 50%), radial-gradient(ellipse at 70% 60%, #c08d63 0%, transparent 55%), linear-gradient(140deg, #d4a987 0%, #8c5d3d 60%, #5d3a23 100%)',
          }}
        />
        {/* Grain overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.18] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/><feColorMatrix values='0 0 0 0 0.2  0 0 0 0 0.15  0 0 0 0 0.1  0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          }}
        />
      </div>
    </section>
  )
}
