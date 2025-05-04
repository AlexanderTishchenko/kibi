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

  // If using localhost in NEXT_PUBLIC_API_URL, switch to the Docker service hostname 'api'
  let apiBase = process.env.NEXT_PUBLIC_API_URL!
  if (apiBase.includes('localhost')) {
    apiBase = apiBase.replace('localhost', 'api')
  }
  const res = await fetch(`${apiBase}/v1/credits`, {
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

export async function PATCH(req: NextRequest) {
  const supabase = await createClient();
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error || !session) return NextResponse.json(
    { error: 'Not authenticated' },
    { status: 401 }
  );

  let apiBase = process.env.NEXT_PUBLIC_API_URL!;
  if (apiBase.includes('localhost')) {
    apiBase = apiBase.replace('localhost', 'api');
  }
  const body = await req.json();
  const res = await fetch(`${apiBase}/v1/credits`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session.access_token}`,
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    return NextResponse.json(
      { error: text || res.statusText },
      { status: res.status }
    );
  }
  const data = await res.json();
  return NextResponse.json(data);
}
