import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Instagram, Facebook, Linkedin } from 'lucide-react'
import { SITE, FOOTER_LINKS } from '../content'
import { fadeUp, staggerContainer } from '../lib/animations'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import logoImg from '../assets/logo.jpeg'

export default function Footer() {
  const { ref, isInView } = useScrollAnimation(0.05)
  const year = new Date().getFullYear()

  return (
    <footer className="bg-carbon-900 text-cream-50 pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top grid */}
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 pb-14 border-b border-cream-50/10"
        >
          {/* Brand col */}
          <motion.div variants={fadeUp} className="flex flex-col gap-5 sm:col-span-2 lg:col-span-1">
            <a href="#hero" className="flex items-center gap-2.5">
              <img src={logoImg} alt={SITE.name} className="h-10 w-auto object-contain rounded-lg" />
              <span className="font-serif text-lg font-bold text-cream-50 leading-none">
                QUEVI<br />
                <span className="text-xs font-sans font-normal text-carbon-300 tracking-widest uppercase">
                  Wellness Clinic
                </span>
              </span>
            </a>
            <p className="text-sm text-carbon-300 leading-relaxed max-w-xs">
              Medicina estética de precisión. Diagnóstico 360° y protocolos personalizados para escribir tu nueva historia de vida de piel.
            </p>
            <div className="flex gap-3 mt-2">
              {[
                { icon: <Instagram size={16} />, href: '#' },
                { icon: <Facebook size={16} />,  href: '#' },
                { icon: <Linkedin size={16} />,  href: '#' },
              ].map(({ icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-9 h-9 rounded-full bg-cream-50/10 hover:bg-brand-600 flex items-center justify-center transition-colors"
                >
                  {icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Services */}
          <motion.div variants={fadeUp} className="flex flex-col gap-4">
            <h4 className="text-xs font-semibold text-cream-50 uppercase tracking-widest">Servicios</h4>
            <ul className="flex flex-col gap-2.5">
              {FOOTER_LINKS.servicios.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-sm text-carbon-300 hover:text-cream-50 transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div variants={fadeUp} className="flex flex-col gap-4">
            <h4 className="text-xs font-semibold text-cream-50 uppercase tracking-widest">Empresa</h4>
            <ul className="flex flex-col gap-2.5">
              {FOOTER_LINKS.empresa.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-sm text-carbon-300 hover:text-cream-50 transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={fadeUp} className="flex flex-col gap-4">
            <h4 className="text-xs font-semibold text-cream-50 uppercase tracking-widest">Contacto</h4>
            <ul className="flex flex-col gap-3">
              <li>
                <a href={`tel:${SITE.phone}`} className="flex items-start gap-2.5 text-sm text-carbon-300 hover:text-cream-50 transition-colors">
                  <Phone size={14} className="mt-0.5 text-brand-400 flex-shrink-0" />
                  {SITE.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className="flex items-start gap-2.5 text-sm text-carbon-300 hover:text-cream-50 transition-colors">
                  <Mail size={14} className="mt-0.5 text-brand-400 flex-shrink-0" />
                  {SITE.email}
                </a>
              </li>
              <li>
                <div className="flex items-start gap-2.5 text-sm text-carbon-300">
                  <MapPin size={14} className="mt-0.5 text-brand-400 flex-shrink-0" />
                  {SITE.address}
                </div>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8">
          <p className="text-xs text-carbon-400">
            © {year} {SITE.name}. Todos los derechos reservados.
          </p>
          <div className="flex gap-5">
            {FOOTER_LINKS.legal.map((l) => (
              <a key={l.label} href={l.href} className="text-xs text-carbon-400 hover:text-cream-50 transition-colors">
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
