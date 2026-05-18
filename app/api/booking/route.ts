import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import type { Database } from '@/lib/database.types'

export async function POST(req: Request) {
  const body = await req.json()
  const { name, email, phone, service, message } = body

  if (!name || !email) {
    return NextResponse.json({ error: 'name and email are required' }, { status: 400 })
  }

  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { error } = await supabase.from('bookings').insert({
    name,
    email,
    phone: phone || null,
    service: service || null,
    message: message || null,
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
