import { FlaskConical, Leaf, Truck, FileText } from 'lucide-react'

const VALUES = [
  { Icon: FlaskConical, label: 'Formulado bajo pedido' },
  { Icon: Leaf, label: 'Activos de grado terapéutico' },
  { Icon: Truck, label: 'Envío fresco refrigerado' },
  { Icon: FileText, label: 'Prescripción médica incluida' },
]

export default function Values() {
  return (
    <div className="w-full bg-bg-deep border-t border-line-soft border-b">
      <div className="max-w-[1600px] mx-auto px-[6vw] py-[28px] grid grid-cols-2 md:grid-cols-4 gap-6">
        {VALUES.map(({ Icon, label }) => (
          <div key={label} className="flex items-center gap-3 text-[13px] text-ink-soft">
            <Icon size={20} strokeWidth={1.3} className="text-ink-mute flex-shrink-0" />
            {label}
          </div>
        ))}
      </div>
    </div>
  )
}
