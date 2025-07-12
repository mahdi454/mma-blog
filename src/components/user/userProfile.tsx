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
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import { redirect } from "next/navigation";
import { LogOut, PlusCircle, UserPen } from "lucide-react";
import Link from "next/link";
import { useUser } from "@/app/context/userContext";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

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
    <div className="flex items-center justify-center flex-col w-full gap-6">
      <div className="flex items-center justify-center flex-col gap-3">
        <Image
          src={profile?.avatar_url || "/user1.png"}
          alt="Profile Picture"
          className="w-32 h-32 rounded-full object-cover  bg-gray-300"
          width={400}
          height={400}
          loading="lazy"
        />
        <div className="leading-tight text-center">
          <p className="font-semibold tracking-wide">
            &#64;{profile?.username?.toUpperCase() || "Unknown"}
          </p>
          <p className="text-gray-400">{profile?.email}</p>
        </div>
      </div>
      <div className="w-full px-4 space-y-6">
      <div className="w-full flex flex-col gap-3">
        <Button asChild>
          <Link
            href={`/admin/setup-username`}
            className="flex w-full items-center justify-between"
          >
            Edit Profile
            <UserPen width={18} />
          </Link>
        </Button>
        <Button
          className="text-red-600 focus:text-red-600 flex w-full items-center justify-between opacity-85"
          onClick={signOut}
        >
          Sign Out
          <LogOut width={18} />
        </Button>
      </div>
      <div className="relative">
        <Separator className="bg-slate-600"/>
        <span className="absolute text-sm bg-slate-950 px-1 -bottom-[10px] left-1/2 transform -translate-x-1/2 rounded-full">OR</span>
      </div>
      <Button asChild className="">
        <Link
          href="/admin/new-article"
          className="w-full items-center justify-between "
        >
          <span>New Article</span>
          <PlusCircle size={20} />
        </Link>
      </Button>
      </div>
    </div>
  );
}
