const MESSAGES = [
  'Longevidad es salud',
  'Formulado bajo pedido · Barcelona',
  'Envío en frío · 48h España',
  'Activos de grado biotec',
]

export default function AnnouncementBar() {
  const repeated = [...MESSAGES, ...MESSAGES]

  return (
    <div className="w-full bg-brown text-bg overflow-hidden py-3 select-none">
      <div
        className="flex whitespace-nowrap"
        style={{ animation: 'marquee 28s linear infinite' }}
      >
        {repeated.map((msg, i) => (
          <span key={i} className="inline-flex items-center gap-0 text-[12px] tracking-[0.08em]">
            {msg}
            <span className="mx-7 opacity-40 text-[10px]">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
