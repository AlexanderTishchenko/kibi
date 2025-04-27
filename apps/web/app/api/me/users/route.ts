//apps/web/app/api/me/users/route.ts
import { NextResponse, NextRequest } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET() {
  console.log('[api/me/users] GET start')
  try {
    const supabase = await createClient()
    console.log('[api/me/users] Supabase client created')
    const {
      data: { user },
      error: authError
    } = await supabase.auth.getUser()
    console.log('[api/me/users] supabase.auth.getUser result', { user, authError })
    if (authError || !user) {
      console.error('[api/me/users] Unauthorized; authError or no user', { authError })
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }
    console.log('[api/me/users] User authenticated, ID:', user.id)
    const { data, error } = await supabase
      .from('profiles')
      .select('username, avatar_url, credits, level, progress, total_time_saved, total_money_saved')
      .eq('id', user.id)
      .single()
    console.log('[api/me/users] profiles.select result', { data, error })
    if (error || !data) {
      console.error('[api/me/users] Database error', { error })
      return NextResponse.json({ message: error?.message }, { status: 500 })
    }
    console.log('[api/me/users] Success, returning data', data)
    return NextResponse.json(data)
  } catch (err) {
    console.error('[api/me/users] Unexpected exception', err)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  console.log('[api/me/users] POST start')
  try {
    const supabase = await createClient()
    console.log('[api/me/users] Supabase client created (POST)')
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      console.error('[api/me/users] Unauthorized POST', authError)
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }
    const body = await request.json()
    console.log('[api/me/users] POST body', body)
    const { userid, username, avatar_url, credits = 0, level = 1, progress = 0, total_time_saved = 0, total_money_saved = 0 } = body
    const { data: existing } = await supabase
      .from("profiles")
      .select("id")
      .eq("id", userid)
      .maybeSingle();
    console.log('[api/me/users] existing', existing)
    if (!existing) {
      const { status: insertStatus, statusText: insertStatusText, error: insertError } = await supabase
        .from('profiles')
        .insert([{ id: userid, username, avatar_url, credits, level, progress, total_time_saved, total_money_saved }])
      if (insertError || insertStatusText !== "Created" || insertStatus !== 201) {
        console.error('[api/me/users] POST insert error or no data. insertError:', insertError)
        console.error('[api/me/users] POST insert status:', insertStatus)
        return NextResponse.json({ message: insertError?.message || 'No data returned' }, { status: 500 })
      }
      console.log('[api/me/users] Profile created')
      return NextResponse.json({ id: userid, username, avatar_url, credits, level, progress, total_time_saved, total_money_saved }, { status: 201 })
    }
    return NextResponse.json({ message: 'Profile already exists' }, { status: 409 })
  } catch (err) {
    console.error('[api/me/users] Unexpected POST exception', err)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  console.log('[api/me/users] PATCH start')
  try {
    const supabase = await createClient()
    console.log('[api/me/users] Supabase client created (PATCH)')
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      console.error('[api/me/users] Unauthorized PATCH', authError)
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }
    const body = await request.json()
    console.log('[api/me/users] PATCH body', body)
    const { status: updateStatus, statusText: updateStatusText, error: updateError } = await supabase
      .from('profiles')
      .update(body)
      .eq('id', user.id)
      .select()
    if (updateError || !updateStatus || updateStatus !== 200) {
      console.error('[api/me/users] PATCH update error or no data. updateError:', updateError)
      return NextResponse.json({ message: updateError?.message || 'No data returned' }, { status: 500 })
    }
    console.log('[api/me/users] Profile updated')
    return NextResponse.json({ id: user.id, ...body }, { status: 200 })
  } catch (err) {
    console.error('[api/me/users] Unexpected PATCH exception', err)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}