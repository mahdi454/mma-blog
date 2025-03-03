// "use server"
// import { createClient } from "@/utils/supabase/server";
// import { NextResponse } from "next/server";

// export async function GET(request: Request) {
//   const requestUrl = new URL(request.url);
//   const code = requestUrl.searchParams.get("code");
//   const redirectPath = requestUrl.searchParams.get("redirect") || "/admin";

//   if (!code) {
//     return NextResponse.redirect(`${requestUrl.origin}/admin/sign-in?error=missing_code`);
//   }

//   const supabase = await createClient();
//   const { error } = await supabase.auth.exchangeCodeForSession(code);

//   if (error) {
//     console.error("Error exchanging code for session:", error);
//     return NextResponse.redirect(`${requestUrl.origin}/admin/sign-in?error=session_exchange`);
//   }

//   // Redirect to the intended location after successful login
//   const absoluteRedirectUrl = new URL(redirectPath, requestUrl.origin);
//   return NextResponse.redirect(absoluteRedirectUrl);
// }
"use server";

import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const redirectPath = requestUrl.searchParams.get("redirect") || "/admin";

  if (!code) {
    return NextResponse.redirect(`${requestUrl.origin}/admin/sign-in?error=missing_code`);
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    console.error("Error exchanging code for session:", error);
    return NextResponse.redirect(`${requestUrl.origin}/admin/sign-in?error=session_exchange`);
  }

  // Get the user's ID from the session
  const userId = data.user?.id;

  if (!userId) {
    console.error("No user ID found in session.");
    return NextResponse.redirect(`${requestUrl.origin}/admin/sign-in?error=no_user_id`);
  }

  // Check if the user has a username in the profiles table
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("username")
    .eq("id", userId)
    .single();

  if (profileError || !profile?.username) {
    // Redirect to the username setup page
    const setupUsernameUrl = new URL("/admin/setup-username", requestUrl.origin);
    setupUsernameUrl.searchParams.set("redirect", redirectPath);
    return NextResponse.redirect(setupUsernameUrl);
  }

  // Redirect to the intended location after successful login
  const absoluteRedirectUrl = new URL(redirectPath, requestUrl.origin);
  return NextResponse.redirect(absoluteRedirectUrl);
}