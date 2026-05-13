'use client'

import Link from 'next/link'

function SerumBottleSVG({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 360 360" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-full" style={{ filter: 'drop-shadow(0 24px 40px rgba(58,42,30,0.18))' }}>
      <defs>
        <linearGradient id="g-skin" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#f4ead7"/>
          <stop offset="0.5" stopColor="#fbf6ea"/>
          <stop offset="1" stopColor="#e7dcc4"/>
        </linearGradient>
        <linearGradient id="d-skin" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2c2118"/>
          <stop offset="1" stopColor="#1a130c"/>
        </linearGradient>
      </defs>
      <rect x="148" y="60" width="64" height="20" rx="3" fill="url(#d-skin)"/>
      <rect x="155" y="78" width="50" height="34" rx="2" fill="url(#d-skin)"/>
      <path d="M 140 112 L 220 112 L 230 135 L 130 135 Z" fill="#1a130c"/>
      <rect x="118" y="135" width="124" height="180" rx="6" fill="url(#g-skin)" stroke="#c7bba3" strokeWidth="0.8"/>
      <rect x="128" y="145" width="10" height="160" rx="3" fill="#ffffff" opacity="0.4"/>
      <rect x="135" y="180" width="90" height="100" fill="#faf6ed" stroke="#d6cdb9" strokeWidth="0.5"/>
      <text x="180" y="205" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="14" fill="#2c2118" letterSpacing="2.5">DALL&apos;Ó</text>
      <line x1="150" y1="218" x2="210" y2="218" stroke={color} strokeWidth="2"/>
      <text x="180" y="240" textAnchor="middle" fontFamily="Manrope, sans-serif" fontWeight="600" fontSize="9" fill="#2c2118" letterSpacing="1.2">D-SENOLYTIC</text>
      <text x="180" y="258" textAnchor="middle" fontFamily="Manrope, sans-serif" fontSize="5.5" fill="#7a6a58" letterSpacing="1.5">FRESH FORMULA</text>
      <text x="180" y="268" textAnchor="middle" fontFamily="Manrope, sans-serif" fontSize="5.5" fill="#7a6a58" letterSpacing="1.5">20 ML</text>
    </svg>
  )
}

function PackBoxSVG({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-full" style={{ filter: 'drop-shadow(0 24px 40px rgba(58,42,30,0.18))' }}>
      <defs>
        <linearGradient id="bg-nutri" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fbf8f1"/>
          <stop offset="1" stopColor="#ece4d4"/>
        </linearGradient>
      </defs>
      <path d="M 50 80 L 310 70 L 320 90 L 60 100 Z" fill="#fff9ed" opacity="0.7"/>
      <rect x="50" y="80" width="270" height="130" rx="2" fill="url(#bg-nutri)" stroke="#d6cdb9" strokeWidth="0.6"/>
      <text x="185" y="115" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="22" fill="#2c2118" letterSpacing="4">DALL</text>
      <text x="227" y="111" fontFamily="Cormorant Garamond, serif" fontStyle="italic" fontSize="20" fill="#2c2118">&apos;</text>
      <text x="237" y="115" fontFamily="Cormorant Garamond, serif" fontSize="22" fill="#2c2118">Ó</text>
      <rect x="70" y="135" width="14" height="68" fill={color}/>
      <text x="100" y="158" fontFamily="Manrope, sans-serif" fontWeight="600" fontSize="13" fill="#2c2118" letterSpacing="1.5">D-VITBs</text>
      <text x="100" y="174" fontFamily="Manrope, sans-serif" fontSize="7.5" fill="#7a6a58" letterSpacing="1.8">EXCELLENCE</text>
      <text x="100" y="184" fontFamily="Manrope, sans-serif" fontSize="7.5" fill="#7a6a58" letterSpacing="1.8">IN LONGEVITY</text>
    </svg>
  )
}

export default function Collections() {
  return (
    <section className="w-full" style={{ paddingBottom: 0 }}>
      {/* Section header */}
      <div className="max-w-[1600px] mx-auto px-[6vw] pt-[110px] pb-6">
        <div className="flex items-end justify-between gap-10 pb-6 border-b border-line">
          <div>
            <p className="text-[11px] tracking-[0.3em] uppercase text-ink-mute mb-3">Dos rituales · una filosofía</p>
            <h2 className="font-cormorant font-light leading-[1] tracking-[-0.01em] text-ink m-0"
              style={{ fontSize: 'clamp(34px, 4.2vw, 56px)' }}>
              Cuidado <em style={{ fontStyle: 'italic', color: '#6b3722' }}>desde dentro</em><br />
              y desde fuera.
            </h2>
          </div>
          <div className="text-[13px] text-ink-soft max-w-[360px] text-right leading-[1.55] hidden md:block">
            Cada fórmula se prepara individualmente, firmada por el Dr. Dall&apos;Ó y enviada con la fecha de elaboración en el envase.
            <br />
            <Link href="/sobre" className="text-ink border-b border-ink pb-px whitespace-nowrap hover:text-accent transition-colors">
              Conocer el método →
            </Link>
          </div>
        </div>
      </div>

      {/* 2-col collection grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-line">
        {/* Dallo Skin */}
        <Link
          href="/coleccion/skin"
          className="group relative bg-bg-card hover:bg-paper transition-colors duration-[400ms] flex flex-col justify-end overflow-hidden px-[50px] py-[80px] min-h-[540px]"
        >
          {/* Floating art */}
          <div className="absolute top-1/2 right-[-8%] -translate-y-1/2 -rotate-6 w-[55%] max-w-[460px] opacity-85 pointer-events-none flex items-center justify-center">
            <SerumBottleSVG color="#a85a3a" />
          </div>
          <p className="relative z-10 text-[11px] tracking-[0.32em] uppercase text-ink-mute mb-3">Línea I · Topical</p>
          <h3 className="relative z-10 font-cormorant font-light leading-[1] tracking-[-0.01em] text-ink m-0 mb-4"
            style={{ fontSize: 'clamp(44px, 5vw, 72px)' }}>
            Dallo <em style={{ fontStyle: 'italic', color: '#6b3722' }}>Skin</em>
          </h3>
          <p className="relative z-10 text-[14px] max-w-[380px] text-ink-soft m-0 mb-7">
            Limpiadores, sérums y rituales nocturnos para blindar la microbiota y reprogramar la longevidad celular.
          </p>
          <span className="relative z-10 inline-flex items-center gap-[10px] text-[12px] tracking-[0.18em] uppercase text-ink self-start pb-[6px] border-b border-ink transition-[gap] duration-300 group-hover:gap-[18px]">
            Ver línea de piel
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>
        </Link>

        {/* Dallo Nutri */}
        <Link
          href="/coleccion/nutri"
          className="group relative bg-bg-card hover:bg-paper transition-colors duration-[400ms] flex flex-col justify-end overflow-hidden px-[50px] py-[80px] min-h-[540px]"
        >
          <div className="absolute top-1/2 right-[-8%] -translate-y-1/2 -rotate-6 w-[55%] max-w-[460px] opacity-85 pointer-events-none flex items-center justify-center">
            <PackBoxSVG color="#5fa05e" />
          </div>
          <p className="relative z-10 text-[11px] tracking-[0.32em] uppercase text-ink-mute mb-3">Línea II · Internal</p>
          <h3 className="relative z-10 font-cormorant font-light leading-[1] tracking-[-0.01em] text-ink m-0 mb-4"
            style={{ fontSize: 'clamp(44px, 5vw, 72px)' }}>
            Dallo <em style={{ fontStyle: 'italic', color: '#6b3722' }}>Nutri</em>
          </h3>
          <p className="relative z-10 text-[14px] max-w-[380px] text-ink-soft m-0 mb-7">
            Suplementación de precisión, formulada en cápsulas de liberación retardada para soportar el ciclo biológico.
          </p>
          <span className="relative z-10 inline-flex items-center gap-[10px] text-[12px] tracking-[0.18em] uppercase text-ink self-start pb-[6px] border-b border-ink transition-[gap] duration-300 group-hover:gap-[18px]">
            Ver línea nutri
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>
        </Link>
      </div>
    </section>
  )
}
