import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useSellerStore from "@/stores/useSellerStore";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { toast } from "sonner";
import CustomInput from "../custom/CustomInput";

function EditSellerDialog({ open, onOpenChange, seller }) {
  const { updateSeller, fetchAllSellers } = useSellerStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
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
      toast.error(error.response?.data.message || error.message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit seller: {seller?.name || ""}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <CustomInput 
            label="Name"
            error={errors.name?.message}
            {...register("name")}
            />
          <CustomInput 
            label="Email"
            error={errors.email?.message}
            {...register("email")}
          />
          <CustomInput 
            label="Phone number"
            error={errors.tel_number?.message}
            {...register("tel_number")}
          />
          {/* <Input
            placeholder="Company Name"
          /> */}
          {/* <Input
            {...register("email")}
            placeholder="Email"
          />
          <Input
            {...register("tel_number")}
            placeholder="Phone Number"
          /> */}

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
