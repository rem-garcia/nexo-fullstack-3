import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseClient } from '../../../../lib/supabase'

export async function GET(request: NextRequest) {
  const supabase = await getSupabaseClient()
  await supabase.auth.signOut()
  return NextResponse.redirect('https://nexo-landing.vercel.app')
}