import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useSellerStore from "@/stores/useSellerStore";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { toast } from "sonner";

function EditSellerDialog({ open, onOpenChange, seller, isSubmitting }) {
  const { updateSeller, fetchAllSellers } = useSellerStore();

  const {
    register,
    handleSubmit,
    reset,
    // formState: { isSubmitting }
  } = useForm({
    defaultValues: {
      name: seller?.name || "",
      email: seller?.email || "",
      phone: seller?.tel_number || "",
    }
  });

  useEffect(() => {
    if (seller) {
      reset({
        name: seller?.name || "",
        email: seller?.email || "",
        tel_number: seller?.tel_number || "",
      });
    }
  }, []);

  const onSubmit = async (data) => {
    try {
      const res = await updateSeller(seller?.id, data);
      toast.success(res.data.message);
      await fetchAllSellers();
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to update seller:", error);
      toast.error(res.data.message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit seller: {seller?.name || ""}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            {...register("name")}
            placeholder="Company Name"
          />
          <Input
            {...register("email")}
            placeholder="Email"
          />
          <Input
            {...register("tel_number")}
            placeholder="Phone Number"
          />

          <DialogFooter className="pt-4">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save"}
            </Button>
            <DialogClose asChild>
              <Button variant="ghost" type="button">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditSellerDialog;
