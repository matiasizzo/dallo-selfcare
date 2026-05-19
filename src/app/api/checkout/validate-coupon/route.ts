import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  const { code } = await req.json() as { code: string }

  if (!code?.trim()) {
    return NextResponse.json({ valid: false, error: 'Introduce un código' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('discount_codes')
    .select('code, discount_percent, max_uses, uses')
    .eq('code', code.trim().toUpperCase())
    .eq('active', true)
    .single()

  if (error || !data) {
    return NextResponse.json({ valid: false, error: 'Código no válido' })
  }

  if (data.max_uses !== null && data.uses >= data.max_uses) {
    return NextResponse.json({ valid: false, error: 'Este código ha llegado a su límite de usos' })
  }

  return NextResponse.json({
    valid: true,
    code: data.code,
    discountPercent: data.discount_percent,
  })
}
