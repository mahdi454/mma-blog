import { headers } from "next/headers"; // Import headers to access the request
import AdminNav from "./AdminNav";
import Navbar from "./Navbar";

export default async function MainNav() {
    const headersResult = await headers();
  
    // Get the custom "x-layout" header
    const layoutType = headersResult.get("x-layout"); 
    
    // Check if the path is for the admin route
    const isAdmin = layoutType === "admin";
  if (isAdmin) {
    return <AdminNav />;
  }
  
  return <Navbar />;
}

