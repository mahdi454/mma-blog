"use client";
import React, { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import Link from "next/link";
import MaxWidthWrapper from "../wrapper/maxWidthWrapper";
import { MenuSheet } from "./menu";
import Image from "next/image";
import { Mouse_Memoirs } from "next/font/google";

const IBM_Font = Mouse_Memoirs({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
});
const navigationItems = [
  { text: "News", href: "#" },
  { text: "UFC", href: "#" },
  { text: "PFL", href: "#" },
  { text: "ONE Championship", href: "#" },
  { text: "Bellator MMA", href: "#" },
  { text: "Boxing", href: "#" },
];

export default function Navbar() {
 const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Handle scroll hide/show
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setIsVisible(false); // Hide on scroll down
      } else {
        setIsVisible(true); // Show on scroll up
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);



  return (
    <div
      className={`sticky top-0 z-10 w-full transition-transform duration-500 ease-in-out  ${isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
    >
      <nav className="px-4 2xl:px-8 ">

        <div className="flex justify-between items-center h-16 md:h-20 border-x-[1px] border-red-500">


          <Link href="/" className="h-32  md:h-40 w-36 md:w-44 ml-2 md:ml-4">
            <Image
              width={200}
              height={200}
              src='/mma_logo.png'
              alt="logo-image"
              className="w-full h-full object-cover"

            />

          </Link>
          <MenuSheet />


        </div>
      </nav>
      </div>
  );
}

function NavLink({ text, href }: { text: string; href: string }) {
  return (
    <a
      href={href}
      className="hover:text-gray-300 transition-colors text-sm font-medium"
    >
      {text}
    </a>
  );
}
