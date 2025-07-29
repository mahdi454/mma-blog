"use client";

import { SidebarTrigger, useSidebar } from "../ui/sidebar";
import AppSidebar from "../sidebar/navSidbar";
import AdminSidebar from "../sidebar/navSidbarAdmin";
import Footer from "../layout/Footer";
import { ChevronsLeft, ChevronsRight, GripHorizontal } from "lucide-react";

export default function ContentLayout({
  children,
  isAdmin,
}: {
  children: React.ReactNode;
  isAdmin: boolean;
}) {
  const { open: isOpen } = useSidebar();

  return (
    <div
      className={`
        min-h-screen grid text-slate-50
        grid-cols-1
        md:grid-cols-3
        lg:grid-cols-4
      `}
    >
      {/* Sidebar always rendered, but takes no grid column when closed */}
      <aside
        className={`
          transition-all w-full
          ${isOpen ? "block col-span-1" : "hidden"}
        `}
      >
        {isAdmin ? <AdminSidebar /> : <AppSidebar />}
      </aside>

      <main
        className={`
          w-full min-h-screen
          transition-all
          ${
            isOpen
              ? " md:col-span-2 lg:col-span-3"
              : " md:col-span-3 lg:col-span-4"
          }
        `}
      >
        {!isOpen && (
          <SidebarTrigger
            as="div"
            className={`fixed  rounded z-50 left-0 top-12 `}
            renderContent={() => (
              <span className="flex items-center justify-center border border-gray-700 rounded-tr-md rounded-br-md pl-4 pr-5 bg-black/5 backdrop-blur-sm">
                <span className="flex flex-col  text-emerald-400  ">
                  <ChevronsRight size={14} />
                  <ChevronsRight size={14} />
                  <ChevronsRight size={14} />
                </span>

                <span className="flex flex-col text-emerald-500">
                  <ChevronsRight size={12} />
                  <ChevronsRight size={12} />
                </span>
                <span className="flex flex-col text-emerald-600">
                  <ChevronsRight size={10} />
                </span>
              </span>
            )}
          />
        )}

        {children}
        <Footer />
      </main>
    </div>
  );
}
