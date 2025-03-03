// hooks/useUser.ts
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";
interface Profile {
  id: string;
  username?: string;
  email?: string;
  avatar_url?: string;
}
export function useUser() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    const getUserSession = async () => {
      setIsLoading(true);
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error) {
        setUser(null);
        setProfile(null);
      } else {
        setUser(user);
        // Fetch the user's profile data
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user?.id)
          .maybeSingle();
        if (profileError) {
          console.error("Error fetching user profile:", profileError.message);
          setProfile(null);
        } else {
          setProfile(profileData);
        }
      }
      setIsLoading(false);
    };

    getUserSession();

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      getUserSession();
    });

    // Cleanup subscription on unmount
    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  return { user, profile, isLoading };
}
