'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight, CalendarDays } from 'lucide-react'
import Link from 'next/link'
import { BLOG_POSTS } from '@/content'
import { fadeUp, staggerContainer } from '@/lib/animations'
import { useScrollAnimation } from '@/lib/useScrollAnimation'

// Product data for best-sellers section
const BEST_SELLERS = [
  { id: 'breset',  pillar: 'REPAIR', tipo: 'Sérum',             name: 'Bio-Reset PDRN 2%',   vol: '30 ml',     price: '82', was: '95', badge: 'best', stripe: '#c4876a', code: 'Q-PDRN-02' },
  { id: 'aura',    pillar: 'BOOST',  tipo: 'Crema',             name: 'Aura Vitamin Boost',   vol: '50 ml',     price: '68', was: null,  badge: 'new',  stripe: '#d49070', code: 'Q-AURA-15' },
  { id: 'shield',  pillar: 'SHIELD', tipo: 'Protector solar',   name: 'Shield SPF 50+ Daily', vol: '40 ml',     price: '54', was: null,  badge: 'lim',  stripe: '#5d8a52', code: 'Q-SPF-50' },
  { id: 'soul28',  pillar: 'RESET',  tipo: 'Ampollas',          name: 'Soul Reset 28d',        vol: '28 × 2 ml', price: '128', was: '150', badge: 'best', stripe: '#2c472f', code: 'Q-SOUL-28' },
]

const BADGE_CLASSES: Record<string, string> = {
  new:  'bg-brand-600 text-cream-100',
  best: 'bg-terra-500 text-white',
  lim:  'bg-carbon-900 text-cream-100',
}
const BADGE_LABELS: Record<string, string> = {
  new: 'Nuevo', best: 'Best-seller', lim: 'Edición limitada',
}

function PackSVG({ id, vol, stripe, pillar, name, code }: { id: string; vol: string; stripe: string; pillar: string; name: string; code: string }) {
  return (
    <svg className="w-[76%]" viewBox="0 0 420 320" xmlns="http://www.w3.org/2000/svg" style={{ transition: 'transform 0.5s cubic-bezier(0.22,1,0.36,1)' }}>
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
        <text x="78" y="262" fontFamily="Inter, sans-serif" fontSize="6" letterSpacing="1.6" fill="#7a6a52">{pillar} · {code}</text>
      </g>
    </svg>
  )
}

export default function Blog() {
  const { ref, isInView } = useScrollAnimation()

  return (
    <>
      {/* Best-sellers product section */}
      <section className="max-w-[1600px] mx-auto px-9 py-[90px]">
        <div className="flex items-end justify-between gap-10 mb-8 flex-wrap">
          <div className="flex flex-col gap-3 max-w-[720px]">
            <span className="flex items-center gap-[10px] text-[11px] tracking-[0.28em] uppercase text-carbon-400">
              <span className="inline-block w-6 h-px bg-carbon-400" />
              Best-sellers · Otoño 2026
            </span>
            <h2
              className="font-serif font-normal leading-[1.05] tracking-[-0.015em] m-0 text-carbon-900 text-balance"
              style={{ fontSize: 'clamp(30px, 3.6vw, 48px)' }}
            >
              Los rituales que tu piel <em className="italic text-brand-600">reconoce</em>.
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-[11px] tracking-[0.18em] uppercase text-carbon-900 pb-1 border-b border-carbon-900 inline-flex items-center gap-2 transition-all duration-300 hover:text-brand-700 hover:border-brand-700 hover:gap-[14px] shrink-0"
          >
            Ver toda la tienda
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17 17 7" /><path d="M7 7h10v10" />
            </svg>
          </Link>
        </div>

        <div className="grid gap-[14px]" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
          {BEST_SELLERS.map((p) => (
            <Link key={p.id} href="/shop" className="group flex flex-col cursor-pointer">
              <div className="relative overflow-hidden flex items-center justify-center bg-cream-300 group-hover:bg-cream-400 transition-colors duration-300" style={{ aspectRatio: '1/1' }}>
                {p.badge && (
                  <span className={`absolute top-[14px] left-[14px] z-[2] px-[11px] py-[5px] rounded-full text-[10px] tracking-[0.12em] uppercase font-semibold ${BADGE_CLASSES[p.badge]}`}>
                    {BADGE_LABELS[p.badge]}
                  </span>
                )}
                <span className="absolute top-[14px] right-[14px] z-[2] px-[11px] py-[5px] rounded-full text-[9px] tracking-[0.22em] font-bold text-carbon-900" style={{ background: 'rgba(245,242,236,0.85)', backdropFilter: 'blur(6px)' }}>
                  {p.pillar}
                </span>
                <div className="group-hover:-translate-y-1 transition-transform duration-500" style={{ transitionTimingFunction: 'cubic-bezier(0.22,1,0.36,1)' }}>
                  <PackSVG id={p.id} vol={p.vol} stripe={p.stripe} pillar={p.pillar} name={p.name} code={p.code} />
                </div>
                <button className="absolute bottom-4 left-4 right-4 bg-cream-100 text-carbon-900 rounded-full py-3 px-[18px] text-[12px] font-medium tracking-[0.04em] border border-cream-400 flex items-center justify-center gap-2 opacity-0 translate-y-[10px] group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-[350ms] hover:!bg-brand-600 hover:!text-cream-100 hover:!border-brand-600">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 5v14" /><path d="M5 12h14" />
                  </svg>
                  Añadir al carrito
                </button>
              </div>
              <div className="pt-4 pb-2 px-1 flex flex-col gap-1">
                <span className="text-[10px] tracking-[0.18em] uppercase text-carbon-400 font-medium">
                  {p.tipo}<span className="font-serif italic text-brand-700 tracking-[0.04em] font-normal text-[12px] ml-1 normal-case">by Dall&apos;Ó</span>
                </span>
                <h3 className="font-serif font-medium text-[17px] tracking-[-0.005em] text-carbon-900 m-0 leading-[1.2]">
                  {p.name}
                </h3>
                <div className="flex items-baseline justify-between mt-1.5">
                  <span className="font-serif font-medium text-[16px] text-carbon-900">
                    {p.price} €
                    {p.was && <span className="font-sans text-[12px] text-carbon-400 line-through ml-1.5">{p.was} €</span>}
                  </span>
                  <span className="text-[11px] text-carbon-400 tracking-[0.04em]">{p.vol}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Blog section */}
      <section id="blog" className="py-28 bg-cream-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={ref}
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14"
          >
            <div className="flex flex-col gap-3">
              <motion.span variants={fadeUp} className="inline-block px-4 py-1.5 rounded-full bg-brand-100 text-brand-700 text-sm font-medium w-fit">
                Blog & Recursos
              </motion.span>
              <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-bold text-carbon-900">
                Últimas novedades<br />
                <span className="text-brand-600">sobre tu piel</span>
              </motion.h2>
            </div>
            <motion.a
              variants={fadeUp}
              href="#blog"
              className="group inline-flex items-center gap-1.5 text-brand-600 font-medium hover:text-brand-700 transition-colors text-sm shrink-0"
            >
              Ver todos los artículos
              <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </motion.a>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {BLOG_POSTS.map((post, i) => (
              <BlogCard key={i} post={post} />
            ))}
          </motion.div>
        </div>
      </section>
    </>
  )
}

function BlogCard({ post }: { post: (typeof BLOG_POSTS)[0] }) {
  return (
    <motion.a
      href={post.href}
      variants={{
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
      }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group flex flex-col rounded-3xl overflow-hidden border border-cream-400 bg-cream-200 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-100/30 transition-all duration-300"
    >
      <div className="aspect-[16/9] bg-gradient-to-br from-brand-100 to-brand-200 flex items-center justify-center relative overflow-hidden">
        <div className="text-brand-300">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="M21 15l-5-5L5 21" />
          </svg>
        </div>
        <span className="absolute top-3 left-3 px-3 py-1 bg-cream-200/90 backdrop-blur-sm rounded-full text-xs font-medium text-brand-700">
          {post.category}
        </span>
      </div>
      <div className="flex flex-col gap-3 p-5 flex-1">
        <div className="flex items-center gap-1.5 text-carbon-400 text-xs">
          <CalendarDays size={12} />
          {post.date}
        </div>
        <h3 className="text-base font-semibold text-carbon-900 group-hover:text-brand-700 transition-colors leading-snug">
          {post.title}
        </h3>
        <p className="text-xs text-carbon-500 leading-relaxed line-clamp-2">{post.excerpt}</p>
        <div className="flex items-center gap-1 text-brand-600 text-xs font-medium mt-auto pt-2">
          Leer más
          <ArrowUpRight size={12} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </motion.a>
  )
}
