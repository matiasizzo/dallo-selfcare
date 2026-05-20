'use client'

const ITEMS = [
  'Activos de Gado Biotec',
  'Longevidad es Salud',
  'Formulado bajo receta',
  'Barcelona · Málaga',
]

export default function AnnouncementBar() {
  return (
    <div className="w-full bg-cocoa-900 text-sand-100 py-2 overflow-hidden">
      <div
        className="flex whitespace-nowrap"
        style={{ animation: 'marquee 20s linear infinite' }}
      >
        {[0, 1].map((copy) => (
          <span key={copy} className="flex items-center">
            {ITEMS.map((text, i) => (
              <span key={i} className="flex items-center">
                <span className="text-xs tracking-[0.2em] uppercase font-sans font-light mx-8">
                  {text}
                </span>
                <span className="text-gold opacity-50 text-xs">·</span>
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  )
}
