'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
}
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}

// ── Product data ──
const PRODUCTS = [
  { id: 'breset',  pillar: 'repair', tipo: 'serum',     name: 'Bio-Reset PDRN 2%',         vol: '30 ml',     price: 82,  was: 95,  badge: 'best', stripe: '#c4876a', code: 'Q-PDRN-02' },
  { id: 'aura',    pillar: 'boost',  tipo: 'crema',     name: 'Aura Vitamin Boost',         vol: '50 ml',     price: 68,  was: null, badge: 'new',  stripe: '#d49070', code: 'Q-AURA-15' },
  { id: 'shield',  pillar: 'shield', tipo: 'protector', name: 'Shield SPF 50+ Daily',       vol: '40 ml',     price: 54,  was: null, badge: 'lim',  stripe: '#5d8a52', code: 'Q-SPF-50' },
  { id: 'soul28',  pillar: 'reset',  tipo: 'ampollas',  name: 'Soul Reset 28d',             vol: '28 × 2 ml', price: 128, was: 150, badge: 'best', stripe: '#2c472f', code: 'Q-SOUL-28' },
  { id: 'biopre',  pillar: 'shield', tipo: 'limpiador', name: 'Bio-Pre Cleanser 9.0',       vol: '200 ml',    price: 38,  was: null, badge: null,  stripe: '#83a886', code: 'Q-PRE-90' },
  { id: 'ngene',   pillar: 'repair', tipo: 'crema',     name: 'N-Gene Eye Contour',         vol: '15 ml',     price: 94,  was: null, badge: 'new',  stripe: '#c4876a', code: 'Q-NGEN-15' },
  { id: 'oligo',   pillar: 'boost',  tipo: 'tonico',    name: 'Oligo Mineral Tonic',        vol: '150 ml',    price: 42,  was: null, badge: null,  stripe: '#d49070', code: 'Q-OLIGO-1' },
  { id: 'soulnit', pillar: 'reset',  tipo: 'aceite',    name: 'Soul Night Oil',             vol: '30 ml',     price: 115, was: null, badge: 'lim',  stripe: '#16231a', code: 'Q-SOUL-NO' },
  { id: 'seffi',   pillar: 'repair', tipo: 'crema',     name: 'SEFFILLER Stem Cream',       vol: '50 ml',     price: 124, was: null, badge: null,  stripe: '#c4876a', code: 'Q-SEFF-50' },
  { id: 'led660',  pillar: 'boost',  tipo: 'tonico',    name: 'LED-660 Booster Mist',       vol: '100 ml',    price: 78,  was: null, badge: null,  stripe: '#d49070', code: 'Q-LED-66' },
  { id: 'cryosh',  pillar: 'shield', tipo: 'tonico',    name: 'CryoShield Antiox Mist',     vol: '120 ml',    price: 46,  was: null, badge: null,  stripe: '#5d8a52', code: 'Q-CRYO-12' },
  { id: 'soulcbd', pillar: 'reset',  tipo: 'balsamo',   name: 'Soul CBD Recovery Balm',     vol: '45 ml',     price: 88,  was: null, badge: null,  stripe: '#2c472f', code: 'Q-CBD-45' },
]

const TIPO_LABELS: Record<string, string> = {
  serum: 'Sérum', crema: 'Crema', protector: 'Protector solar',
  ampollas: 'Ampollas', limpiador: 'Limpiador', tonico: 'Tónico',
  aceite: 'Aceite', balsamo: 'Bálsamo',
}
const PILLAR_LABELS: Record<string, string> = {
  shield: 'SHIELD', repair: 'REPAIR', boost: 'BOOST', reset: 'RESET',
}
const BADGE_LABELS: Record<string, string> = {
  new: 'Nuevo', best: 'Best-seller', lim: 'Edición limitada',
}
const BADGE_CLASSES: Record<string, string> = {
  new: 'bg-brand-600 text-cream-100',
  best: 'bg-terra-500 text-white',
  lim: 'bg-carbon-900 text-cream-100',
}

const PILLAR_COUNTS: Record<string, number> = {
  shield: PRODUCTS.filter(p => p.pillar === 'shield').length,
  repair: PRODUCTS.filter(p => p.pillar === 'repair').length,
  boost: PRODUCTS.filter(p => p.pillar === 'boost').length,
  reset: PRODUCTS.filter(p => p.pillar === 'reset').length,
}

function PackSVG({ id, vol, stripe, pillar, name, code }: { id: string; vol: string; stripe: string; pillar: string; name: string; code: string }) {
  return (
    <svg className="w-[76%]" viewBox="0 0 420 320" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`top-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#ede9e0" />
        </linearGradient>
        <linearGradient id={`front-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fbf8f1" />
          <stop offset="1" stopColor="#ede9e0" />
        </linearGradient>
        <linearGradient id={`side-${id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#d6cdb8" />
          <stop offset="1" stopColor="#b9ae93" />
        </linearGradient>
        <filter id={`sh-${id}`} x="-15%" y="-15%" width="130%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="10" />
          <feOffset dx="0" dy="20" />
          <feComponentTransfer><feFuncA type="linear" slope="0.18" /></feComponentTransfer>
          <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <g filter={`url(#sh-${id})`}>
        <path d="M 320 105 L 380 75 L 380 235 L 320 265 Z" fill={`url(#side-${id})`} />
        <path d="M 60 105 L 320 105 L 380 75 L 120 75 Z" fill={`url(#top-${id})`} opacity="0.86" />
        <circle cx="345" cy="92" r="6" fill="none" stroke="#9a8c70" strokeWidth="0.6" />
        <text x="345" y="94.5" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="5.5" fill="#9a8c70">{vol.replace(/ /g, '')}</text>
        <path d="M 60 105 L 320 105 L 320 265 L 60 265 Z" fill={`url(#front-${id})`} stroke="#cfc4a8" strokeWidth="0.5" />
        <path d="M 300 105 L 320 105 L 320 265 L 300 265 Z" fill="#000" opacity="0.04" />
        <text x="190" y="148" textAnchor="middle" fontFamily="Playfair Display, serif" fontWeight="700" fontSize="26" fill="#1e1e1e" letterSpacing="4">QUEVI</text>
        <line x1="148" y1="158" x2="232" y2="158" stroke="#9a8c70" strokeWidth="0.5" />
        <text x="190" y="172" textAnchor="middle" fontFamily="Playfair Display, serif" fontStyle="italic" fontSize="11" fill="#2c472f" letterSpacing="2">by Dall&apos;Ó</text>
        <text x="190" y="188" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="6" letterSpacing="2.5" fill="#7a6a52">CLINICAL COSMETICS · BARCELONA</text>
        <rect x="78" y="230" width="76" height="6" fill={stripe} />
        <text x="78" y="252" fontFamily="Inter, sans-serif" fontWeight="600" fontSize="11" letterSpacing="2.5" fill="#1e1e1e">{name.toUpperCase().slice(0, 22)}</text>
        <text x="78" y="262" fontFamily="Inter, sans-serif" fontSize="6" letterSpacing="1.6" fill="#7a6a52">{PILLAR_LABELS[pillar]} · {code}</text>
        <line x1="320" y1="105" x2="320" y2="265" stroke="#000" strokeOpacity="0.06" strokeWidth="0.5" />
      </g>
    </svg>
  )
}

function priceFmt(n: number) {
  return n.toFixed(2).replace('.', ',').replace(/,00$/, '')
}

export default function ShopPage() {
  const [activePillar, setActivePillar] = useState<string>('all')
  const [activeFormat, setActiveFormat] = useState<string>('')
  const [activeSort, setActiveSort] = useState<string>('featured')

  const filteredProducts = useMemo(() => {
    let list = PRODUCTS.filter(p => {
      if (activePillar !== 'all' && p.pillar !== activePillar) return false
      if (activeFormat && p.tipo !== activeFormat) return false
      return true
    })
    if (activeSort === 'price-asc')  list = [...list].sort((a, b) => a.price - b.price)
    if (activeSort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price)
    if (activeSort === 'name')       list = [...list].sort((a, b) => a.name.localeCompare(b.name))
    return list
  }, [activePillar, activeFormat, activeSort])

  const hasFilters = activePillar !== 'all' || !!activeFormat

  function clearFilters() {
    setActivePillar('all')
    setActiveFormat('')
    setActiveSort('featured')
  }

  function handlePillarClick(pillar: string) {
    setActivePillar(prev => prev === pillar ? 'all' : pillar)
  }

  return (
    <>
      <Navbar />

      {/* Collection Hero */}
      <section
        className="relative overflow-hidden border-b border-cream-400"
        style={{
          background: '#ede9e0',
          padding: '80px 36px 78px',
        }}
      >
        {/* Radial glows */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(600px 400px at 85% 10%, rgba(213, 226, 214, 0.45), transparent 60%),
              radial-gradient(500px 400px at 10% 90%, rgba(245, 228, 219, 0.45), transparent 60%)
            `,
          }}
        />
        <div className="max-w-[1600px] mx-auto relative z-[2]">
          {/* Breadcrumb */}
          <nav className="flex gap-[10px] items-center text-[12px] tracking-[0.04em] text-carbon-500 mb-6">
            <Link href="/" className="text-carbon-500 border-b border-transparent hover:border-carbon-500 transition-colors">Inicio</Link>
            <span className="text-carbon-400">/</span>
            <Link href="/shop" className="text-carbon-500 border-b border-transparent hover:border-carbon-500 transition-colors">Tienda</Link>
            <span className="text-carbon-400">/</span>
            <span className="text-carbon-700">Todos los productos</span>
          </nav>

          <h1
            className="font-serif font-bold leading-[0.98] tracking-[-0.022em] m-0 mb-[22px] text-carbon-900 text-balance"
            style={{ fontSize: 'clamp(48px, 7vw, 96px)', maxWidth: '14ch' }}
          >
            Todos los productos <em className="italic font-normal text-brand-600">by Dall&apos;Ó</em>
          </h1>
          <p className="text-[17px] text-carbon-500 max-w-[620px] m-0 mb-8 leading-[1.6]">
            Cosmética médica formulada por <strong className="text-brand-700 font-semibold italic">DALL&apos;Ó SKIN</strong> y prescrita en clínica QUEVI.
            Doce fórmulas magistrales, preparadas bajo pedido en Barcelona — porque tu piel no necesita una novedad, necesita tu historia.
          </p>

          <div className="flex gap-12 pt-6 max-w-[620px]" style={{ borderTop: '1px solid #ddd8cc' }}>
            {[
              { v: '12', l: 'Fórmulas magistrales' },
              { v: '4', l: 'Pilares clínicos' },
              { v: '100%', l: 'Formulación médica' },
              { v: '4,9★', l: '2.000 reseñas' },
            ].map((s) => (
              <div key={s.l} className="flex flex-col gap-1">
                <span className="font-serif font-bold text-[26px] leading-none text-brand-700">
                  {s.v}
                </span>
                <span className="text-[11px] tracking-[0.14em] uppercase text-carbon-500">{s.l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stamp */}
        <div className="absolute right-9 bottom-9 z-[2] hidden lg:flex items-center gap-4">
          <div
            className="w-[92px] h-[92px] rounded-full flex flex-col items-center justify-center text-center leading-[1.1] relative overflow-hidden"
            style={{ border: '1px solid #83a886', background: '#f5f2ec', color: '#2c472f' }}
          >
            <div className="absolute inset-[6px] rounded-full" style={{ border: '1px dashed #83a886' }} />
            <span className="font-serif italic text-[11px] mb-0.5 relative">est.</span>
            <span className="font-serif font-bold text-[18px] tracking-[0.06em] relative">Q × D</span>
            <span className="text-[8px] tracking-[0.22em] uppercase mt-0.5 relative text-brand-500">2026</span>
          </div>
          <div className="max-w-[220px] text-[11px] text-carbon-500 leading-[1.55] tracking-[0.01em]">
            <strong className="block font-serif italic text-[14px] text-carbon-900 font-normal mb-1">
              Estética consciente.
            </strong>
            Una colaboración clínica entre{' '}
            <em style={{ color: '#2c472f' }}>QUEVI</em> y{' '}
            <em style={{ color: '#2c472f' }}>DALL&apos;Ó</em> — diagnóstico genómico y formulación magistral en un mismo ritual.
          </div>
        </div>
      </section>

      {/* Quick-pick pillar cards */}
      <section className="max-w-[1600px] mx-auto px-9 pt-[72px] pb-6">
        <div className="flex items-end justify-between gap-8 mb-7 flex-wrap">
          <h2
            className="font-serif font-normal leading-[1.1] tracking-[-0.01em] m-0 text-carbon-900"
            style={{ fontSize: 'clamp(26px, 2.6vw, 34px)' }}
          >
            ¿Por dónde <em className="italic text-brand-600 font-normal">empezar</em>?
          </h2>
          <p className="text-[14px] text-carbon-500 max-w-[420px] m-0 text-right leading-[1.55]">
            Cuatro pilares diseñados en consulta. Empieza por el que tu piel te pide hoy — o reserva un diagnóstico y deja que la decisión sea clínica.
          </p>
        </div>

        <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
          {[
            { pillar: 'shield', num: '01', eyebrow: 'SHIELD', name: '', nameEm: 'Bio-Protección', sub: '3 fórmulas · SPF, microbioma, antioxidación', bg: 'linear-gradient(160deg, #93b196 0%, #2c472f 100%)' },
            { pillar: 'repair', num: '02', eyebrow: 'REPAIR', name: '', nameEm: 'Regeneración', sub: '3 fórmulas · PDRN, péptidos, células madre', bg: 'linear-gradient(160deg, #d4a987 0%, #6b3722 100%)' },
            { pillar: 'boost',  num: '03', eyebrow: 'BOOST',  name: '', nameEm: 'Optimización', sub: '3 fórmulas · vitamina C, minerales, LED', bg: 'linear-gradient(160deg, #e0a98e 0%, #884e34 100%)' },
            { pillar: 'reset',  num: '04', eyebrow: 'RESET / SOUL', name: '', nameEm: 'Equilibrio', sub: '3 fórmulas · CBD, adaptógenos, melatonina', bg: 'linear-gradient(160deg, #4a5d4c 0%, #16231a 100%)' },
          ].map((qp) => {
            const isActive = activePillar === qp.pillar
            return (
              <button
                key={qp.pillar}
                onClick={() => handlePillarClick(qp.pillar)}
                className="relative overflow-hidden flex flex-col justify-between p-6 text-cream-100 cursor-pointer text-left border-0 rounded-[4px] group"
                style={{
                  aspectRatio: '4/5',
                  outline: isActive ? '2px solid #2c472f' : 'none',
                  outlineOffset: isActive ? '3px' : '0',
                  transition: 'transform 0.35s cubic-bezier(0.22,1,0.36,1)',
                }}
              >
                <div
                  className="absolute inset-0 group-hover:scale-[1.06] transition-transform duration-[800ms]"
                  style={{ background: qp.bg, transitionTimingFunction: 'cubic-bezier(0.22,1,0.36,1)' }}
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(22,35,26,0.7) 0%, rgba(22,35,26,0.15) 55%, transparent 100%)' }} />
                {/* Arrow button */}
                <span
                  className="absolute top-[22px] right-[22px] z-[2] w-8 h-8 rounded-full inline-flex items-center justify-center transition-all duration-300 group-hover:bg-cream-100 group-hover:rotate-[-45deg]"
                  style={{ background: 'rgba(245,242,236,0.12)', border: '1px solid rgba(245,242,236,0.28)', color: 'var(--tw-color-cream-100, #f9f7f3)' }}
                >
                  <svg className="w-3.5 h-3.5 group-hover:text-brand-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                  </svg>
                </span>
                <span className="relative z-[2] font-serif italic text-[14px] tracking-[0.02em]" style={{ color: 'rgba(245,242,236,0.78)' }}>
                  {qp.num}
                </span>
                <div className="relative z-[2] flex flex-col gap-1">
                  <span className="text-[10px] tracking-[0.24em] uppercase font-medium" style={{ color: 'rgba(245,242,236,0.78)' }}>
                    {qp.eyebrow}
                  </span>
                  <h3
                    className="font-serif font-normal leading-[1.05] m-0 mt-0.5 tracking-[-0.005em] text-cream-100"
                    style={{ fontSize: 'clamp(22px, 2.4vw, 30px)' }}
                  >
                    {qp.name}<em className="italic text-brand-200">{qp.nameEm}</em>
                  </h3>
                  <span className="text-[11px] mt-2 tracking-[0.06em]" style={{ color: 'rgba(245,242,236,0.78)' }}>
                    {qp.sub}
                  </span>
                </div>
              </button>
            )
          })}
        </div>
      </section>

      {/* Sticky filter bar */}
      <div
        className="sticky z-20 backdrop-blur-[10px] mt-16"
        style={{
          top: '73px',
          background: 'rgba(245,242,236,0.94)',
          borderTop: '1px solid #ddd8cc',
          borderBottom: '1px solid #ddd8cc',
        }}
      >
        <div className="max-w-[1600px] mx-auto px-9 py-[18px] flex items-center gap-6 flex-wrap">
          {/* Chips */}
          <div className="flex gap-2 flex-wrap flex-1 min-w-0">
            {[
              { filter: 'all', label: 'Todos', count: PRODUCTS.length },
              { filter: 'shield', label: 'SHIELD', count: PILLAR_COUNTS.shield, dot: '#5d8a52' },
              { filter: 'repair', label: 'REPAIR', count: PILLAR_COUNTS.repair, dot: '#c4876a' },
              { filter: 'boost',  label: 'BOOST',  count: PILLAR_COUNTS.boost, dot: '#d49070' },
              { filter: 'reset',  label: 'RESET / SOUL', count: PILLAR_COUNTS.reset, dot: '#2c472f' },
            ].map((chip) => {
              const isOn = activePillar === chip.filter
              return (
                <button
                  key={chip.filter}
                  onClick={() => setActivePillar(chip.filter)}
                  className="inline-flex items-center py-[9px] px-[18px] text-[13px] font-medium rounded-full cursor-pointer transition-all duration-200 whitespace-nowrap tracking-[0.01em]"
                  style={{
                    color: isOn ? '#f9f7f3' : '#1e1e1e',
                    background: isOn ? '#1e1e1e' : 'transparent',
                    border: `1px solid ${isOn ? '#1e1e1e' : '#ddd8cc'}`,
                  }}
                >
                  {chip.dot && (
                    <span
                      className="w-2 h-2 rounded-full mr-2 inline-block"
                      style={{ background: isOn ? '#f9f7f3' : chip.dot }}
                    />
                  )}
                  {chip.label}
                  <span className="ml-1.5 opacity-65">· {chip.count}</span>
                </button>
              )
            })}
          </div>

          {/* Controls */}
          <div className="flex gap-2.5 items-center">
            <select
              value={activeFormat}
              onChange={(e) => setActiveFormat(e.target.value)}
              className="appearance-none bg-transparent rounded-full py-[9px] text-[13px] font-sans text-carbon-900 cursor-pointer transition-colors duration-200 focus:outline-none"
              style={{
                border: '1px solid #ddd8cc',
                padding: '9px 36px 9px 18px',
                backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none' stroke='%231e1e1e' stroke-width='1.4'><path d='m1 1.5 5 5 5-5'/></svg>")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 14px center',
              }}
            >
              <option value="">Todos los formatos</option>
              <option value="serum">Sérum</option>
              <option value="crema">Crema</option>
              <option value="aceite">Aceite</option>
              <option value="protector">Protector</option>
              <option value="tonico">Tónico</option>
              <option value="limpiador">Limpiador</option>
              <option value="ampollas">Ampollas</option>
              <option value="balsamo">Bálsamo</option>
            </select>
            <select
              value={activeSort}
              onChange={(e) => setActiveSort(e.target.value)}
              className="appearance-none bg-transparent rounded-full py-[9px] text-[13px] font-sans text-carbon-900 cursor-pointer transition-colors duration-200 focus:outline-none"
              style={{
                border: '1px solid #ddd8cc',
                padding: '9px 36px 9px 18px',
                backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none' stroke='%231e1e1e' stroke-width='1.4'><path d='m1 1.5 5 5 5-5'/></svg>")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 14px center',
              }}
            >
              <option value="featured">Destacados</option>
              <option value="price-asc">Precio: menor a mayor</option>
              <option value="price-desc">Precio: mayor a menor</option>
              <option value="name">Nombre A — Z</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product grid */}
      <section className="max-w-[1600px] mx-auto px-9 pt-10 pb-20">
        {/* Summary */}
        <div className="flex justify-between items-center mb-6 pb-4" style={{ borderBottom: '1px solid #ddd8cc' }}>
          <span className="text-[13px] text-carbon-500">
            <strong className="text-carbon-900 font-semibold">{filteredProducts.length}</strong> productos
          </span>
          {hasFilters && (
            <button
              onClick={clearFilters}
              className="inline-flex items-center gap-1.5 text-[12px] tracking-[0.04em] text-carbon-900 pb-px border-b border-carbon-900 cursor-pointer hover:text-brand-700 hover:border-brand-700 transition-colors"
            >
              Limpiar filtros
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          )}
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid gap-[14px]"
          style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}
        >
          {filteredProducts.map((p) => (
            <motion.article
              key={p.id}
              variants={fadeUp}
              className="group/card flex flex-col cursor-pointer rounded-3xl overflow-hidden border border-cream-400 bg-cream-100 hover:border-brand-300 hover:shadow-lg hover:shadow-brand-100/40 transition-[border-color,box-shadow,transform] duration-200 will-change-transform"
              style={{ transitionTimingFunction: 'cubic-bezier(0.22,1,0.36,1)' }}
              whileHover={{ y: -4, transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] as const } }}
            >
              <div
                className="relative overflow-hidden flex items-center justify-center transition-colors duration-300 group-hover/card:bg-cream-300 rounded-t-3xl"
                style={{ aspectRatio: '1/1', background: '#ede9e0' }}
              >
                {p.badge && (
                  <span className={`absolute top-[14px] left-[14px] z-[2] px-[11px] py-[5px] rounded-full text-[10px] tracking-[0.12em] uppercase font-semibold ${BADGE_CLASSES[p.badge]}`}>
                    {BADGE_LABELS[p.badge]}
                  </span>
                )}
                <span
                  className="absolute top-[14px] right-[14px] z-[2] px-[11px] py-[5px] rounded-full text-[9px] tracking-[0.22em] font-bold text-carbon-900"
                  style={{ background: 'rgba(245,242,236,0.85)', backdropFilter: 'blur(6px)' }}
                >
                  {PILLAR_LABELS[p.pillar]}
                </span>
                <div className="group-hover/card:-translate-y-1.5 transition-transform duration-500 will-change-transform" style={{ transitionTimingFunction: 'cubic-bezier(0.22,1,0.36,1)' }}>
                  <PackSVG
                    id={p.id}
                    vol={p.vol}
                    stripe={p.stripe}
                    pillar={p.pillar}
                    name={p.name}
                    code={p.code}
                  />
                </div>
                <button
                  className="absolute bottom-4 left-4 right-4 bg-cream-100 text-carbon-900 border border-cream-400 rounded-full py-3 px-[18px] text-[12px] font-medium tracking-[0.04em] flex items-center justify-center gap-2 opacity-0 translate-y-[10px] group-hover/card:opacity-100 group-hover/card:translate-y-0 transition-all duration-[350ms] hover:bg-brand-600 hover:text-cream-100 hover:border-brand-600 will-change-transform"
                  style={{ transitionTimingFunction: 'cubic-bezier(0.22,1,0.36,1)' }}
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 5v14" /><path d="M5 12h14" />
                  </svg>
                  Añadir al carrito
                </button>
              </div>
              <div className="pt-4 pb-4 px-6 flex flex-col gap-1">
                <span className="text-[10px] tracking-[0.18em] uppercase text-carbon-400 font-medium">
                  {TIPO_LABELS[p.tipo]}
                  <span className="font-serif italic text-brand-700 tracking-[0.04em] font-normal text-[12px] ml-1 normal-case">by Dall&apos;Ó</span>
                </span>
                <h3 className="font-serif font-medium text-[17px] tracking-tight text-carbon-900 m-0 leading-[1.2]">
                  {p.name}
                </h3>
                <div className="flex items-baseline justify-between mt-1.5">
                  <span className="font-serif font-medium text-[16px] text-carbon-900">
                    {priceFmt(p.price)} €
                    {p.was && <span className="font-sans text-[12px] text-carbon-400 line-through ml-1.5">{priceFmt(p.was)} €</span>}
                  </span>
                  <span className="text-[11px] text-carbon-400 tracking-[0.04em]">{p.vol}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </section>

      {/* Editorial quote */}
      <section className="bg-cream-200 text-center" style={{ padding: '100px 6vw' }}>
        <blockquote
          className="font-serif font-normal italic leading-[1.35] text-carbon-900 text-balance mx-auto m-0"
          style={{ maxWidth: '880px', fontSize: 'clamp(24px, 2.6vw, 36px)' }}
        >
          &ldquo;No vendemos un producto. Vendemos una <em className="italic text-brand-600">conversación</em> entre tu piel, nuestra fórmula y el tiempo.&rdquo;
        </blockquote>
        <cite className="block mt-[26px] font-sans not-italic text-[11px] tracking-[0.22em] uppercase text-carbon-400">
          Dr. Dall&apos;Ó × Equipo médico QUEVI
        </cite>
      </section>

      {/* CTA strip */}
      <section
        id="diagnostico"
        className="relative overflow-hidden text-center"
        style={{ background: '#355539', color: '#f9f7f3', padding: '90px 36px' }}
      >
        <div className="absolute pointer-events-none" style={{ top: '-120px', left: '-120px', width: '500px', height: '500px', borderRadius: '50%', background: 'rgba(213,226,214,0.10)', filter: 'blur(80px)' }} />
        <div className="absolute pointer-events-none" style={{ bottom: '-120px', right: '-120px', width: '500px', height: '500px', borderRadius: '50%', background: 'rgba(196,135,106,0.18)', filter: 'blur(80px)' }} />

        <div className="max-w-[720px] mx-auto relative z-[2]">
          <span
            className="inline-block px-4 py-1.5 rounded-full text-[11px] tracking-[0.2em] uppercase text-cream-100 mb-[22px]"
            style={{ background: 'rgba(245,242,236,0.12)', border: '1px solid rgba(245,242,236,0.22)' }}
          >
            BIO-SCAN 360°
          </span>
          <h3
            className="font-serif font-normal leading-[1.05] tracking-[-0.015em] m-0 mb-[18px] text-cream-100 text-balance"
            style={{ fontSize: 'clamp(32px, 4vw, 52px)' }}
          >
            ¿No sabes por dónde <em className="italic text-brand-300">empezar</em>?
          </h3>
          <p className="text-[16px] text-brand-200 m-0 mx-auto mb-8 max-w-[520px] leading-[1.6]">
            Reserva un diagnóstico médico gratuito en clínica QUEVI. Cruzamos tu ADN, tu mapa mineral y tu lectura facial 3D — y diseñamos un protocolo DALL&apos;Ó hecho a la medida de tu historia.
          </p>
          <div className="inline-flex gap-3 flex-wrap justify-center">
            <Link
              href="/#booking"
              className="inline-flex items-center gap-2.5 px-7 py-[14px] text-[13px] tracking-[0.02em] font-medium rounded-full bg-cream-100 text-brand-700 border border-cream-100 transition-all duration-300 hover:bg-transparent hover:text-cream-100 hover:-translate-y-0.5"
            >
              Reservar diagnóstico — gratis
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/#booking"
              className="inline-flex items-center gap-2.5 px-7 py-[14px] text-[13px] tracking-[0.02em] font-medium rounded-full text-cream-100 transition-all duration-300 hover:-translate-y-0.5"
              style={{ background: 'transparent', border: '1px solid rgba(245,242,236,0.32)' }}
            >
              Hablar con un médico
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
