import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

function CategorySheet() {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="cursor-pointer"/>
      </SheetTrigger>
      <SheetContent side="left">
        {/* TODO: add category menus */}

        <SheetHeader>
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

export default CategorySheet;
