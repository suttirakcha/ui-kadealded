import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { toast } from "sonner";
import useCategoryStore from "@/stores/useCategoryStore";
import CustomInput from "../custom/CustomInput";

function EditCategoryDialog({ open, onOpenChange, category }) {
  const { updateCategory, fetchAllCategories } = useCategoryStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: category?.name || "",
      notes: category?.notes || "",
    },
  });

  useEffect(() => {
    if (category) {
      reset({
        name: category?.name || "",
        notes: category?.notes || "",
      });
    }
  }, [category, reset]);

  const onSubmit = async (data) => {
    try {
      const res = await updateCategory(category?.id, data);
      toast.success(res.data.message);
      await fetchAllCategories();
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to update category:", error);
      toast.error(res.data.message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit category: {category.name}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          {/* <Input {...register("name")} placeholder="Name" /> */}
          <CustomInput 
            label="Name"
            error={errors.name?.message}
            {...register("name")}
          />
          <CustomInput 
            label="Notes"
            type="textarea"
            error={errors.notes?.message}
            {...register("notes")}
          />
          {/* <textarea
            placeholder="Notes"
            {...register("notes")}
            className="w-full resize-none border p-2 rounded"
          ></textarea> */}

          <DialogFooter className="pt-4">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save"}
            </Button>
            <DialogClose asChild>
              <Button variant="ghost" type="button">
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditCategoryDialog;
