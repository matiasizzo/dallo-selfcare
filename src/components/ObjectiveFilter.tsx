import Link from 'next/link'
import Image from 'next/image'

const GOALS = [
  {
    id: 'anti',
    label: 'Anti-aging',
    sub: 'NMN · péptidos · longevidad celular',
    image: 'https://niuaflxfiyafckvseruu.supabase.co/storage/v1/object/public/assets/linea_aniage.webp',
    href: '/coleccion/skin',
  },
  {
    id: 'energia',
    label: 'Energía',
    sub: 'Complejo B · soporte mitocondrial',
    image: 'https://niuaflxfiyafckvseruu.supabase.co/storage/v1/object/public/assets/Linea_balance.webp',
    href: '/productos',
  },
  {
    id: 'meta',
    label: 'Metabolismo',
    sub: 'Tiroides · composición corporal',
    image: 'https://niuaflxfiyafckvseruu.supabase.co/storage/v1/object/public/assets/linea_detox.webp',
    href: '/productos',
  },
  {
    id: 'detox',
    label: 'Detox',
    sub: 'Hepático · glutatión · NAC',
    image: 'https://niuaflxfiyafckvseruu.supabase.co/storage/v1/object/public/assets/linea_salud.webp',
    href: '/productos',
  },
]

const GRAIN = "url(\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScyMDAnIGhlaWdodD0nMjAwJz48ZmlsdGVyIGlkPSduJz48ZmVUdXJidWxlbmNlIHR5cGU9J2ZyYWN0YWxOb2lzZScgYmFzZUZyZXF1ZW5jeT0nMC44NScgbnVtT2N0YXZlcz0nMicvPjxmZUNvbG9yTWF0cml4IHZhbHVlcz0nMCAwIDAgMCAwLjIgIDAgMCAwIDAgMC4xNSAgMCAwIDAgMCAwLjEgIDAgMCAwIDAuNiAwJy8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9JzEwMCUnIGhlaWdodD0nMTAwJScgZmlsdGVyPSd1cmwoI24pJy8+PC9zdmc+\")"

export default function ObjectiveFilter() {
  return (
    <section className="bg-bg py-[100px] px-8">

      {/* Header: 2 cols on desktop */}
      <div className="max-w-[1600px] mx-auto mb-[50px] grid grid-cols-1 md:grid-cols-2 gap-[60px] items-end">
        <div>
          <span className="block text-[11px] tracking-[0.32em] uppercase text-text-muted mb-4">
            — Por necesidad
          </span>
          <h2
            className="font-cormorant font-[400] text-ink leading-[1] m-0 tracking-[-0.015em]"
            style={{ fontSize: 'clamp(40px, 5vw, 72px)' }}
          >
            Encuentra tu <em className="italic text-[#553b2e]">objetivo</em>.
          </h2>
        </div>
        <p className="text-[15px] text-ink-soft leading-[1.6] m-0 max-w-[440px] pb-2">
          Cuatro caminos diseñados en consulta. Empieza por el que tu cuerpo te pide hoy.
        </p>
      </div>

      {/* Tiles grid */}
      <div className="max-w-[1600px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-[14px]">
        {GOALS.map((g, i) => (
          <Link
            key={g.id}
            href={g.href}
            className="group relative overflow-hidden flex flex-col justify-end p-7 text-[#f6eee6]"
            style={{ aspectRatio: '3/4' }}
          >
            {/* Image background (scales on hover) */}
            <div className="absolute inset-0 transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]">
              <Image
                src={g.image}
                alt={g.label}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>

            {/* Grain overlay */}
            <div
              className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay"
              style={{ backgroundImage: GRAIN }}
            />

            {/* Dark gradient overlay at bottom */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(to top, rgba(43,32,23,0.7) 0%, rgba(43,32,23,0.1) 55%, transparent 100%)' }}
            />

            {/* Number top-left */}
            <span
              className="absolute top-6 left-6 font-cormorant italic font-[400] text-[15px] z-10 tracking-[0.02em]"
              style={{ color: 'rgba(246,238,230,0.78)' }}
            >
              0{i + 1}
            </span>

            {/* Content bottom */}
            <div className="relative z-10 flex flex-col gap-[6px]">
              <h3
                className="font-cormorant font-[400] text-[#f6eee6] leading-[1.05] m-0 tracking-[-0.005em]"
                style={{ fontSize: 'clamp(26px, 2.6vw, 36px)' }}
              >
                {g.label}
              </h3>
              <p
                className="text-[13px] m-0 overflow-hidden max-h-0 opacity-0 group-hover:max-h-16 group-hover:opacity-100 transition-all duration-300 mt-0 group-hover:mt-1"
                style={{ color: 'rgba(246,238,230,0.82)' }}
              >
                {g.sub}
              </p>
              <span className="inline-flex items-center gap-2 group-hover:gap-[14px] text-[11px] tracking-[0.22em] uppercase text-[#f6eee6] mt-[14px] pb-1 border-b border-[rgba(246,238,230,0.5)] group-hover:border-[#f6eee6] self-start transition-all duration-300">
                Explorar
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                  <path d="M5 12h14M13 6l6 6-6 6"/>
                </svg>
              </span>
            </div>
          </Link>
        ))}
      </div>

    </section>
  )
}
