import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { toast } from "sonner";
import useUserStore from "@/stores/useUserStore";
import { DatePicker } from "../custom/DatePicker";

function EditUserDialog({ open, onOpenChange, user }) {
    const { updateUserById, fetchAllUsers } = useUserStore();

    const {
        control,
        register,
        handleSubmit,
        reset,
        formState: { isSubmitting }
    } = useForm({
        defaultValues: {
            name: user?.name || "",
            last_name: user?.last_name || "",
            email: user?.email || "",
            tel_number: user?.tel_number || "",
            birth_date: user?.birth_date || ""
        }
    });

    useEffect(() => {
        if (user) {
            reset({
                name: user?.name || "",
                last_name: user?.last_name || "",
                email: user?.email || "",
                tel_number: user?.tel_number || "",
                birth_date: user?.birth_date || ""
            });
        }
    }, [user, reset]);

    const onSubmit = async (data) => {
        try {
            const res = await updateUserById(user?.id, data);
            toast.success(res.data.message);
            await fetchAllUsers();
            onOpenChange(false)
        } catch (error) {
            console.error("Failed to update user:", error);
            toast.error(res.data.message);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit User</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <Input
                        {...register("name")}
                        placeholder="Name"
                    />
                    <Input
                        {...register("last_name")}
                        placeholder="Lastname"
                    />
                    <Input
                        {...register("email")}
                        placeholder="Email"
                    />
                    <Input
                        {...register("tel_number")}
                        placeholder="Phonenumber"
                    />
                    <DatePicker
                        label="Birth Date"
                        name="birth_date"
                        className="!pt-4 h-14"
                        control={control}
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

export default EditUserDialog;
