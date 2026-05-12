'use client'

import { Suspense, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { createSupabaseBrowserClient } from '@/lib/supabase-browser'
import AnnouncementBar from '@/components/AnnouncementBar'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import SocialLogin from '@/components/SocialLogin'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') ?? '/cuenta'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const supabase = createSupabaseBrowserClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError('Email o contraseña incorrectos.')
      setLoading(false)
      return
    }

    router.push(redirect)
    router.refresh()
  }

  return (
    <div className="w-full max-w-sm">
      <div className="text-center mb-10">
        <h1
          className="text-4xl font-light text-cocoa-900 mb-2"
          style={{ fontFamily: 'var(--font-cormorant)' }}
        >
          Iniciar sesión
        </h1>
        <p className="text-xs text-text-muted font-sans">
          ¿Nueva cuenta?{' '}
          <Link href="/cuenta/registro" className="text-cocoa-900 underline underline-offset-2 hover:text-cocoa-600">
            Regístrate aquí
          </Link>
        </p>
      </div>

      <SocialLogin redirectTo={redirect} />

      <div className="flex items-center gap-3 my-6">
        <div className="flex-1 h-px bg-sand-300" />
        <span className="text-[10px] tracking-[0.15em] uppercase text-text-muted font-sans">o</span>
        <div className="flex-1 h-px bg-sand-300" />
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
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
          <div className="flex justify-between items-center mb-1.5">
            <label className="block text-[10px] tracking-[0.15em] uppercase text-text-muted font-sans">
              Contraseña
            </label>
            <Link
              href="/cuenta/recuperar"
              className="text-[10px] text-text-muted font-sans hover:text-cocoa-900 transition-colors"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
    </div>
  )
}

export default function LoginPage() {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main className="min-h-screen bg-sand-200 flex items-center justify-center px-4 py-24">
        <Suspense fallback={null}>
          <LoginForm />
        </Suspense>
      </main>
      <Footer />
    </>
  )
}
