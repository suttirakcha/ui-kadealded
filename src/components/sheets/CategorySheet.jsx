import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import useCategoryStore from "@/stores/useCategoryStore";
import { Menu } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router";

function CategorySheet() {
  const { categories, fetchAllCategories } = useCategoryStore();

  useEffect(() => {
    const run = async () => {
      await fetchAllCategories();
    };

    run();
  }, []);

  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="cursor-pointer" />
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle className="text-2xl mb-4">Categories</SheetTitle>
          <SheetDescription className="flex flex-col gap-4">
            {categories.map((category) => (
              <Link to="" key={category.id}>
                {category.name}
              </Link>
            ))}
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

export default CategorySheet;
