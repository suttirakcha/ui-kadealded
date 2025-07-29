import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import CustomInput from "../custom/CustomInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "@/schemas/registerSchema";
import useAuthStore from "@/stores/useAuthStore";
import { toast } from "sonner";
import { DatePicker } from "../custom/DatePicker";
import { useEffect } from "react";

function RegisterDialog({ open, setOpen, onSwitchRegister }) {
  const registerUser = useAuthStore((state) => state.register);
  const { control, register, handleSubmit, formState, reset } = useForm({
    resolver: yupResolver(registerSchema),
  });
  const { errors, isSubmitting } = formState;

  useEffect(() => {
    if (!open) reset();
  }, [open])

  const onSubmit = async (data) => {
    try {
      const res = await registerUser(data);
      // console.log(data);
      toast.success(res.data.message);
      reset();
      setOpen(false);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data.message || error.message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <a className="navbar-link">Register</a>
      </DialogTrigger>
      <DialogContent className="p-10">
        <DialogHeader className="gap-4">
          <DialogTitle className="text-2xl font-bold">
            Register to Kadealded
          </DialogTitle>
          <DialogDescription>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-2"
            >
              <CustomInput
                {...register("name")}
                label="Name"
                error={errors.name?.message}
              />
              <CustomInput
                {...register("email")}
                label="Email"
                error={errors.email?.message}
              />
              <CustomInput
                {...register("password")}
                label="Password"
                error={errors.password?.message}
                type="password"
              />
              <CustomInput
                {...register("confirmPassword")}
                label="Confirm password"
                error={errors.confirmPassword?.message}
                type="password"
              />
              <DatePicker 
                name="birth_date"
                className="!pt-4 h-14"
                control={control}
              />

              <Button
                disabled={isSubmitting}
                type="submit"
                className="w-full bg-[#003F66] h-12 text-base mt-4"
              >
                Register
              </Button>
            </form>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="!justify-center">
          <h2>Already have an account?</h2>
          <button
            onClick={onSwitchRegister}
            className="text-[#003F66] cursor-pointer"
          >
            Sign in
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default RegisterDialog;
