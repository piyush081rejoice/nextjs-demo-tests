import { NextResponse, NextRequest } from 'next/server'

import { ROUTES, STORAGE_KEYS } from '@/common/utils/constants/routes'

const publicRoutes = [ROUTES.AUTH_LOGIN]

const redirectRoutes = {
  [ROUTES.HOME]: ROUTES.DASHBOARD,
}

export function middleware(request: NextRequest) {
  if (redirectRoutes[request.nextUrl.pathname]) {
    return NextResponse.redirect(new URL(redirectRoutes[request.nextUrl.pathname], request.url))
  }
  const userToken = request.cookies.get(STORAGE_KEYS.COOKIE_ACCESS_TOKEN)?.value
  if (!userToken && publicRoutes.includes(request.nextUrl.pathname)) return NextResponse.next()
  else if (!userToken) return NextResponse.redirect(new URL(ROUTES.AUTH_LOGIN, request.url))
  else return NextResponse.next()
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
}