import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Grip } from "lucide-react";

interface SheetSidebarProps {
  children: React.ReactNode;
}

export function SheetSidebar({ children }: SheetSidebarProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button> <Grip/></button>
      </SheetTrigger>
      <SheetContent className="relative" >
        {children}
      </SheetContent>
    </Sheet>
  );
}