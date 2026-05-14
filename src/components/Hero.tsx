'use client'

import Image from 'next/image'
import Link from 'next/link'

const HERO_DESKTOP = 'https://niuaflxfiyafckvseruu.supabase.co/storage/v1/object/public/assets/hero-desktop.webp'
const HERO_MOBILE  = 'https://niuaflxfiyafckvseruu.supabase.co/storage/v1/object/public/assets/hero-mobile.webp'

const TAN = '#c4b49a'

export default function Hero() {
  return (
    <section className="w-full overflow-hidden">

      {/* ── DESKTOP / TABLET GRANDE: split layout ──
          Texto en columna izquierda con fondo sólido, imagen en columna derecha.
          Activado desde lg (1024px) para evitar el overlap en pantallas medias. */}
      <div
        className="hidden lg:flex min-h-[540px]"
        style={{ background: TAN }}
      >
        {/* Columna texto — fondo sólido explícito, no puede verse la imagen detrás */}
        <div
          className="flex flex-col justify-center gap-6 px-[60px] py-[70px] text-ink shrink-0"
          style={{ width: '45%', background: TAN }}
        >
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

        {/* Columna imagen — ocupa el resto, imagen contenida sin overflow */}
        <div className="relative flex-1 overflow-hidden">
          <Image
            src={HERO_DESKTOP}
            alt="Dall'Ó Selfcare"
            fill
            className="object-cover object-center"
            priority
            sizes="55vw"
          />
        </div>
      </div>

      {/* ── MÓVIL / TABLET PEQUEÑO: imagen full-screen con texto encima ──
          Visible hasta lg exclusive. */}
      <div className="lg:hidden relative" style={{ minHeight: '100svh' }}>
        <Image
          src={HERO_MOBILE}
          alt="Dall'Ó Selfcare"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        {/* Overlay para legibilidad */}
        <div className="absolute inset-0 bg-black/30" />

        <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 px-8 text-center">
          <h1
            className="font-cormorant font-[400] leading-[1.05] text-white m-0 mb-3"
            style={{ fontSize: 'clamp(36px, 10vw, 56px)' }}
          >
            Alchemy and<br />Longevity
          </h1>
          <p className="text-[14px] text-white/80 mb-8">
            Supplementing with science.
          </p>
          <Link
            href="/productos"
            className="inline-flex items-center justify-center px-[26px] py-3 text-[13px] tracking-[0.02em] border border-white text-white rounded-full hover:bg-white hover:text-cocoa-900 transition-all duration-300"
          >
            Shop now
          </Link>
        </div>
      </div>

    </section>
  )
}
