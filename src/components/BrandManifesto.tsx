import { Atom, Stethoscope, FlaskConical, Leaf } from 'lucide-react'

const BADGES = [
  { icon: Atom,         label: 'Activos',          sub: 'de biotec' },
  { icon: Stethoscope,  label: 'Avalado',           sub: 'por médicos' },
  { icon: FlaskConical, label: 'Formulado',         sub: 'bajo pedido' },
  { icon: Leaf,         label: 'Sin',               sub: 'parabenos' },
]

export default function BrandManifesto() {
  return (
    <section className="bg-cocoa-900 px-6 py-14 text-center">
      <p className="text-[9px] tracking-[0.3em] uppercase text-gold mb-5">
        Dr. Dall&apos;O · Medicina Estética de Precisión
      </p>
      <h2
        className="font-cormorant font-[400] text-sand-100 leading-[1.1] m-0 mb-4"
        style={{ fontSize: 'clamp(26px, 4vw, 46px)' }}
      >
        Longevidad externa e interna
      </h2>
      <p className="text-[12px] text-sand-400 tracking-wide mb-12">
        Formulado bajo pedido · Sin rellenos · Con respaldo clínico
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-xl mx-auto">
        {BADGES.map(({ icon: Icon, label, sub }) => (
          <div key={label} className="flex flex-col items-center gap-2">
            <Icon size={20} className="text-gold" strokeWidth={1.5} />
            <p className="text-[10px] tracking-[0.15em] uppercase text-sand-300 leading-snug m-0">
              {label}<br />{sub}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
