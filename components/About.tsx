import Image from 'next/image'

export default function About() {
  return (
    <>
      {/* Tone strip — two-cell grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-cream-200">
        {/* Cream text cell */}
        <div className="min-h-[320px] bg-cream-100 border border-cream-400 flex flex-col items-center justify-center text-center gap-4 px-14 py-14">
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
