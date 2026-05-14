export default function EditorialQuote() {
  return (
    <section className="bg-bg py-[90px] px-[6vw] text-center">
      <blockquote
        className="font-cormorant font-[400] italic text-ink leading-[1.35] mx-auto m-0"
        style={{ maxWidth: '820px', fontSize: 'clamp(22px, 2.4vw, 32px)' }}
      >
        &ldquo;La frescura no es una opción, es un requisito. Por eso cada fórmula nace cuando tú la pides.&rdquo;
      </blockquote>
      <cite className="block mt-[22px] not-italic text-[11px] tracking-[0.18em] uppercase text-text-muted font-sans">
        Dr. Dall&apos;Ó — Fundador
      </cite>
    </section>
  )
}
