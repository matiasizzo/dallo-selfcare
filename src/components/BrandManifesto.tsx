const PILLARS = [
  {
    icon: 'flask',
    label: 'Formulado bajo pedido',
  },
  {
    icon: 'leaf',
    label: 'Activos de grado biotec',
  },
  {
    icon: 'stetho',
    label: 'Avalado por médicos',
  },
  {
    icon: 'check',
    label: 'Sin parabenos · sin rellenos',
  },
]

function PillarIcon({ name }: { name: string }) {
  const base = { fill: 'none', stroke: '#553b2e', strokeWidth: 1.1, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  const icons: Record<string, React.ReactNode> = {
    flask:  <><path {...base} d="M9 3v6L4 19a2 2 0 0 0 2 3h12a2 2 0 0 0 2-3l-5-10V3"/><path {...base} d="M9 3h6M6.5 14h11"/></>,
    leaf:   <><path {...base} d="M3 21c0-9 9-18 18-18-1 8-7 16-15 17-1 0-2 0-3 1z"/><path {...base} d="M3 21 13 11"/></>,
    stetho: <><path {...base} d="M6 4v6a4 4 0 0 0 8 0V4"/><circle cx="18" cy="14" r="2" {...base}/><path {...base} d="M10 14v3a4 4 0 0 0 8 0v-1"/></>,
    check:  <><circle {...base} cx="12" cy="12" r="9"/><path {...base} d="m8 12 3 3 5-6"/></>,
  }
  return (
    <svg width="30" height="30" viewBox="0 0 24 24">
      {icons[name]}
    </svg>
  )
}

export default function BrandManifesto() {
  return (
    <section className="bg-bg py-[100px] px-8 border-b border-[#e8dccb]">
      <div className="max-w-[1100px] mx-auto text-center">

        <span className="inline-block text-[11px] tracking-[0.32em] uppercase text-text-muted mb-6">
          Dr. Dall&apos;Ó · Medicina estética de precisión
        </span>

        <h2
          className="font-cormorant font-[400] text-ink leading-[1.05] tracking-[-0.01em] m-0 mb-[18px]"
          style={{ fontSize: 'clamp(34px, 4.2vw, 56px)' }}
        >
          Longevidad <em className="italic text-[#553b2e]">externa</em>,<br />
          longevidad <em className="italic text-[#553b2e]">interna</em>.
        </h2>

        <p className="text-[15px] text-ink-soft mx-auto mb-14 max-w-[540px] leading-[1.55] m-0">
          Cada fórmula nace en consulta y se prepara cuando tú la pides.
        </p>

        <ul className="list-none m-0 p-0 grid grid-cols-2 md:grid-cols-4 border-t border-[#ddd1bd]">
          {PILLARS.map((p, i) => (
            <li
              key={p.label}
              className="relative flex flex-col items-center gap-[18px] px-[18px] pt-9 pb-2 text-center"
              style={i > 0 ? undefined : undefined}
            >
              {i > 0 && (
                <span
                  className="hidden md:block absolute left-0 w-px bg-[#ddd1bd]"
                  style={{ top: '30%', bottom: '30%' }}
                  aria-hidden
                />
              )}
              <PillarIcon name={p.icon} />
              <span className="text-[12px] tracking-[0.16em] uppercase text-ink font-[500] leading-[1.5] max-w-[14ch]">
                {p.label}
              </span>
            </li>
          ))}
        </ul>

      </div>
    </section>
  )
}
