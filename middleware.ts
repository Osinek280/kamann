import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { parseJwt } from './auth/user';

// 1. Specify protected and public routes
const protectedRoutes = ['/dashboard'];
const publicRoutes = ['/sign-in', '/sign-up'];

export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  // 3. Retrieve the session cookie
  const sessionToken = (await cookies()).get('session')?.value;

  // 4. Redirect logic
  // Redirect unauthenticated users from protected routes to /sign-in
  if (isProtectedRoute && !sessionToken) {
    return NextResponse.redirect(new URL('/sign-in', req.nextUrl));
  }

  // Redirect authenticated users away from public routes to /dashboard
  if (isPublicRoute && sessionToken) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
  }

  if(!sessionToken) { 
    return NextResponse.next(); 
  }
  
  const { roles } = parseJwt(sessionToken)

  console.log(roles);

  if(path.startsWith('/dashboard/admin' ) && !roles.includes('ADMIN')) {
    return NextResponse.redirect(new URL('/dashboard/instructor', req.nextUrl));
  }
  if(path.startsWith('/dashboard/instructor' ) && !roles.includes('INSTRUCTOR')) {
    return NextResponse.redirect(new URL('/dashboard/client', req.nextUrl));
  }
  if(path.startsWith('/dashboard/client' ) && !roles.includes('CLIENT')) {
    return NextResponse.redirect(new URL('/dashboard/admin', req.nextUrl));
  }

  if(path === '/dashboard') {
    return NextResponse.redirect(new URL(`/dashboard/${roles[0].toLowerCase()}`, req.nextUrl));
  }

  return NextResponse.next();
}