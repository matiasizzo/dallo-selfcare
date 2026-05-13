'use client'

import Link from 'next/link'

function SocialIcon({ d, label }: { d: string; label: string }) {
  return (
    <a href="#" aria-label={label} className="opacity-70 hover:opacity-100 transition-opacity">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d={d} />
      </svg>
    </a>
  )
}

export default function Footer() {
  return (
    <footer className="w-full bg-brown text-bg mt-[60px]">

      {/* Top: newsletter + link cols */}
      <div className="max-w-[1600px] mx-auto px-8 py-[70px] grid grid-cols-1 md:grid-cols-[1.6fr_1fr_1fr] gap-[60px]">

        {/* Newsletter */}
        <div>
          <h4 className="text-[15px] font-[500] text-bg m-0 mb-[6px]">Faça parte da comunidade Dall&apos;Ó</h4>
          <p className="text-[13px] m-0 mb-5" style={{ color: 'rgba(246,238,230,0.7)' }}>
            Fique por dentro das novidades e lançamentos.
          </p>
          <form onSubmit={e => e.preventDefault()} className="flex gap-2 max-w-[460px]">
            <input
              type="email"
              required
              placeholder="Dirección de correo electrónico"
              className="flex-1 bg-transparent border border-[rgba(246,238,230,0.4)] rounded-full px-[22px] py-3 text-[13px] text-bg placeholder:text-[rgba(246,238,230,0.45)] outline-none focus:border-bg transition-colors"
            />
            <button
              type="submit"
              className="bg-bg text-brown border border-bg rounded-full px-[26px] py-3 text-[13px] font-[500] hover:bg-transparent hover:text-bg transition-all duration-250 whitespace-nowrap"
            >
              Enviar
            </button>
          </form>
        </div>

        {/* Dallo Nutri */}
        <div>
          <h5 className="text-[14px] font-[500] text-bg m-0 mb-4">Dallo Nutri</h5>
          <ul className="list-none p-0 m-0 flex flex-col gap-[10px]">
            {['Metabolism', 'Balance', 'Protection', 'Energy', 'Senolytic'].map(label => (
              <li key={label}>
                <Link href={`/coleccion/${label.toLowerCase()}`}
                  className="text-[13px] transition-colors duration-250"
                  style={{ color: 'rgba(246,238,230,0.78)' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#f6eee6')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(246,238,230,0.78)')}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Sobre */}
        <div>
          <h5 className="text-[14px] font-[500] text-bg m-0 mb-4">Sobre</h5>
          <ul className="list-none p-0 m-0 flex flex-col gap-[10px]">
            {[
              { label: 'Home', href: '/' },
              { label: 'Universo', href: '/sobre' },
              { label: "Dall'Ó Nutri", href: '/coleccion/nutri' },
              { label: "Dall'Ó Skin", href: '/coleccion/skin' },
              { label: 'Mi cuenta', href: '/cuenta' },
            ].map(({ label, href }) => (
              <li key={label}>
                <Link href={href}
                  className="text-[13px] transition-colors duration-250"
                  style={{ color: 'rgba(246,238,230,0.78)' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#f6eee6')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(246,238,230,0.78)')}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Giant wordmark */}
      <div className="max-w-[1600px] mx-auto overflow-hidden flex items-end justify-center pt-8 select-none">
        <span
          className="font-cormorant font-[500] text-bg leading-[0.85] tracking-[0.04em]"
          style={{ fontSize: 'clamp(150px, 25vw, 400px)' }}
        >
          DALL<span className="italic text-[0.7em] relative" style={{ top: '-0.08em' }}>&apos;</span>Ó
        </span>
      </div>

      {/* Bottom bar */}
      <div className="max-w-[1600px] mx-auto px-8 py-6 border-t flex items-center justify-between text-[11px] tracking-[0.02em]"
        style={{ borderColor: 'rgba(246,238,230,0.15)', color: 'rgba(246,238,230,0.55)' }}>
        <span>© {new Date().getFullYear()} DALL&apos;Ó SELFCARE · Skin Longevity Science</span>
        <div className="flex gap-[14px] text-bg">
          {/* Facebook */}
          <a href="#" aria-label="Facebook" className="opacity-70 hover:opacity-100 transition-opacity">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 9h3V6h-3a3 3 0 0 0-3 3v3H8v3h3v6h3v-6h3l1-3h-4V9z"/>
            </svg>
          </a>
          {/* Instagram */}
          <a href="#" aria-label="Instagram" className="opacity-70 hover:opacity-100 transition-opacity">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="5"/>
              <circle cx="12" cy="12" r="4"/>
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
            </svg>
          </a>
          {/* TikTok */}
          <a href="#" aria-label="TikTok" className="opacity-70 hover:opacity-100 transition-opacity">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 4c0 3 2 5 5 5v3a8 8 0 0 1-5-2v7a6 6 0 1 1-6-6v3a3 3 0 1 0 3 3V4h3z"/>
            </svg>
          </a>
          {/* YouTube */}
          <a href="#" aria-label="YouTube" className="opacity-70 hover:opacity-100 transition-opacity">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="6" width="18" height="12" rx="3"/>
              <path d="m10 9 5 3-5 3z" fill="currentColor"/>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  )
}
