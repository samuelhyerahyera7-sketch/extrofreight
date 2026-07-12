import { NextResponse } from 'next/server'
import { createHmac, timingSafeEqual } from 'crypto'

const COOKIE_NAME = 'internal_session'

export async function POST(req: Request) {
  const { password, next } = await req.json()
  const expectedPassword = process.env.INTERNAL_PRICING_PASSWORD || ''
  const a = Buffer.from(String(password || ''))
  const b = Buffer.from(expectedPassword)
  const match = a.length === b.length && expectedPassword.length > 0 && timingSafeEqual(a, b)

  if (!match) {
    return NextResponse.json({ ok: false }, { status: 401 })
  }

  const secret = process.env.INTERNAL_AUTH_SECRET || ''
  const token = createHmac('sha256', secret).update('authorized').digest('hex')

  const res = NextResponse.json({ ok: true, next: next || '/internal/pricing-calculator' })
  res.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
  })
  return res
}
