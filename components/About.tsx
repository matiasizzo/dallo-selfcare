'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { fadeUp, staggerContainer } from '@/lib/animations'
import { useScrollAnimation } from '@/lib/useScrollAnimation'

export default function About() {
  const { ref, isInView } = useScrollAnimation()

  return (
    <>
      {/* Tone strip — two-cell grid */}
      <section
        className="grid gap-4 p-4 bg-cream-200"
        style={{ gridTemplateColumns: '1fr 1fr' }}
      >
        {/* Cream text cell */}
        <div
          className="min-h-[320px] bg-cream-100 border border-cream-400 flex flex-col items-center justify-center text-center gap-4 px-14 py-14"
        >
          <span className="text-[10px] tracking-[0.28em] uppercase text-brand-700 font-medium">
            Filosofía QUEVI
          </span>
          <h3
            className="font-serif font-normal leading-[1.1] tracking-[-0.015em] m-0 text-carbon-900 max-w-[14ch] text-balance"
            style={{ fontSize: 'clamp(28px, 3vw, 40px)' }}
          >
            La belleza es una <em className="italic text-brand-600">conversación</em>, no una receta.
          </h3>
          <p className="text-[14px] text-carbon-500 m-0 max-w-[360px] leading-[1.65]">
            Cruzamos genética, química clínica y lectura facial 3D para escribir tu protocolo.
            Después, DALL&apos;Ó lo formula. Después, el tiempo.
          </p>
          <a
            href="#editorial"
            className="mt-2 text-[11px] tracking-[0.2em] uppercase text-carbon-900 pb-1 border-b border-carbon-900 inline-flex items-center gap-2 transition-all duration-300 hover:gap-[14px] hover:text-brand-700 hover:border-brand-700"
          >
            Leer el manifiesto
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
            </svg>
          </a>
        </div>

        {/* Image cell */}
        <div className="min-h-[320px] relative overflow-hidden bg-brand-700">
          <Image
            src="/images/about.png"
            alt="Laboratorio Quevi"
            fill
            className="object-cover"
            style={{ filter: 'saturate(0.95)' }}
            sizes="50vw"
          />
          <span
            className="absolute left-7 bottom-6 z-[2] text-cream-100 font-serif italic text-[18px] tracking-[0.04em]"
            style={{ textShadow: '0 2px 8px rgba(0,0,0,0.4)' }}
          >
            Barcelona · Laboratorio clínico
          </span>
        </div>
      </section>

      {/* Objective / quick-pick pillars section */}
      <section id="about" className="bg-cream-200 py-[110px] px-9">
        <div ref={ref} className="max-w-[1600px] mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="grid gap-[60px] items-end mb-[50px]"
            style={{ gridTemplateColumns: '1fr 1fr' }}
          >
            <div>
              <motion.span variants={fadeUp} className="text-[11px] tracking-[0.32em] uppercase text-carbon-400 block mb-4">
                — Por pilar clínico
              </motion.span>
              <motion.h2
                variants={fadeUp}
                className="font-serif font-normal leading-[1] tracking-[-0.018em] m-0 text-carbon-900"
                style={{ fontSize: 'clamp(42px, 5.4vw, 76px)' }}
              >
                Encuentra tu <em className="italic text-brand-600">objetivo</em>.
              </motion.h2>
            </div>
            <motion.p variants={fadeUp} className="text-[15px] text-carbon-500 m-0 leading-[1.65] max-w-[460px] pb-2.5">
              Cuatro caminos diseñados en consulta. Empieza por el que tu cuerpo te pide hoy — o reserva un diagnóstico y deja que la decisión sea clínica.
            </motion.p>
          </motion.div>

          {/* 4-up quick-pick grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="grid gap-[14px]"
            style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}
          >
            {[
              {
                num: '01', pillar: 'SHIELD', name: 'Bio-', nameEm: 'Protección',
                desc: 'SPF, microbioma y antioxidación. La capa que escribe tu mejor mañana.',
                bg: 'linear-gradient(160deg, #93b196 0%, #2c472f 100%)',
                href: '/shop#shield',
              },
              {
                num: '02', pillar: 'REPAIR', name: '', nameEm: 'Regeneración',
                desc: 'PDRN, péptidos y células madre. Reparación celular desde la 4ª semana.',
                bg: 'linear-gradient(160deg, #d4a987 0%, #6b3722 100%)',
                href: '/shop#repair',
              },
              {
                num: '03', pillar: 'BOOST', name: '', nameEm: 'Optimización',
                desc: 'Vitamina C, minerales y LED. La piel que respira y devuelve la luz.',
                bg: 'linear-gradient(160deg, #e0a98e 0%, #884e34 100%)',
                href: '/shop#boost',
              },
              {
                num: '04', pillar: 'RESET / SOUL', name: '', nameEm: 'Equilibrio',
                desc: 'CBD, adaptógenos y melatonina. Apagamos el cortisol de la piel.',
                bg: 'linear-gradient(160deg, #4a5d4c 0%, #16231a 100%)',
                href: '/shop#reset',
              },
            ].map((qp) => (
              <motion.a
                key={qp.pillar}
                variants={fadeUp}
                href={qp.href}
                className="relative overflow-hidden flex flex-col justify-between p-7 text-cream-100 cursor-pointer text-left border-0 rounded-[2px] group"
                style={{ aspectRatio: '3/4', transition: 'transform 0.35s cubic-bezier(0.22,1,0.36,1)' }}
                whileHover={{ y: -4 }}
              >
                {/* Background */}
                <div
                  className="absolute inset-0 group-hover:scale-[1.06] transition-transform duration-[800ms]"
                  style={{ background: qp.bg, transitionTimingFunction: 'cubic-bezier(0.22,1,0.36,1)' }}
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(22,35,26,0.7) 0%, rgba(22,35,26,0.15) 55%, transparent 100%)' }} />

                <span className="relative z-[2] font-serif italic text-[14px] tracking-[0.02em]" style={{ color: 'rgba(245,242,236,0.78)' }}>
                  {qp.num}
                </span>
                <div className="relative z-[2] flex flex-col gap-1">
                  <span className="text-[10px] tracking-[0.24em] uppercase font-medium" style={{ color: 'rgba(245,242,236,0.78)' }}>
                    {qp.pillar}
                  </span>
                  <h3
                    className="font-serif font-normal leading-[1.05] m-0 mt-0.5 tracking-[-0.005em] text-cream-100"
                    style={{ fontSize: 'clamp(26px, 2.8vw, 36px)' }}
                  >
                    {qp.name}<em className="italic text-brand-200">{qp.nameEm}</em>
                  </h3>
                  <p className="text-[13px] m-0 max-h-0 opacity-0 overflow-hidden group-hover:max-h-[60px] group-hover:opacity-100 group-hover:mt-1.5 transition-all duration-[350ms]" style={{ color: 'rgba(245,242,236,0.82)' }}>
                    {qp.desc}
                  </p>
                  <span
                    className="inline-flex items-center gap-[10px] text-[11px] tracking-[0.22em] uppercase text-cream-100 mt-4 pb-1 border-b self-start group-hover:gap-[18px] transition-all duration-300"
                    style={{ borderColor: 'rgba(245,242,236,0.55)' }}
                  >
                    Explorar
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Editorial quote */}
      <section id="editorial" className="py-[110px] text-center bg-cream-200 border-t border-cream-400 border-b border-cream-400" style={{ padding: '110px 6vw' }}>
        <blockquote
          className="font-serif font-normal italic leading-[1.32] text-carbon-900 text-balance mx-auto m-0"
          style={{ maxWidth: '920px', fontSize: 'clamp(24px, 2.8vw, 38px)' }}
        >
          &ldquo;No vendemos un producto. Vendemos una <em className="italic text-brand-600">conversación</em> entre tu piel, nuestra fórmula y el tiempo.&rdquo;
        </blockquote>
        <cite className="block mt-7 font-sans not-italic text-[11px] tracking-[0.22em] uppercase text-carbon-400">
          Dra. Quevi × Dr. Dall&apos;Ó — Fundadores
        </cite>
      </section>
    </>
  )
}
