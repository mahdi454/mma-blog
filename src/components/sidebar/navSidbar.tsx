import Link from "next/link";
import React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { ChevronsLeft } from "lucide-react";

const AppSidebar: React.FC = () => {
      const { open: isOpen } = useSidebar();
  return (
    <Sidebar className=" h-screen w-full sm:w-1/2 md:w-1/3 lg:w-1/4 text-gray-50 bg-black/5 backdrop-blur-[2px] lg:flex flex-col fixed left-0 top-0 ml-3 2xl:ml-6 border-r border-gray-700">
      <SidebarContent >
           <div className="w-full border-b border-gray-700 flex justify-between items-center">
           <p className="p-6 text-2xl font-bold">  MMA Blog</p>
             {isOpen && <SidebarTrigger
               as="div"
               className={`w-max mb-4 z-5000`}
               renderContent={() => (
                 <span className="flex items-center justify-center border-s border-y border-gray-700 rounded-tl-md rounded-bl-md  bg-black/5 backdrop-blur-sm ">
                   <span className="flex flex-col text-emerald-600">
                     <ChevronsLeft  size={10} />
                   
                     </span>
                   <span className="flex flex-col text-emerald-500">
                     <ChevronsLeft  size={12} />
                     <ChevronsLeft  size={12} />
                     </span>
                   <span className="flex flex-col  text-emerald-400  ">
                     <ChevronsLeft  size={14} />
                     <ChevronsLeft  size={14} />
                     <ChevronsLeft  size={14} />
               
                   </span>
                 </span>
               )}
             />}
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
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
