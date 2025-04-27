import { type EmailOtpType } from '@supabase/supabase-js'
import { type NextRequest } from 'next/server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function GET(request: NextRequest) {
  console.log('[auth confirm] GET invoked with URL:', request.url)
  const url = new URL(request.url)
  console.log('[auth confirm] parsed URL parts:', { origin: url.origin, pathname: url.pathname, search: url.search })
  const { searchParams } = new URL(request.url)
  console.log('[auth confirm] raw searchParams:', searchParams.toString())
  const token_hash = searchParams.get('token_hash')
  console.log('[auth confirm] token_hash:', token_hash)
  const type = searchParams.get('type') as EmailOtpType | null
  console.log('[auth confirm] type:', type)
  const next = searchParams.get('next') ?? '/'
  console.log('[auth confirm] next param:', next)

  if (token_hash && type) {
    console.log('[auth confirm] token and type present, invoking verifyOtp')
    const supabase = await createClient()
    console.log('[auth confirm] Supabase client initialized')

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    })
    console.log('[auth confirm] verifyOtp result error:', error)
    if (!error) {
      console.log('[auth confirm] verifyOtp succeeded, redirecting to:', next)
      // redirect user to specified redirect URL or root of app
      redirect(next)
    }
    console.log('[auth confirm] verifyOtp failed, proceeding to error redirect')
  }

  console.log('[auth confirm] missing token_hash or type, redirecting to /error')
  // redirect the user to an error page with some instructions
  redirect('/error')
}