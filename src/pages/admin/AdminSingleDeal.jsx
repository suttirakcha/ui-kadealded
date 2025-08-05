import Loading from "@/components/icons/Loading";
import useDealStore from "@/stores/useDealStore";
import { useEffect } from "react";
import { useParams } from "react-router";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import CustomInput from "@/components/custom/CustomInput";
import useCategoryStore from "@/stores/useCategoryStore";
import useSellerStore from "@/stores/useSellerStore";
import { DatePicker } from "@/components/custom/DatePicker";

function AdminSingleDeal() {

  const { categories, fetchAllCategories } = useCategoryStore();
  const { sellers, fetchAllSellers } = useSellerStore();
  const { id } = useParams();
  const {
    currentDeal: deal,
    getDealById,
    getAllDeals,
    clearCurrentDeal,
    updateDealById,
  } = useDealStore();

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      title: "",
      deal_status: "",
      start_at: "",
      deadline: "",
      category: "",
      seller: "",
      description: "",
      category_id: "",
      seller_id: ""
    }
  });

  useEffect(() => {
    const run = async () => {
      if (!id) return;
      const res = await getDealById(id);
      reset(res.data.result);
      getAllDeals();
      fetchAllCategories();
      fetchAllSellers();
    };

    run();
    return () => clearCurrentDeal();
  },  [id, getDealById, reset, fetchAllCategories, fetchAllSellers]);

  const onSubmit = async (data) => {
    try {
      await updateDealById(id, data);
      toast.success("Updated successfully");
    } catch (error) {
      toast.error("Update failed");
    }
  };

  if (!deal) return <Loading />;

  const statusOptions = ["PRE_OPEN", "OPEN", "COMPLETED", "EXPIRED", "CANCELLED"];

  return (
    <div>
      <h2 className="text-xl font-bold mb-3 p-5">Edit Deal</h2>
      <div className='mx-auto p-10 w-200'>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 px-5">
          <div className='flex flex-col gap-4 mt-10'>
            <CustomInput
              label="Title"
              type="text"
              {...register("title")}

            />
            <label className='font-medium peer-focus:-top-4 peer-focus:text-black peer-focus:text-sm peer-placeholder-shown:top-1 peer-placeholder-shown:text-base peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-sm peer-not-placeholder-shown:text-black transition-all duration-200 -z-1 left-0'>
              Category</label>
            <select className='border rounded p-2' name="category" {...register("category_id")} >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            <label className='font-medium peer-focus:-top-4 peer-focus:text-black peer-focus:text-sm peer-placeholder-shown:top-1 peer-placeholder-shown:text-base peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-sm peer-not-placeholder-shown:text-black transition-all duration-200 -z-1 left-0'>
              Status</label>
            <select className='border rounded p-2' {...register("deal_status")} >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>

            <label className='font-medium peer-focus:-top-4 peer-focus:text-black peer-focus:text-sm peer-placeholder-shown:top-1 peer-placeholder-shown:text-base peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-sm peer-not-placeholder-shown:text-black transition-all duration-200 -z-1 left-0'>
              Seller</label>
            <select className='border rounded p-2' name="seller" {...register("seller_id")} >
              {sellers.map((seller) => (
                <option key={seller.id} value={seller.id}>
                  {seller.name}
                </option>
              ))}
            </select>

            <label className='font-medium peer-focus:-top-4 peer-focus:text-black peer-focus:text-sm peer-placeholder-shown:top-1 peer-placeholder-shown:text-base peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-sm peer-not-placeholder-shown:text-black transition-all duration-200 -z-1 left-0'>
              Start At</label>
            <DatePicker
              label="Start Date"
              name="start_at"
              {...register("start_at")}
              control={control}
            />

            <label className='font-medium peer-focus:-top-4 peer-focus:text-black peer-focus:text-sm peer-placeholder-shown:top-1 peer-placeholder-shown:text-base peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-sm peer-not-placeholder-shown:text-black transition-all duration-200 -z-1 left-0'>
              Deadline</label>
            <DatePicker
              label="Deadline"
              name="deadline"
              {...register("deadline")}
              control={control}
            />

            <textarea
              {...register("description")}
              placeholder='Description'
              className='p-3 w-full h-50 border border-gray-200 rounded-sm resize-none' >
            </textarea>

          </div>
          {/* <div>
          <label className="block font-medium">Description</label>
          <textarea
            className="input resize-none"
            {...register("description")}
            defaultValue={deal.description}
          />
        </div> */}

          <div className="space-y-4">
            <h1 className="text-xl font-bold">Images</h1>
            <div className="flex items-center gap-2">
              {deal?.images?.map((image) => (
                <img
                  src={image.image_url}
                  alt={image.id}
                  key={image.id}
                  className="w-20 h-20 rounded-md object-cover"
                />
              ))}
            </div>
          </div>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default AdminSingleDeal;
