import { cookies, headers } from 'next/headers'
import { NextResponse } from 'next/server'

// Return an origin with trailing slash, e.g. 'http://127.0.0.1:4000/'
function getDomainFromString(fullUrl: string): string {
  try {
    const u = new URL(fullUrl)
    return u.origin.endsWith('/') ? u.origin + '/' : u.origin + '/'
  } catch (e) {
    try {
      const u2 = new URL('http://' + fullUrl)
      return u2.origin + '/'
    } catch {
      return ''
    }
  }
}

function getOriginFromRequest(request: Request): string {
  // Prefer Referer when available (it may include path)
  const referer = request.headers.get('referer')
  if (referer) return getDomainFromString(referer)

  // Next, try x-forwarded-proto + host (common behind proxies)
  const host = request.headers.get('host')
  const xfp = request.headers.get('x-forwarded-proto')
  if (host) {
    const proto = xfp ? xfp.split(',')[0].trim() : undefined
    if (proto) {
      return `${proto}://${host.replace(/\/+$/, '')}/`
    }

    // Fall back to request.url protocol if available
    try {
      const u = new URL(request.url)
      const scheme = u.protocol.replace(':', '') || 'http'
      return `${scheme}://${host.replace(/\/+$/, '')}/`
    } catch {
      return `http://${host.replace(/\/+$/, '')}/`
    }
  }

  // Last resort: parse the request.url itself
  return getDomainFromString(request.url)
}

export async function GET(request: Request) {
  const cookieStore = cookies()
  cookieStore.set('edit-mode', 'true')

  // Extract locale from URL path
  // const url = new URL(request.url)
  // const pathSegments = url.pathname.split('/').filter((segment) => segment.length > 0)
  // const locale = pathSegments[0] || 'vn' // First segment is locale, default to 'vn'

  // const params = new URLSearchParams(request.url.split('?')[1])
  const fullOrigin = getOriginFromRequest(request)

  // return NextResponse.redirect(new URL(`/${locale}/`, fullOrigin ?? ''))
  return NextResponse.redirect(new URL(fullOrigin ?? ''))
}
