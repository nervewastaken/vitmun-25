import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { NextURL } from "next/dist/server/web/next-url";

export default clerkMiddleware((req) => {
  const url = new NextURL(req.url, { base: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000" });
  const pathname = url.pathname; // Get the pathname from the NextURL instance

  // Apply authentication check for `/admin` and `/api/admin` routes
  if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
    const { userId } = req.auth;

    // If the user is not authenticated, return a 401 Unauthorized response
    if (!userId) {
      return NextResponse.json({ error: "Bad auth!" }, { status: 401 });
    }
  }

  return NextResponse.next(); // Proceed if authenticated
});



export const config = {
  matcher: [
    '/admin/:path*',       // Protect all `/admin` routes
    '/api/admin/:path*', 
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};