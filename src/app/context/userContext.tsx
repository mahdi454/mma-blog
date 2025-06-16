"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";

interface Profile {
  id: string;
  username?: string;
  email?: string;
  avatar_url?: string;
}

interface UserContextType {
  user: User | null;
  profile: Profile | null;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType>({
  user: null,
  profile: null,
  isLoading: true,
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
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

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      getUserSession();
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, profile, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
