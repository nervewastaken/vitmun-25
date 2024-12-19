import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
export default clerkMiddleware(() => {
  return NextResponse.next(); // Proceed if authenticated
});

export const config = {
  matcher: [
    "/admin/:path*", // Protect all `/admin` routes
    "/api/admin/:path*",
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
