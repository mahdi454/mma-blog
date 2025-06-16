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
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <Link href="/admin" className="hover:cursor-pointer">
              <span className="font-bold text-lg">Dashboard</span>
            </Link>

            <a
              href="/admin/new-article"
              className="flex items-center space-x-2 hover:text-gray-300 transition-colors"
            >
              <PlusCircle size={20} />
              <span>New Article</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <div>
              {/* <button
                onClick={() => setIsModalOpen(true)}
                disabled={ !blocks.length}
                className="bg-white text-black px-6 py-1 sm:py-2 rounded-full hover:bg-gray-300 transition-colors tracking-wider hover:cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                Publish
              </button>
              <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                closeOnOutsideClick={false}
              >
                <NewArticle onClose={() => setIsModalOpen(false)} />
              </Modal> */}
            </div>

            <UserProfile />
          </div>
        </div>
      </div>
    </nav>
  );
}
