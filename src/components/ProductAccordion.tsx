'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

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
            <span className="text-[10px] tracking-[0.25em] uppercase text-text-muted group-hover:text-cocoa-900 transition-colors duration-200">
              {item.label}
            </span>

            {/* Single icon that rotates: + → × */}
            <span className="relative w-3 h-3 flex-shrink-0">
              <motion.span
                className="absolute inset-x-0 top-1/2 h-px bg-text-muted origin-center block"
                style={{ marginTop: '-0.5px' }}
                animate={{ rotate: open === i ? 45 : 0 }}
                transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
              />
              <motion.span
                className="absolute inset-x-0 top-1/2 h-px bg-text-muted origin-center block"
                style={{ marginTop: '-0.5px' }}
                animate={{ rotate: open === i ? -45 : 90 }}
                transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
              />
            </span>
          </button>

          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div
                key="body"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
                style={{ overflow: 'hidden' }}
              >
                <p className="text-xs text-text leading-relaxed whitespace-pre-line pb-5">
                  {item.content}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}
