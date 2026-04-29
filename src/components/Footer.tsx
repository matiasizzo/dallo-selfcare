import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Instagram, Facebook, Linkedin } from 'lucide-react'
import { SITE, FOOTER_LINKS } from '../content'
import { fadeUp, staggerContainer } from '../lib/animations'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

export default function Footer() {
  const { ref, isInView } = useScrollAnimation(0.05)
  const year = new Date().getFullYear()

  return (
    <footer className="bg-neutral-900 text-white pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top grid */}
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 pb-14 border-b border-white/10"
        >
          {/* Brand col */}
          <motion.div variants={fadeUp} className="flex flex-col gap-5 sm:col-span-2 lg:col-span-1">
            <a href="#hero" className="font-serif text-2xl font-bold text-white">
              {SITE.name}
            </a>
            <p className="text-sm text-neutral-400 leading-relaxed max-w-xs">
              Dermatología clínica y estética de confianza. Tratamientos avanzados para una piel sana y una imagen segura.
            </p>
            {/* Social */}
            <div className="flex gap-3 mt-2">
              {[
                { icon: <Instagram size={16} />, href: '#' },
                { icon: <Facebook size={16} />, href: '#' },
                { icon: <Linkedin size={16} />, href: '#' },
              ].map(({ icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-brand-600 flex items-center justify-center transition-colors"
                >
                  {icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Services */}
          <motion.div variants={fadeUp} className="flex flex-col gap-4">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Servicios</h4>
            <ul className="flex flex-col gap-2.5">
              {FOOTER_LINKS.servicios.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-sm text-neutral-400 hover:text-white transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div variants={fadeUp} className="flex flex-col gap-4">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Empresa</h4>
            <ul className="flex flex-col gap-2.5">
              {FOOTER_LINKS.empresa.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-sm text-neutral-400 hover:text-white transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={fadeUp} className="flex flex-col gap-4">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Contacto</h4>
            <ul className="flex flex-col gap-3">
              <li>
                <a href={`tel:${SITE.phone}`} className="flex items-start gap-2.5 text-sm text-neutral-400 hover:text-white transition-colors">
                  <Phone size={14} className="mt-0.5 text-brand-400 flex-shrink-0" />
                  {SITE.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className="flex items-start gap-2.5 text-sm text-neutral-400 hover:text-white transition-colors">
                  <Mail size={14} className="mt-0.5 text-brand-400 flex-shrink-0" />
                  {SITE.email}
                </a>
              </li>
              <li>
                <div className="flex items-start gap-2.5 text-sm text-neutral-400">
                  <MapPin size={14} className="mt-0.5 text-brand-400 flex-shrink-0" />
                  {SITE.address}
                </div>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8">
          <p className="text-xs text-neutral-500">
            © {year} {SITE.name}. Todos los derechos reservados.
          </p>
          <div className="flex gap-5">
            {FOOTER_LINKS.legal.map((l) => (
              <a key={l.label} href={l.href} className="text-xs text-neutral-500 hover:text-white transition-colors">
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
