import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone } from 'lucide-react'
import { SITE, NAV_LINKS } from '../content'

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const [active, setActive]       = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const handleNavClick = (href: string) => {
    setActive(href)
    setMenuOpen(false)
  }

  return (
    <>
      <motion.header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm py-3'
            : 'bg-transparent py-5'
        }`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a
              href="#hero"
              className="font-serif text-xl font-bold text-brand-700 hover:text-brand-600 transition-colors"
            >
              {SITE.name}
            </a>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors rounded-lg
                    ${active === link.href
                      ? 'text-brand-600'
                      : scrolled
                        ? 'text-neutral-700 hover:text-brand-600'
                        : 'text-neutral-700 hover:text-brand-600'
                    }`}
                >
                  {link.label}
                  {active === link.href && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-3 right-3 h-0.5 bg-brand-500 rounded-full"
                    />
                  )}
                </a>
              ))}
            </nav>

            {/* CTA + Phone */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href={`tel:${SITE.phone}`}
                className="flex items-center gap-1.5 text-sm text-neutral-600 hover:text-brand-600 transition-colors"
              >
                <Phone size={14} />
                {SITE.phone}
              </a>
              <a
                href="#booking"
                className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium rounded-full transition-colors duration-200"
              >
                Reservar cita
              </a>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="lg:hidden p-2 rounded-lg text-neutral-700 hover:bg-neutral-100 transition-colors"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-[64px] z-40 bg-white/98 backdrop-blur-md shadow-xl border-t border-neutral-100 lg:hidden"
          >
            <nav className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="px-4 py-3 text-base font-medium text-neutral-700 hover:text-brand-600 hover:bg-brand-50 rounded-xl transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="mt-4 pt-4 border-t border-neutral-100 flex flex-col gap-3">
                <a
                  href={`tel:${SITE.phone}`}
                  className="flex items-center gap-2 px-4 py-3 text-sm text-neutral-600 hover:text-brand-600 transition-colors"
                >
                  <Phone size={16} />
                  {SITE.phone}
                </a>
                <a
                  href="#booking"
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-3 bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium rounded-full text-center transition-colors"
                >
                  Reservar cita gratuita
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
