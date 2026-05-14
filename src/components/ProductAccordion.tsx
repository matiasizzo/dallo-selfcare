'use client'

import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'

export interface AccordionItem {
  label: string
  content: string
}

export default function ProductAccordion({ items }: { items: AccordionItem[] }) {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="border-t border-sand-300">
      {items.map((item, i) => (
        <div key={i} className="border-b border-sand-300">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between py-4 text-left group"
          >
            <span className="text-[10px] tracking-[0.25em] uppercase text-text-muted group-hover:text-cocoa-900 transition-colors">
              {item.label}
            </span>
            {open === i
              ? <Minus size={12} className="text-text-muted flex-shrink-0" />
              : <Plus size={12} className="text-text-muted flex-shrink-0" />
            }
          </button>
          {open === i && (
            <div className="pb-5">
              <p className="text-xs text-text leading-relaxed whitespace-pre-line">
                {item.content}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
