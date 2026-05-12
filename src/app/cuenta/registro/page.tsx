'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createSupabaseBrowserClient } from '@/lib/supabase-browser'
import AnnouncementBar from '@/components/AnnouncementBar'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import SocialLogin from '@/components/SocialLogin'

export default function RegisterPage() {
  const router = useRouter()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (password !== confirm) {
      setError('Las contraseñas no coinciden.')
      return
    }
    if (password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres.')
      return
    }

    setLoading(true)
    const supabase = createSupabaseBrowserClient()
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    setSuccess(true)
    setLoading(false)
  }

  if (success) {
    return (
      <>
        <AnnouncementBar />
        <Navbar />
        <main className="min-h-screen bg-sand-200 flex items-center justify-center px-4 py-24">
          <div className="w-full max-w-sm text-center">
            <h2
              className="font-cormorant text-4xl font-light text-cocoa-900 mb-4"
            >
              Revisa tu email
            </h2>
            <p className="text-sm text-text-muted font-sans mb-8 leading-relaxed">
              Te hemos enviado un enlace de confirmación a <strong className="text-cocoa-900">{email}</strong>.
              Haz clic en el enlace para activar tu cuenta.
            </p>
            <Link
              href="/"
              className="text-xs tracking-[0.15em] uppercase font-sans text-cocoa-900 underline underline-offset-4 hover:text-cocoa-600"
            >
              Volver al inicio
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main className="min-h-screen bg-sand-200 flex items-center justify-center px-4 py-24">
        <div className="w-full max-w-sm">
          <div className="text-center mb-10">
            <h1
              className="font-cormorant text-4xl font-light text-cocoa-900 mb-2"
            >
              Crear cuenta
            </h1>
            <p className="text-xs text-text-muted font-sans">
              ¿Ya tienes cuenta?{' '}
              <Link href="/cuenta/login" className="text-cocoa-900 underline underline-offset-2 hover:text-cocoa-600">
                Inicia sesión
              </Link>
            </p>
          </div>

          <SocialLogin />

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-sand-300" />
            <span className="text-[10px] tracking-[0.15em] uppercase text-text-muted font-sans">o</span>
            <div className="flex-1 h-px bg-sand-300" />
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-[10px] tracking-[0.15em] uppercase text-text-muted font-sans mb-1.5">
                Nombre completo
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-sand-400 bg-sand-50 px-4 py-3 text-sm font-sans text-text placeholder:text-text-muted focus:outline-none focus:border-cocoa-600"
                placeholder="Ana García"
              />
            </div>

            <div>
              <label className="block text-[10px] tracking-[0.15em] uppercase text-text-muted font-sans mb-1.5">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-sand-400 bg-sand-50 px-4 py-3 text-sm font-sans text-text placeholder:text-text-muted focus:outline-none focus:border-cocoa-600"
                placeholder="tu@email.com"
              />
            </div>

            <div>
              <label className="block text-[10px] tracking-[0.15em] uppercase text-text-muted font-sans mb-1.5">
                Contraseña
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-sand-400 bg-sand-50 px-4 py-3 text-sm font-sans text-text placeholder:text-text-muted focus:outline-none focus:border-cocoa-600"
                placeholder="Mínimo 8 caracteres"
              />
            </div>

            <div>
              <label className="block text-[10px] tracking-[0.15em] uppercase text-text-muted font-sans mb-1.5">
                Confirmar contraseña
              </label>
              <input
                type="password"
                required
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="w-full border border-sand-400 bg-sand-50 px-4 py-3 text-sm font-sans text-text placeholder:text-text-muted focus:outline-none focus:border-cocoa-600"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p className="text-xs text-red-600 font-sans">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-cocoa-900 text-sand-100 text-xs tracking-[0.2em] uppercase py-4 font-sans hover:bg-cocoa-800 transition-colors disabled:opacity-60 mt-2"
            >
              {loading ? 'Creando cuenta...' : 'Crear cuenta'}
            </button>

            <p className="text-[10px] text-text-muted font-sans text-center leading-relaxed pt-2">
              Al registrarte aceptas nuestra{' '}
              <Link href="/privacidad" className="underline hover:text-cocoa-900">política de privacidad</Link>
              {' '}y los{' '}
              <Link href="/terminos" className="underline hover:text-cocoa-900">términos de uso</Link>.
            </p>
          </form>
        </div>
      </main>
      <Footer />
    </>
  )
}
