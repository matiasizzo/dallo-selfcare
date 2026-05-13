import Link from 'next/link'

const LINEAS = [
  { label: 'Línea Balance',     href: '/coleccion/balance',    gradient: 'linear-gradient(135deg, #d9bfa0 0%, #8a6a4d 100%)' },
  { label: 'Línea Energy',      href: '/coleccion/energy',     gradient: 'linear-gradient(160deg, #b89e7a 0%, #4f3a26 100%)' },
  { label: 'Línea Metabolism',  href: '/coleccion/metabolism', gradient: 'linear-gradient(135deg, #e6c9a4 0%, #b88a5c 100%)' },
  { label: 'Línea Protection',  href: '/coleccion/protection', gradient: 'linear-gradient(135deg, #c79a4a 0%, #6a4216 100%)' },
  { label: 'Línea Senolytic',   href: '/coleccion/senolytic',  gradient: 'linear-gradient(160deg, #d0a684 0%, #5a3a23 100%)' },
  { label: 'Todos los productos Dallo Skin', href: '/coleccion/skin', gradient: 'linear-gradient(135deg, #b78e6e 0%, #553b2e 100%)' },
]

export default function LineasGallery() {
  return (
    <section className="grid grid-cols-2 md:grid-cols-3 gap-3 p-3 bg-bg">
      {LINEAS.map(({ label, href, gradient }) => (
        <Link
          key={href}
          href={href}
          className="group relative overflow-hidden"
          style={{ aspectRatio: '4/3' }}
        >
          <div
            className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.04]"
            style={{ background: gradient }}
          />
          {/* Grain overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.15] mix-blend-overlay"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/><feColorMatrix values='0 0 0 0 0.2  0 0 0 0 0.15  0 0 0 0 0.1  0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
            }}
          />
          <div className="absolute inset-x-0 bottom-0 p-6 text-bg text-[15px] font-[500] tracking-[0.01em] text-center"
            style={{ background: 'linear-gradient(to top, rgba(43,32,23,0.55) 0%, transparent 100%)' }}>
            {label}
          </div>
        </Link>
      ))}
    </section>
  )
}
