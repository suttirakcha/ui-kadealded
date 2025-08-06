import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomInput from "@/components/custom/CustomInput";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { sellerSchema } from "@/schemas/sellerSchema";
import useSellerStore from "@/stores/useSellerStore";

function AdminCreateSeller() {
  const { createSeller } = useSellerStore();
  const {
    register: seller,
    handleSubmit,
    formState,
    reset,
  } = useForm({
    resolver: yupResolver(sellerSchema),
  });
  const { errors, isSubmitting } = formState;

  const onSubmit = async (data) => {
    try {
      const res = await createSeller(data);
      toast.success(res.data.message);
      reset();
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data.message || error.message);
    }
  };
  return (
    <div className="flex flex-col justify-between mb-4">
      <h2 className="text-3xl font-bold">Create Seller</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="relative">
        <div className="mx-auto">
          <div className="flex flex-col gap-4 mt-10 mb-15">
            <CustomInput
              label="Company"
              {...seller("name")}
              error={errors.name?.message}
            />
            <CustomInput
              label="Email"
              {...seller("email")}
              error={errors.email?.message}
            />
            <CustomInput
              label="Number"
              {...seller("tel_number")}
              error={errors.tel_number?.message}
            />
          </div>
          <Button
            variant="default"
            className="px-10 py-2 mt-5"
            type="submit"
            disabled={isSubmitting}
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
export default AdminCreateSeller;
