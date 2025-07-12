
import React from "react";
import UserProfile from "../user/userProfile";

const AdminSidebar: React.FC = () => {
  return (
    <aside className="hidden h-screen w-full text-gray-50 bg-black/5 backdrop-blur-[3px] lg:flex flex-col sticky top-0 border-r border-gray-700">
      <div className="p-6 text-2xl font-bold border-b border-gray-700">
        MMA Blog
      </div>
      <nav className="flex flex-col p-4">
        <UserProfile />
      </nav>
    </aside>
  );
};

export default AdminSidebar;
