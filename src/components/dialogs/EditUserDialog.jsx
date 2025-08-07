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
import useUserStore from "@/stores/useUserStore";
import { DatePicker } from "../custom/DatePicker";
import CustomInput from "../custom/CustomInput";
import useAuthStore from "@/stores/useAuthStore";

function EditUserDialog({ open, onOpenChange, user }) {
  const { updateUserById, fetchAllUsers } = useUserStore();
  const { updateAuthUser } = useAuthStore();

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      name: user?.name || "",
      last_name: user?.last_name || "",
      email: user?.email || "",
      tel_number: user?.tel_number || "",
      birth_date: user?.birth_date || "",
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user?.name || "",
        last_name: user?.last_name || "",
        email: user?.email || "",
        tel_number: user?.tel_number || "",
        birth_date: user?.birth_date || "",
      });
    }
  }, [user, reset]);

  const onSubmit = async (data) => {
    try {
      const res = await updateUserById(user?.id, data);
      toast.success(res.data.message);
      await fetchAllUsers();
      updateAuthUser(data);
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to update user:", error);
      toast.error(error.response.data.message || error.message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit user: {user?.name || ""}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <CustomInput label="Name" {...register("name")} />
          <CustomInput label="Last name" {...register("last_name")} />
          <CustomInput label="Email" {...register("email")} />
          <CustomInput label="Phone number" {...register("tel_number")} />
          {/* <Input {...register("tel_number")} placeholder="Phonenumber" /> */}
          <DatePicker label="Birth Date" name="birth_date" control={control} />
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

export default EditUserDialog;
