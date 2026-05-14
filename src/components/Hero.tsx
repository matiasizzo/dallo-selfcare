'use client'

import Image from 'next/image'
import Link from 'next/link'

const HERO_DESKTOP = 'https://niuaflxfiyafckvseruu.supabase.co/storage/v1/object/public/assets/hero-desktop.webp'
const HERO_MOBILE  = 'https://niuaflxfiyafckvseruu.supabase.co/storage/v1/object/public/assets/hero-mobile.webp'

export default function Hero() {
  return (
    <section className="w-full relative">

      {/* ── DESKTOP: split layout, imagen derecha ── */}
      <div
        className="hidden md:grid grid-cols-[1fr_1.25fr] min-h-[540px]"
        style={{ background: '#b29d7e' }}
      >
        {/* Texto izquierda */}
        <div className="flex flex-col justify-center gap-6 px-[60px] py-[70px] text-ink relative z-10">
          <h1
            className="font-cormorant font-[400] leading-[1.05] tracking-[-0.005em] text-ink m-0"
            style={{ fontSize: 'clamp(40px, 4.6vw, 64px)' }}
          >
            Alchemy and<br />Longevity
          </h1>
          <p className="text-[15px] text-ink-soft m-0 max-w-[360px]">
            Supplementing with science.
          </p>
          <Link
            href="/productos"
            className="self-start mt-4 inline-flex items-center justify-center px-[26px] py-3 text-[13px] tracking-[0.02em] border border-ink text-ink rounded-full bg-transparent hover:bg-ink hover:text-bg transition-all duration-300"
          >
            Comprar ahora
          </Link>
        </div>

        {/* Imagen derecha — desktop */}
        <div className="relative overflow-hidden">
          <Image
            src={HERO_DESKTOP}
            alt="Dall'Ó Selfcare"
            fill
            className="object-cover object-center"
            priority
            sizes="(max-width: 1280px) 60vw, 800px"
          />
        </div>
      </div>

      {/* ── MÓVIL: imagen full-screen con texto encima ── */}
      <div className="md:hidden relative min-h-[100svh]">
        <Image
          src={HERO_MOBILE}
          alt="Dall'Ó Selfcare"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        {/* Overlay oscuro suave para legibilidad */}
        <div className="absolute inset-0 bg-black/25" />

        {/* Texto centrado sobre la imagen */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 px-8 text-center">
          <h1
            className="font-cormorant font-[400] leading-[1.05] tracking-[-0.005em] text-white m-0 mb-3"
            style={{ fontSize: 'clamp(36px, 10vw, 56px)' }}
          >
            Alchemy and<br />Longevity
          </h1>
          <p className="text-[14px] text-white/80 mb-8">
            Supplementing with science.
          </p>
          <Link
            href="/productos"
            className="inline-flex items-center justify-center px-[26px] py-3 text-[13px] tracking-[0.02em] border border-white text-white rounded-full bg-transparent hover:bg-white hover:text-cocoa-900 transition-all duration-300"
          >
            Shop now
          </Link>
        </div>
      </div>

    </section>
  )
}
