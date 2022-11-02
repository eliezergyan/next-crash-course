import { NextResponse, NextRequest } from 'next/server'

export default async function middleware(req) {
  let accessToken = req.cookies.get('authToken')

  const requestHeaders = new Headers(req.headers)

  requestHeaders.set('Accept', 'application/json')
  requestHeaders.set('Content-Type', 'application/json')
  requestHeaders.set('authorization', `Bearer ${accessToken}`)
  requestHeaders.set(
    'Strict-Transport-Security',
    'max-age=63072000; includeSubDomains; preload'
  )
  requestHeaders.set('Content-Security-Policy', "default-src 'self'")
  requestHeaders.set('X-Content-Type-Options', 'nosniff')
  requestHeaders.set('X-Frame-Options', 'SAMEORIGIN')
  requestHeaders.set('Referrer-Policy', 'no-referrer')

  const response = NextResponse.next({
    req: {
      // New request headers
      headers: requestHeaders,
    },
  })

  // Set a new response header `x-hello-from-middleware2`
  // response.headers.set('x-hello-from-middleware2', 'hello')
  return response
}
