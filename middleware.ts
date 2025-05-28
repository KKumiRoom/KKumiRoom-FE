import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  if (
    process.env.NODE_ENV === 'development' &&
    process.env.SKIP_AUTH === 'true'
  ) {
    return NextResponse.next();
  }
  const url = request.nextUrl.clone();
  const path = url.pathname;
  const accessToken = request.cookies.get('accessToken');

  const publicPaths = [
    '/login',
    '/register',
    '/api/auth/login',
    '/api/auth/register',
    '/api/auth/refresh',
    '/api/init-schools',
  ];

  const staticFilePaths = ['/_next', '/favicon.ico', '/images', '/fonts'];

  if (staticFilePaths.some((prefix) => path.startsWith(prefix))) {
    return NextResponse.next();
  }

  if (
    publicPaths.some(
      (publicPath) => path === publicPath || path.startsWith(publicPath)
    )
  ) {
    return NextResponse.next();
  }

  if (!accessToken) {
    url.pathname = '/login';
    url.searchParams.set('redirect', request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image).*)'],
};
