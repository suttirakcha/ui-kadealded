import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import useCategoryStore from "@/stores/useCategoryStore";

function DeleteCategoryDialog({ open, onOpenChange, category }) {
  const { deleteCategory, fetchAllCategories } = useCategoryStore();

  const handleDelete = async () => {
    try {
      const res = await deleteCategory(category?.id);
      toast.success(res.data.message);
      await fetchAllCategories();
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to delete category:", error);
      toast.error(error.response?.data.message || error.message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete category: {category?.name || ""}?</DialogTitle>
          <DialogDescription>This action cannot be undone.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
          <DialogClose asChild>
            <Button>Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteCategoryDialog;
