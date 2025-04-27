//apps/web/app/auth/callback/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: Request) {
  console.log('[auth callback] GET invoked with URL:', request.url)
  const url = new URL(request.url)
  const { searchParams, origin } = url
  console.log('[auth callback] url:', url)
  console.log('[auth callback] parsed origin:', origin)
  console.log('[auth callback] searchParams:', searchParams.toString())

  // Extract auth code and optional redirect path
  const code = searchParams.get("code");
  console.log('[auth callback] code param:', code)
  const next = searchParams.get("next") ?? "/";
  console.log('[auth callback] next param:', next)

  if (code) {
    console.log('[auth callback] code present, creating Supabase client')
    const supabase = await createClient();
    console.log('[auth callback] Supabase client created, exchanging code')

    // Exchange the auth code for a session
    const { data: { session }, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
    console.log('[auth callback] exchangeCodeForSession error:', exchangeError)

    if (!exchangeError && session) {
      console.log('[auth callback] exchange successful, redirecting to:', `${origin}/auth/setup-profile?next=${next}`)
      return NextResponse.redirect(`${origin}/auth/setup-profile?next=${next}`);
    }
    console.log('[auth callback] exchange failed, will redirect to error')
  }

  console.log('[auth callback] no code or exchange failure, redirecting to auth-code-error')
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}