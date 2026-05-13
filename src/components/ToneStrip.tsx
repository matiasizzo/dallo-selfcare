interface ToneStripProps {
  tagline: string
  sub: string
  imgGradient: string
  reverse?: boolean
}

export default function ToneStrip({ tagline, sub, imgGradient, reverse = false }: ToneStripProps) {
  const textCell = (
    <div
      key="text"
      className="flex flex-col items-center justify-center text-center px-10 py-[40px] min-h-[280px]"
      style={{ background: 'var(--color-bg-soft, #f0e7dc)' }}
    >
      <h3
        className="font-cormorant font-[400] text-ink tracking-[-0.005em] m-0 mb-3"
        style={{ fontSize: 'clamp(24px, 2.4vw, 32px)' }}
      >
        {tagline}
      </h3>
      <p className="text-[13px] text-ink-soft m-0 max-w-[340px] leading-[1.55]">{sub}</p>
    </div>
  )

  const imgCell = (
    <div
      key="img"
      className="relative min-h-[280px] overflow-hidden"
      style={{ background: imgGradient }}
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.15] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/><feColorMatrix values='0 0 0 0 0.2  0 0 0 0 0.15  0 0 0 0 0.1  0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />
    </div>
  )

  const cells = reverse ? [imgCell, textCell] : [textCell, imgCell]

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-bg">
      {cells}
    </section>
  )
}
