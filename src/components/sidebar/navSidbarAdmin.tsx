
import React from "react";
import UserProfile from "../user/userProfile";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import Link from "next/link";
import { ChevronsLeft, GripHorizontal, PlusCircle } from "lucide-react";
import { Sidebar, SidebarContent, SidebarTrigger, useSidebar } from "../ui/sidebar";

const AdminSidebar: React.FC = () => {
    const { open: isOpen } = useSidebar();
  return (
        <Sidebar className=" h-screen w-full sm:w-1/2 md:w-1/3 lg:w-1/4 text-gray-50 bg-black/5 backdrop-blur-[2px] lg:flex flex-col fixed left-0 top-0 ml-3 2xl:ml-6 border-r border-gray-700">
          <SidebarContent >

      <div className="w-full border-b border-gray-700 flex justify-between items-center">
      <p className="p-6 text-2xl font-bold">  MMA Blog</p>
        {isOpen && <SidebarTrigger
          as="div"
          className={`w-max mb-4`}
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
      <nav className="flex flex-col p-4">
        <UserProfile />
          <div className="w-full px-4 space-y-6 mt-6">

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
      <Button asChild className="">
        <Link
          href="/admin/add-post"
          className="w-full items-center justify-between "
          >
          <span>Add Post</span>
          <PlusCircle size={20} />
        </Link>
      </Button>
          </div>
      </nav>
          </SidebarContent>
    </Sidebar>
  );
};

export default AdminSidebar;
