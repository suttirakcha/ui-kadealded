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
import { loginSchema } from "@/schemas/loginSchema";

function LoginDialog({ open, setOpen, onSwitchLogin }) {
  const { register, handleSubmit, formState, reset } = useForm({
    resolver: yupResolver(loginSchema),
  });
  const { errors, isSubmitting } = formState;

  // TODO: fetch register post from api
  const onSubmit = (data) => {
    try {
      console.log(data);
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <a className="navbar-link">Login</a>
      </DialogTrigger>
      <DialogContent className="p-10">
        <DialogHeader className="gap-4">
          <DialogTitle className="text-2xl font-bold">
            Login to Kadealded
          </DialogTitle>
          <DialogDescription>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-2"
            >
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

              <Button
                disabled={isSubmitting}
                type="submit"
                className="w-full bg-[#003F66] h-12 text-base mt-4"
              >
                Login
              </Button>
            </form>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="!justify-center">
          <h2>Don't have an account?</h2>
          <button onClick={onSwitchLogin} className="text-[#003F66] cursor-pointer">Register</button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default LoginDialog;
