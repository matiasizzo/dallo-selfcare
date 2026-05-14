'use client'

import Link from 'next/link'

const HERO_DESKTOP = 'https://niuaflxfiyafckvseruu.supabase.co/storage/v1/object/public/assets/hero-desktop.webp'
const HERO_MOBILE  = 'https://niuaflxfiyafckvseruu.supabase.co/storage/v1/object/public/assets/hero-mobile.webp'

// Color del fondo plano izquierda — debe coincidir visualmente con el borde izquierdo de hero-desktop.webp
const TAN = '#c4b49a'

export default function Hero() {
  return (
    <section className="w-full overflow-hidden">

      {/* ── DESKTOP ≥ lg (1024px): split layout ── */}
      <div className="hidden lg:flex min-h-[560px]">

        {/* Columna texto — fondo plano, totalmente opaco */}
        <div
          className="flex flex-col justify-center gap-6 px-[60px] py-[70px] text-ink shrink-0 z-10"
          style={{ width: '44%', backgroundColor: TAN }}
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

        {/* Columna imagen — CSS background para control de posición exacto */}
        <div
          className="flex-1"
          style={{
            backgroundImage: `url(${HERO_DESKTOP})`,
            backgroundSize: 'cover',
            backgroundPosition: 'left center',
          }}
        />
      </div>

      {/* ── MÓVIL / TABLET < lg: imagen full-screen con gradiente y texto centrado ── */}
      <div
        className="lg:hidden relative flex flex-col items-center justify-center text-center px-8"
        style={{
          minHeight: '100svh',
          backgroundImage: `
            linear-gradient(to bottom,
              rgba(0,0,0,0.05) 0%,
              rgba(0,0,0,0.15) 30%,
              rgba(0,0,0,0.50) 60%,
              rgba(0,0,0,0.65) 100%
            ),
            url(${HERO_MOBILE})
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
        }}
      >
        <h1
          className="font-cormorant font-[400] leading-[1.05] text-white m-0 mb-4"
          style={{ fontSize: 'clamp(38px, 11vw, 58px)' }}
        >
          Alchemy and<br />Longevity
        </h1>
        <p className="text-[15px] text-white/80 mb-10 max-w-xs">
          Supplementing with science.
        </p>
        <Link
          href="/productos"
          className="inline-flex items-center justify-center px-[30px] py-3.5 text-[13px] tracking-[0.02em] border border-white text-white rounded-full bg-transparent hover:bg-white hover:text-cocoa-900 transition-all duration-300"
        >
          Comprar ahora
        </Link>
      </div>

    </section>
  )
}
