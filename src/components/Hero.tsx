'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className="w-full grid grid-cols-1 md:grid-cols-2 min-h-[88vh]">

      {/* Left: text */}
      <div className="flex flex-col justify-end px-10 py-16 lg:px-20 lg:py-24 bg-white order-2 md:order-1">
        <p className="text-[10px] tracking-[0.35em] uppercase text-text-muted mb-6">
          Alchemy and Longevity
        </p>
        <h1 className="font-cormorant text-6xl md:text-7xl lg:text-8xl font-light text-cocoa-900 leading-none tracking-wide mb-8">
          Longevidad<br />en salud
        </h1>
        <p className="text-sm text-text-muted leading-relaxed max-w-xs mb-12 font-light">
          Suplementación de precisión y cosmética de alta calidad para quienes entienden la ciencia del bienestar.
        </p>
        <div className="flex items-center gap-6">
          <Link
            href="/productos"
            className="text-[11px] tracking-[0.25em] uppercase border border-cocoa-900 text-cocoa-900 px-8 py-3.5 hover:bg-cocoa-900 hover:text-white transition-colors duration-300"
          >
            Comprar ahora
          </Link>
          <Link
            href="/sobre"
            className="text-[11px] tracking-[0.25em] uppercase text-text-muted hover:text-cocoa-900 transition-colors"
          >
            Nuestra filosofía
          </Link>
        </div>
      </div>

      {/* Right: image */}
      <div className="relative min-h-[50vh] md:min-h-0 overflow-hidden order-1 md:order-2">
        <Image
          src="https://images.unsplash.com/photo-1612817288484-6f916006741a?w=1200&q=90"
          alt="Dall'Ó Selfcare — Longevidad en salud"
          fill
          className="object-cover object-center"
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    </section>
  )
}
