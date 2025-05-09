import React from "react";
import { Menu } from "lucide-react";
import Link from "next/link";
import MaxWidthWrapper from "../maxWidthWrapper";
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
  return (
    <MaxWidthWrapper>

      <nav className="  bg-black/50 backdrop-blur-[1px] text-white">

        <div className="flex justify-between items-center h-16 md:h-20">


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
    </MaxWidthWrapper>
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
