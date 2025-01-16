import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// 1. Specify protected and public routes
const protectedRoutes = ['/dashboard'];
const publicRoutes = ['/sign-in', '/sign-up', '/'];

export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  console.log('Path:', path);
  console.log('Is Protected Route:', isProtectedRoute);
  console.log('Is Public Route:', isPublicRoute);

  // 3. Retrieve the session cookie
  const sessionCookie = (await cookies()).get('session')?.value;

  console.log('Session Cookie:', sessionCookie);

  // 4. Redirect logic
  if (isProtectedRoute && !sessionCookie) {
    // Redirect unauthenticated users from protected routes to /sign-in
    return NextResponse.redirect(new URL('/sign-in', req.nextUrl));
  }

  if (isPublicRoute && sessionCookie) {
    // Redirect authenticated users away from public routes to /dashboard
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
  }

  // Allow the request to proceed
  return NextResponse.next();
}
