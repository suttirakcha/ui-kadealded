import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Sidebar from "../custom/Sidebar";

function AdminSidebarSheet() {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="!border-0 w-[280px]">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
}

export default AdminSidebarSheet;
