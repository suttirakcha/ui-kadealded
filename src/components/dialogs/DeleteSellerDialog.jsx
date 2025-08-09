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
import useSellerStore from "@/stores/useSellerStore";
import { toast } from "sonner";

function DeleteSellerDialog({ open, onOpenChange, seller }) {
  const { deleteSeller, fetchAllSellers } = useSellerStore();

  const handleDelete = async () => {
    try {
      const res = await deleteSeller(seller?.id);
      toast.success(res.data.message);
      await fetchAllSellers();
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to delete seller:", error);
      toast.error(error.response?.data.message || error.message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete seller: {seller?.name || ""}?</DialogTitle>
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

export default DeleteSellerDialog;
