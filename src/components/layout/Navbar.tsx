import React from "react";
import { Menu } from "lucide-react";
import Link from "next/link";

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
    <nav className="bg-gray-950 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/">
              <div className="text-xl font-bold mr-8">MMA Hub</div>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <NavLink key={item.text} text={item.text} href={item.href} />
              ))}
            </div>
          </div>

          <div className="md:hidden">
            <Menu className="h-6 w-6 cursor-pointer" />
          </div>
        </div>
      </div>
    </nav>
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
