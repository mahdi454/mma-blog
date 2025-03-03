"use server";

import { createClient } from "@/utils/supabase/server";

export const getUser = async () => {
  const supabase = await createClient();

  // Get the current session
  const { data: session, error: sessionError } = await supabase.auth.getSession();

  if (sessionError || !session?.session) {
    console.log("No valid session found, return null", sessionError?.message);
    return null;
  }

  // Get the authenticated user
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    console.error("Error fetching user:", userError?.message);
    return null;
  }



  return user;
};