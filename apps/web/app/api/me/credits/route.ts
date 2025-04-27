// apps/web/app/api/me/credits/route.ts
import { NextResponse, NextRequest } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(req: NextRequest) {
  const supabase = await createClient()
  const { data: { session }, error } = await supabase.auth.getSession()
  if (error || !session) return NextResponse.json(
    { error: 'Not authenticated' },
    { status: 401 }
  )

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/credits`, {
    headers: { Authorization: `Bearer ${session.access_token}` },
    cache: 'no-store',
  })
  if (!res.ok) {
    const text = await res.text()
    return NextResponse.json(
      { error: text || res.statusText },
      { status: res.status }
    )
  }
  const data = await res.json()
  return NextResponse.json(data)
}
