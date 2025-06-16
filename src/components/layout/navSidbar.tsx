import Link from "next/link";
import React from "react";

const Sidebar: React.FC = () => {
    return (
        <aside className="hidden h-screen w-full text-gray-50 bg-black/5 backdrop-blur-[3px] lg:flex flex-col sticky top-0 ml-3 2xl:ml-6 border-r border-gray-700">
            <div className="p-6 text-2xl font-bold border-b border-gray-700">
                MMA Blog
            </div>
            <nav className="flex-1 p-4">
                <ul className="space-y-4">
                    <li>
                        <Link
                            href="/"
                            className="block py-2 px-4 rounded hover:bg-gray-700 transition"
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/about"
                            className="block py-2 px-4 rounded hover:bg-gray-700 transition"
                        >
                            About
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/posts"
                            className="block py-2 px-4 rounded hover:bg-gray-700 transition"
                        >
                            Posts
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/contact"
                            className="block py-2 px-4 rounded hover:bg-gray-700 transition"
                        >
                            Contact
                        </Link>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;