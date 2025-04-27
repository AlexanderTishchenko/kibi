//apps/web/app/login/actions.ts
'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
   }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { data: signUpData, error: signUpError } = await supabase.auth.signUp(data)
  if (signUpError || !signUpData.user) {
    console.error('[signup] signUp error or missing user', signUpError)
    redirect('/error')
  }
  // create default profile via API route
  const defaultProfilePayload = {
    userid: signUpData.user.id,
    username: signUpData.user.email!.split("@")[0],
    credits: 0,
    avatar_url: 'https://i.pravatar.cc/300?img=5',
    level: 1,
    progress: 0,
    total_time_saved: 0,
    total_money_saved: 0
  }
  const profileRes = await fetch('/api/me/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(defaultProfilePayload)
  })
  if (!profileRes.ok) {
    console.error('[signup] Profile API error', await profileRes.text())
    redirect('/error')
  }
  console.log('[signup] Profile created successfully')

  revalidatePath('/', 'layout')
  redirect('/')
}