"use client";
import React from "react";
import { PlusCircle } from "lucide-react";

import Link from "next/link";
import Modal from "../ui/modals";
import NewArticle from "@/app/admin/(dashboard)/new-article-v1/articleModal";
import { useBlocksStore } from "@/app/admin/(dashboard)/new-article-v1/useBlockStore";

import UserProfile from "../user/userProfile";

export default function AdminNav() {
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const blocks = useBlocksStore((state) => state.blocks);



  return (
    <nav className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4">
       
      </div>
    </nav>
  );
}
