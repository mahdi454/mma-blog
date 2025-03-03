"use server";
import { z } from "zod";
import { redirect } from "next/navigation";
import { validatedAction } from "@/lib/validate";
import config from "@/config";
import { createClient } from "@/utils/supabase/server";

// const signInSchema = z.object({
//   email: z.string().email().min(3).max(255),
//   password: z.string().min(8).max(100),
// });

// export const signIn = validatedAction(signInSchema, async (data) => {
//   const supabase = await createClient();
//   const { email, password } = data;

//   const { data: signInData, error } = await supabase.auth.signInWithPassword({
//     email,
//     password,
//   });

//   if (error) {
//     return { error: "Invalid credentials. Please try again." };
//   }
//   const { error: userDataError } = await supabase
//     .from("user_data")
//     .select("*")
//     .eq("user_id", signInData.user?.id)
//     .single();

//   if (userDataError && userDataError.code === "PGRST116") {
//     // No user_data entry found, create one
//     const { error: insertError } = await supabase
//       .from("user_data")
//       .insert({ user_id: signInData.user?.id });
//     if (insertError) {
//       console.error("Error creating user_data entry:", insertError);
//       // Consider how you want to handle this error
//     }
//   }
//   // If sign-in is successful, redirect to dashboard
//   redirect("/admin");
// });

// const signUpSchema = z.object({
//   email: z.string().email(),
//   username: z.string().min(8),
// });

// export const signUp = validatedAction(signUpSchema, async (data) => {
//   const supabase = await createClient();
//   const { email, username } = data;

//   const { data: signUpData, error: signUpError } = await supabase.auth.signInWithOtp({
//     email,
    
//   });
//   if (signUpError) {
//     return { error: signUpError.message };
//   }
//   // Check if user_data entry exists and create i
//   const { error: insertError } = await supabase
//     .from("user_data")
//     .insert({ user_id: signUpData?.user?.id });

//   if (insertError) {
//     console.error("Error creating user_data entry:", insertError);
//     // Consider how you want to handle this error
//   }
//   redirect("/app");
// });
export const signInWithMagicLink = validatedAction(
  z.object({
    email: z.string().email(),
    redirect: z.string().optional(),
  }),
  async (data) => {
    const supabase = await createClient();
    const { email } = data;
    const redirectTo = `${config.domainName}/admin/api/auth/callback`;

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${redirectTo}?redirect=${encodeURIComponent(
          "/admin"
        )}`,
      },
    });
    if (error) {
      console.error("Error sending magic link:", error);
      return { error: error.message };
    }

    return { success: "Magic link sent to your email." };
  }
);


export const signOut = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/sign-in");
};
