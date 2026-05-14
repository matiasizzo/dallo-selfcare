'use client'

import Link from 'next/link'

const HERO_DESKTOP = 'https://niuaflxfiyafckvseruu.supabase.co/storage/v1/object/public/assets/hero-desktop.webp'
const HERO_MOBILE  = 'https://niuaflxfiyafckvseruu.supabase.co/storage/v1/object/public/assets/hero-mobile.webp'

export default function Hero() {
  return (
    <section className="w-full overflow-hidden">

      {/* ── DESKTOP ≥ lg: imagen full-width, texto encima a la izquierda ── */}
      <div
        className="hidden lg:flex items-center min-h-[520px]"
        style={{
          backgroundImage: `url(${HERO_DESKTOP})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
        }}
      >
        <div className="flex flex-col gap-6 px-[60px] py-[80px] text-ink max-w-[500px]">
          <h1
            className="font-cormorant font-[400] leading-[1.05] tracking-[-0.005em] text-ink m-0"
            style={{ fontSize: 'clamp(40px, 4.6vw, 64px)' }}
          >
            Alchemy and<br />Longevity
          </h1>
          <p className="text-[15px] text-ink-soft m-0">
            Supplementing with science.
          </p>
          <Link
            href="/productos"
            className="self-start inline-flex items-center justify-center px-[26px] py-3 text-[13px] tracking-[0.02em] border border-ink text-ink rounded-full bg-transparent hover:bg-ink hover:text-bg transition-all duration-300"
          >
            Comprar ahora
          </Link>
        </div>
      </div>

      {/* ── MÓVIL < lg: imagen full-screen, texto centrado ── */}
      <div
        className="lg:hidden flex flex-col items-center justify-center text-center px-8"
        style={{
          minHeight: '100svh',
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.45)),
            url(${HERO_MOBILE})
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'right center',
        }}
      >
        <h1
          className="font-cormorant font-[400] leading-[1.05] text-white m-0 mb-4"
          style={{ fontSize: 'clamp(38px, 11vw, 58px)' }}
        >
          Alchemy and<br />Longevity
        </h1>
        <p className="text-[15px] text-white/80 mb-10">
          Supplementing with science.
        </p>
        <Link
          href="/productos"
          className="inline-flex items-center justify-center px-[30px] py-3.5 text-[13px] tracking-[0.02em] border border-white text-white rounded-full hover:bg-white hover:text-cocoa-900 transition-all duration-300"
        >
          Comprar ahora
        </Link>
      </div>

    </section>
  )
}
