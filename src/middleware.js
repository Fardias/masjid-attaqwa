import { NextResponse } from 'next/server'

export function middleware(request) {
  // Check if the request is for admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Skip middleware for login page
    if (request.nextUrl.pathname === '/admin/login') {
      return NextResponse.next()
    }

    // Check if user is authenticated
    const isAdmin = request.cookies.get('isAdmin')?.value

    if (!isAdmin) {
      // Redirect to login page if not authenticated
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*',
} 