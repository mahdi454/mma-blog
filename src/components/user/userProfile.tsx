"use client";
import React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from "@/hooks/useUser";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import { redirect } from "next/navigation";
import { LogOut, UserPen } from "lucide-react";
import Link from "next/link";

export default function UserProfile() {
  const { user, profile } = useUser();
  if (!user?.email) return null;
  const signOut = async () => {
    const supabase = createClient();

    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error);
    }
    redirect("/admin/sign-in");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center gap-2 border-[1px] border-gray-600 py-1 pl-1 pr-6 rounded-full hover:cursor-pointer">
          <Image
            src={profile?.avatar_url || "/user1.png"}
            alt="Profile Picture"
            className="w-10 h-10 rounded-full object-cover  bg-gray-300"
            width={100}
            height={100}
            loading="lazy"
          />
          <div className="leading-tight">
            <p className="font-semibold tracking-wide">
              &#64;{profile?.username?.toUpperCase() || "Unknown"}
            </p>
            <p className="text-gray-400">{profile?.email}</p>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 bg-gray-900 text-gray-50 border-gray-800">
        <DropdownMenuLabel>My Profile</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-gray-800" />
        <DropdownMenuItem>
          <Link href={`/admin/setup-username`} className="flex w-full items-center justify-between">
            Edit Profile
            <DropdownMenuShortcut>
              <UserPen width={18} />
            </DropdownMenuShortcut>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-gray-800" />
        <DropdownMenuItem
          className="text-red-600 focus:text-red-600"
          onClick={signOut}
        >
          Sign Out
          <DropdownMenuShortcut>
            <LogOut width={18} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
