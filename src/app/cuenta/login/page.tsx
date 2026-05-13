'use client'

import { Suspense, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { createSupabaseBrowserClient } from '@/lib/supabase-browser'
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
    if (error) { setError('Email o contraseña incorrectos.'); setLoading(false); return }
    router.push(redirect)
    router.refresh()
  }

  return (
    <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm px-8 py-10">
      {/* Logo */}
      <div className="flex justify-center mb-8">
        <Image
          src="https://niuaflxfiyafckvseruu.supabase.co/storage/v1/object/public/assets/logo-nova-dallo-black.svg"
          alt="Dall'Ó Selfcare"
          width={100}
          height={34}
          className="h-8 w-auto"
        />
      </div>

      <div className="text-center mb-8">
        <h1 className="font-cormorant text-3xl font-light text-cocoa-900 mb-1">Iniciar sesión</h1>
        <p className="text-xs text-text-muted">Inicia sesión o crea una cuenta</p>
      </div>

      <SocialLogin redirectTo={redirect} />

      <div className="flex items-center gap-3 my-6">
        <div className="flex-1 h-px bg-sand-300" />
        <span className="text-[10px] tracking-[0.15em] uppercase text-text-muted">o</span>
        <div className="flex-1 h-px bg-sand-300" />
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-sand-300 bg-sand-50 rounded-lg px-4 py-3 text-sm text-cocoa-900 placeholder:text-text-muted focus:outline-none focus:border-cocoa-900 transition-colors"
          placeholder="Correo electrónico"
        />

        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-sand-300 bg-sand-50 rounded-lg px-4 py-3 text-sm text-cocoa-900 placeholder:text-text-muted focus:outline-none focus:border-cocoa-900 transition-colors"
          placeholder="Contraseña"
        />

        {error && <p className="text-xs text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-cocoa-900 text-white text-xs tracking-[0.15em] uppercase py-3.5 hover:bg-cocoa-800 transition-colors disabled:opacity-60"
        >
          {loading ? 'Entrando...' : 'Continuar'}
        </button>
      </form>

      <div className="mt-6 flex flex-col items-center gap-3 text-[11px] text-text-muted">
        <Link href="/cuenta/registro" className="hover:text-cocoa-900 transition-colors">
          ¿No tienes cuenta? <span className="underline underline-offset-2">Regístrate</span>
        </Link>
        <Link href="/cuenta/recuperar" className="hover:text-cocoa-900 transition-colors underline underline-offset-2">
          ¿Olvidaste tu contraseña?
        </Link>
      </div>

      <p className="mt-8 text-center text-[10px] text-text-muted">
        <Link href="/privacidad" className="underline underline-offset-2 hover:text-cocoa-900">Política de privacidad</Link>
      </p>
    </div>
  )
}

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-cream flex items-center justify-center px-4 py-16">
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </main>
  )
}
