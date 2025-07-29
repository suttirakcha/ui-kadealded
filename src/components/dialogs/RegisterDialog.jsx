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
import { useState } from "react";
import OTPPage from "@/pages/OTPPage";

function RegisterDialog({ open, setOpen, onSwitchRegister }) {
  const [registeredData, setRegisteredData] = useState(null);
  const { register, handleSubmit, formState, reset } = useForm({
    resolver: yupResolver(registerSchema),
  });
  const { errors, isSubmitting } = formState;

  // TODO: fetch register post from api
  const onSubmit = (data) => {
    try {
      setRegisteredData(data);
      // console.log(data);
      reset();
    } catch (error) {
      console.log(error);
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
            {registeredData ? <OTPPage email={registeredData?.email || ""} onGoBack={() => setRegisteredData(null)} /> :  <form
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

              <Button
                disabled={isSubmitting}
                type="submit"
                className="w-full bg-[#003F66] h-12 text-base mt-4"
              >
                Register
              </Button>
            </form>}
           
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
