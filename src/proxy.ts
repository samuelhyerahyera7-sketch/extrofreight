import { NextRequest, NextResponse } from 'next/server'
import { createHmac, timingSafeEqual } from 'crypto'

const COOKIE_NAME = 'internal_session'

function expectedToken() {
  const secret = process.env.INTERNAL_AUTH_SECRET || ''
  return createHmac('sha256', secret).update('authorized').digest('hex')
}

function isAuthorized(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value
  if (!token) return false
  const expected = expectedToken()
  const a = Buffer.from(token)
  const b = Buffer.from(expected)
  return a.length === b.length && timingSafeEqual(a, b)
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl
  if (pathname === '/internal/login' || pathname === '/api/internal/login') {
    return NextResponse.next()
  }
  if (pathname.startsWith('/internal') && !isAuthorized(req)) {
    const url = req.nextUrl.clone()
    url.pathname = '/internal/login'
    url.searchParams.set('next', pathname)
    return NextResponse.redirect(url)
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/internal/:path*'],
}
