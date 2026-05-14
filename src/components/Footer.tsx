'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="w-full bg-brown text-bg mt-[60px]">

      {/* Top: newsletter + link cols */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-8 pt-[60px] pb-[50px] grid grid-cols-1 md:grid-cols-[1.8fr_1fr_1fr_1fr] gap-10 md:gap-[50px]">

        {/* Newsletter */}
        <div>
          <h4 className="text-[15px] font-[500] text-bg m-0 mb-[6px]">Sé parte de la comunidad Dall&apos;Ó</h4>
          <p className="text-[13px] m-0 mb-5" style={{ color: 'rgba(246,238,230,0.7)' }}>
            Enterate de novedades y lanzamientos.
          </p>
          <form onSubmit={e => e.preventDefault()} className="flex gap-2 max-w-[460px]">
            <input
              type="email"
              required
              placeholder="Tu dirección de correo"
              className="flex-1 min-w-0 bg-transparent border border-[rgba(246,238,230,0.4)] rounded-full px-5 py-3 text-[13px] text-bg placeholder:text-[rgba(246,238,230,0.45)] outline-none focus:border-bg transition-colors"
            />
            <button
              type="submit"
              className="bg-bg text-brown border border-bg rounded-full px-5 py-3 text-[13px] font-[500] hover:bg-transparent hover:text-bg transition-all duration-200 whitespace-nowrap flex-shrink-0"
            >
              Enviar
            </button>
          </form>
        </div>

        {/* Dallo Nutri */}
        <div>
          <h5 className="text-[13px] font-[500] text-bg m-0 mb-4 tracking-[0.05em] uppercase">Dallo Nutri</h5>
          <ul className="list-none p-0 m-0 flex flex-col gap-[10px]">
            <li>
              <Link href="/coleccion/nutri" className="text-[13px] transition-colors duration-200 hover:text-bg" style={{ color: 'rgba(246,238,230,0.72)' }}>
                Ver colección
              </Link>
            </li>
          </ul>
        </div>

        {/* Dallo Skin */}
        <div>
          <h5 className="text-[13px] font-[500] text-bg m-0 mb-4 tracking-[0.05em] uppercase">Dallo Skin</h5>
          <ul className="list-none p-0 m-0 flex flex-col gap-[10px]">
            <li>
              <Link href="/coleccion/skin" className="text-[13px] transition-colors duration-200 hover:text-bg" style={{ color: 'rgba(246,238,230,0.72)' }}>
                Ver colección
              </Link>
            </li>
          </ul>
        </div>

        {/* Sobre nosotros */}
        <div>
          <h5 className="text-[13px] font-[500] text-bg m-0 mb-4 tracking-[0.05em] uppercase">Nosotros</h5>
          <ul className="list-none p-0 m-0 flex flex-col gap-[10px]">
            <li>
              <Link href="/sobre" className="text-[13px] transition-colors duration-200 hover:text-bg" style={{ color: 'rgba(246,238,230,0.72)' }}>
                Filosofía
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Giant wordmark */}
      <div className="w-full overflow-hidden flex items-end justify-center pt-6 select-none px-4">
        <span
          className="font-cormorant font-[500] text-bg leading-[0.85] tracking-[0.04em] whitespace-nowrap"
          style={{ fontSize: 'clamp(52px, 18vw, 380px)' }}
        >
          DALL<span className="italic text-[0.7em] relative" style={{ top: '-0.08em' }}>&apos;</span>Ó
        </span>
      </div>

      {/* Bottom bar */}
      <div
        className="max-w-[1600px] mx-auto px-6 md:px-8 py-5 border-t flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] tracking-[0.02em]"
        style={{ borderColor: 'rgba(246,238,230,0.15)', color: 'rgba(246,238,230,0.55)' }}
      >
        <span>© {new Date().getFullYear()} DALL&apos;Ó SELFCARE · Skin Longevity Science</span>
        <div className="flex gap-[14px] text-bg">
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
