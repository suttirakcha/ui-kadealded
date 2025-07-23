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

function RegisterDialog() {
  const { register, handleSubmit } = useForm();

  // TODO: fetch register post from api
  const onSubmit = (data) => {
    try {
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>Register</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Register to Kadealded
          </DialogTitle>
          <DialogDescription>
            {/* Mockup register, will integrate with backend later */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <CustomInput {...register("username")} label="Username" />
              <CustomInput {...register("email")} label="Email" />
              <CustomInput {...register("password")} label="Password" />
              <CustomInput {...register("confirm_password")} label="Confirm password" />

              <Button type="submit" className="w-full bg-[#003F66] h-12 text-base">
                Register
              </Button>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default RegisterDialog;
