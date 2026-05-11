'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Phone, Mail, MapPin, CheckCircle2 } from 'lucide-react'
import { SITE } from '@/content'
import { fadeUp, staggerContainer, slideInLeft, slideInRight } from '@/lib/animations'
import { useScrollAnimation } from '@/lib/useScrollAnimation'

const SERVICES_OPTIONS = [
  'Diagnóstico BIO-SCAN SKIN 360°',
  'Neuromoduladores',
  'Rellenos — DallÒ LIPS / Arquitectura Face',
  'PRP Photoativa / PDRN',
  'Tecnología High-Tech (LED, Láser, IPL)',
  'Primera consulta (orientación)',
]

export default function Booking() {
  const { ref, isInView } = useScrollAnimation()
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error ?? 'Error al enviar la solicitud')
      }
      setSubmitted(true)
      setForm({ name: '', email: '', phone: '', service: '', message: '' })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error inesperado')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="booking" className="py-28 bg-cream-300 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <motion.span
            variants={fadeUp}
            className="inline-block px-4 py-1.5 rounded-full bg-brand-100 text-brand-700 text-sm font-medium mb-4"
          >
            Consulta gratuita
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="text-4xl sm:text-5xl font-bold text-carbon-900 mb-4"
          >
            Reserva tu cita{' '}
            <span className="text-brand-600">hoy mismo</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-carbon-500 text-lg max-w-lg mx-auto">
            Primera consulta orientativa gratuita. Sin compromiso. Respuesta en menos de 24h.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12 items-start">
          {/* Left — contact info */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="flex flex-col gap-5"
          >
            <div className="rounded-3xl bg-gradient-to-br from-brand-600 to-brand-800 p-8 text-cream-50">
              <h3 className="text-xl font-bold mb-2">Información de contacto</h3>
              <p className="text-brand-200 text-sm mb-8">Estamos aquí para ayudarte en cada paso.</p>
              <div className="flex flex-col gap-5">
                <ContactItem icon={<Phone size={18} />} label="Teléfono" value={SITE.phone} href={`tel:${SITE.phone}`} />
                <ContactItem icon={<Mail size={18} />} label="Email" value={SITE.email} href={`mailto:${SITE.email}`} />
                <ContactItem icon={<MapPin size={18} />} label="Dirección" value={SITE.address} />
              </div>
              <div className="mt-10 flex gap-3">
                <div className="w-3 h-3 rounded-full bg-cream-50/30" />
                <div className="w-3 h-3 rounded-full bg-cream-50/20" />
                <div className="w-3 h-3 rounded-full bg-cream-50/10" />
              </div>
            </div>

            {['Sin esperas largas', 'Respuesta en 24h', 'Primera consulta gratis'].map((p) => (
              <div key={p} className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-cream-200 border border-cream-400">
                <CheckCircle2 size={16} className="text-brand-500 flex-shrink-0" />
                <span className="text-sm text-carbon-700 font-medium">{p}</span>
              </div>
            ))}
          </motion.div>

          {/* Right — form */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center gap-5 py-20 text-center rounded-3xl border border-brand-200 bg-brand-50"
              >
                <div className="w-16 h-16 rounded-full bg-brand-100 flex items-center justify-center">
                  <CheckCircle2 size={32} className="text-brand-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-carbon-900 mb-2">¡Solicitud enviada!</h3>
                  <p className="text-carbon-500">Te contactaremos en menos de 24 horas para confirmar tu cita.</p>
                </div>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-cream-50 text-sm font-medium rounded-full transition-colors"
                >
                  Enviar otra solicitud
                </button>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                id="contact"
                className="flex flex-col gap-5 p-8 rounded-3xl border border-cream-400 bg-cream-200"
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <FormField label="Nombre completo" name="name" type="text" placeholder="Tu nombre" value={form.name} onChange={handleChange} required />
                  <FormField label="Email" name="email" type="email" placeholder="tu@email.com" value={form.email} onChange={handleChange} required />
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <FormField label="Teléfono" name="phone" type="tel" placeholder="+34 600 000 000" value={form.phone} onChange={handleChange} />
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-carbon-700">Tratamiento de interés</label>
                    <select
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                      className="px-4 py-3 rounded-xl border border-cream-400 bg-cream-100 text-sm text-carbon-800 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition-all"
                    >
                      <option value="">Seleccionar...</option>
                      {SERVICES_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-carbon-700">Cuéntanos más (opcional)</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Describe tu consulta o preocupación principal..."
                    className="px-4 py-3 rounded-xl border border-cream-400 bg-cream-100 text-sm text-carbon-800 placeholder:text-carbon-300 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition-all resize-none"
                  />
                </div>
                {error && (
                  <p className="text-sm text-red-600 text-center">{error}</p>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="group flex items-center justify-center gap-2 w-full py-3.5 bg-brand-600 hover:bg-brand-700 disabled:opacity-60 disabled:cursor-not-allowed text-cream-50 font-medium rounded-full transition-all duration-200 shadow-lg shadow-brand-300/30 hover:-translate-y-0.5 mt-2"
                >
                  {loading ? 'Enviando...' : 'Solicitar cita gratuita'}
                  {!loading && <Send size={16} className="transition-transform group-hover:translate-x-1" />}
                </button>
                <p className="text-center text-xs text-carbon-400">
                  Al enviar, aceptas nuestra{' '}
                  <a href="#" className="underline hover:text-brand-600 transition-colors">política de privacidad</a>.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function ContactItem({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href?: string }) {
  const inner = (
    <div className="flex items-start gap-3">
      <div className="w-9 h-9 rounded-full bg-cream-50/10 flex items-center justify-center flex-shrink-0">{icon}</div>
      <div>
        <p className="text-brand-200 text-xs">{label}</p>
        <p className="text-cream-50 text-sm font-medium mt-0.5">{value}</p>
      </div>
    </div>
  )
  return href ? <a href={href}>{inner}</a> : <div>{inner}</div>
}

function FormField({ label, name, type, placeholder, value, onChange, required }: {
  label: string; name: string; type: string; placeholder: string;
  value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; required?: boolean
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-carbon-700">{label}</label>
      <input
        type={type} name={name} value={value} onChange={onChange}
        placeholder={placeholder} required={required}
        className="px-4 py-3 rounded-xl border border-cream-400 bg-cream-100 text-sm text-carbon-800 placeholder:text-carbon-300 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition-all"
      />
    </div>
  )
}
