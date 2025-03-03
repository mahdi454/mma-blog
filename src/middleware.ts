import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "./utils/supabase/middleware";

export async function middleware(request: NextRequest) {
  const url = new URL(request.url);

  // Update the session
  const sessionResponse = await updateSession(request);
  // If `updateSession` returns an error or redirect, handle it
  if (!sessionResponse.ok) {
    return sessionResponse; 
  }

  
  // Admin-specific logic
  if (url.pathname.startsWith("/admin")) {
    // Create a response for admin routes
    const response = NextResponse.next();
    response.headers.set("x-layout", "admin");
    return response;
  }

  // Default response for non-admin routes
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"], 
};


