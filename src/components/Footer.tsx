'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="w-full bg-promo text-promo-ink">
      {/* Main grid */}
      <div className="max-w-[1600px] mx-auto px-[6vw] py-[80px] grid grid-cols-1 md:grid-cols-[1.3fr_1fr_1fr_1fr_1fr] gap-12 md:gap-8">

        {/* Col 1: Wordmark + brand text */}
        <div className="flex flex-col gap-[22px]">
          <span className="font-cormorant text-[26px] font-light text-promo-ink tracking-wide">
            DALL<span className="italic">&apos;</span>Ó
          </span>
          <p className="text-[13px] leading-[1.6] max-w-[280px] m-0" style={{ color: '#b39c80' }}>
            Skin Longevity Science.<br />
            Formulado en Barcelona — atendido en consulta — enviado al mundo.
          </p>
        </div>

        {/* Col 2: Tienda */}
        <div>
          <h5 className="text-[11px] tracking-[0.28em] uppercase text-promo-ink mb-5 font-[400]">Tienda</h5>
          <ul className="flex flex-col gap-3 list-none p-0 m-0">
            {[
              { label: 'Dallo Skin', href: '/coleccion/skin' },
              { label: 'Dallo Nutri', href: '/coleccion/nutri' },
              { label: 'Todos los productos', href: '/productos' },
            ].map(({ label, href }) => (
              <li key={href}>
                <Link href={href} className="text-[13px] transition-colors duration-250"
                  style={{ color: '#d8c5ad' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#faf6ed')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#d8c5ad')}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Clínica */}
        <div>
          <h5 className="text-[11px] tracking-[0.28em] uppercase text-promo-ink mb-5 font-[400]">Clínica</h5>
          <ul className="flex flex-col gap-3 list-none p-0 m-0">
            {[
              { label: 'Quevi Wellness', href: '/sobre' },
              { label: 'Reservar consulta', href: '/sobre' },
              { label: 'Protocolos', href: '/sobre' },
            ].map(({ label, href }) => (
              <li key={label}>
                <Link href={href} className="text-[13px] transition-colors duration-250"
                  style={{ color: '#d8c5ad' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#faf6ed')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#d8c5ad')}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4: Atención */}
        <div>
          <h5 className="text-[11px] tracking-[0.28em] uppercase text-promo-ink mb-5 font-[400]">Atención</h5>
          <ul className="flex flex-col gap-3 list-none p-0 m-0">
            {[
              { label: 'Envíos', href: '/sobre' },
              { label: 'Devoluciones', href: '/sobre' },
              { label: 'Preguntas frecuentes', href: '/sobre' },
              { label: 'Contacto', href: '/sobre' },
            ].map(({ label, href }) => (
              <li key={label}>
                <Link href={href} className="text-[13px] transition-colors duration-250"
                  style={{ color: '#d8c5ad' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#faf6ed')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#d8c5ad')}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 5: Compañía */}
        <div>
          <h5 className="text-[11px] tracking-[0.28em] uppercase text-promo-ink mb-5 font-[400]">Compañía</h5>
          <ul className="flex flex-col gap-3 list-none p-0 m-0">
            {[
              { label: 'Sobre DALL\'Ó', href: '/sobre' },
              { label: 'Mi cuenta', href: '/cuenta' },
              { label: 'Mis pedidos', href: '/cuenta/pedidos' },
              { label: 'Instagram', href: 'https://instagram.com' },
            ].map(({ label, href }) => (
              <li key={label}>
                <Link href={href} className="text-[13px] transition-colors duration-250"
                  style={{ color: '#d8c5ad' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#faf6ed')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#d8c5ad')}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-[1600px] mx-auto px-[6vw] py-5 border-t flex items-center justify-between text-[12px]"
        style={{ borderColor: '#5a4030', color: '#b39c80' }}>
        <span>© {new Date().getFullYear()} DALL&apos;Ó SELFCARE · Skin Longevity Science</span>
        <span className="hidden md:block">BARCELONA · BUENOS AIRES</span>
      </div>
    </footer>
  )
}
