import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

const PUBLIC_PATHS = ['/', '/login', '/register'];

export async function middleware(req: NextRequest) {
  let pathname = req.nextUrl.pathname;

  // Normalize pathname to avoid trailing slash issues
  if (pathname !== '/' && pathname.endsWith('/')) {
    pathname = pathname.slice(0, -1);
  }

  // Allow public paths
  if (PUBLIC_PATHS.includes(pathname)) {
    return NextResponse.next();
  }

  // **Exclude NextAuth API routes from protection**
  if (pathname.startsWith('/api/auth')) {
    return NextResponse.next();
  }

  // Get token
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    const loginUrl = new URL('/login', req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/api/:path*',  // Protect all API except NextAuth because of above check
  ],
};
