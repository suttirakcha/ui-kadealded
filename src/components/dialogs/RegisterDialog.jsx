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
import useAuthStore from "@/stores/useAuthStore";
import { toast } from "sonner";
import { DatePicker } from "../custom/DatePicker";
import { useEffect } from "react";
import LoginWithGoogleBtn from "../custom/LoginWithGoogleBtn";
import axios from "axios";

function RegisterDialog({ open, setOpen, onSwitchRegister }) {
  const [registeredData, setRegisteredData] = useState(null);
  //const registerUser = useAuthStore((state) => state.register);
  const { control, register, handleSubmit, formState, reset } = useForm({
    resolver: yupResolver(registerSchema),
  });
  const { errors, isSubmitting } = formState;

  useEffect(() => {
    if (!open) {
      reset();
      setRegisteredData(null); //Clear OTP view when dialog closes
    }
  }, [open, reset]);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("/otp/send", {
        email: data.email,
        otp_type: "VERIFY_EMAIL",
      });

      toast.success(response.data?.messsage || "OTP sent to your email.");

      setRegisteredData(data);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error?.message || "Something went wrong, please try again");
    }
  };

  const handleRegistrationComplete = () => {
    setOpen(false);
    setRegisteredData(null);
  };

  return (
    <Dialog open={open} onOpenChange={!registeredData && setOpen}>
      <DialogTrigger asChild>
        <a className="navbar-link">Register</a>
      </DialogTrigger>
      <DialogContent className="p-10">
        <DialogHeader className="gap-4">
          <DialogTitle className="text-2xl font-bold">
            {registeredData ? "Enter the OTP" : "Register to Kadealded"}
          </DialogTitle>
          <DialogDescription>
            {registeredData ? (
              <OTPPage
                email={registeredData?.email || ""}
                registeredData={registeredData}
                onGoBack={() => setRegisteredData(null)}
                onRegistrationComplete={handleRegistrationComplete}
                onResendSuccess={() =>
                  toast.success("New OTP sent to your email.")
                }
              />
            ) : (
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
                  {...register("last_name")}
                  label="Lastname"
                  error={errors.name?.message}
                />
                <CustomInput
                  {...register("email")}
                  label="Email"
                  error={errors.email?.message}
                />
                <CustomInput
                  {...register("tel_number")}
                  label="Phone Number"
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
                  label="Birth Date"
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
            )}
          </DialogDescription>
        </DialogHeader>
        {!registeredData && (
          <>
            <LoginWithGoogleBtn />
            <DialogFooter className="!justify-center">
              <h2>Already have an account?</h2>
              <button
                onClick={onSwitchRegister}
                className="text-[#003F66] cursor-pointer"
              >
                Sign in
              </button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default RegisterDialog;
