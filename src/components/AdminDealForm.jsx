import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { adminApi } from "@/api/routesApi";
import { dealSchema } from "@/schemas/dealSchema";
import CustomInput from "@/components/custom/CustomInput";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/custom/DatePicker";
import { toast } from "sonner";
import useCategoryStore from "@/stores/useCategoryStore";
import { useEffect } from "react";
import useSellerStore from "@/stores/useSellerStore";
import useAuthStore from "@/stores/useAuthStore";
import { useNavigate } from "react-router";
import useDealStore from "@/stores/useDealStore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CustomSelectDropdown from "./custom/CustomSelectDropdown";

function AdminDealForm({ deal }) {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { categories, fetchAllCategories } = useCategoryStore();
  const { sellers, fetchAllSellers } = useSellerStore();

  const { updateDealById, clearCurrentDeal, getAllDeals } = useDealStore();

  const {
    control,
    register: setDeal,
    handleSubmit,
    formState,
    reset,
  } = useForm({
    defaultValues: {
      title: deal?.title || "",
      description: deal?.description || "",
      start_at: deal?.start_at || "",
      deadline: deal?.deadline || "",
      seller: deal?.seller?.name || "",
      category: deal?.category?.name || "",
      deal_status: deal?.deal_status || "",
      // images: uploadRes.data.url,
      max_participants: deal?.max_participants || "",
      creator_name: user?.name || "Admin",
    },
    resolver: yupResolver(dealSchema),
  });

  const dealStatusOptions = [
    { label: "Pre Open", value: "PRE_OPEN" },
    { label: "Open", value: "OPEN" },
    { label: "Completed", value: "COMPLETED" },
    { label: "Expired", value: "EXPIRED" },
    { label: "Cancelled", value: "CANCELLED" },
  ];

  const { errors, isSubmitting } = formState;

  useEffect(() => {
    const run = async () => {
      await fetchAllCategories();
      await fetchAllSellers();
    };
    run();

    return () => clearCurrentDeal();
  }, []);

  const onSubmit = async (data) => {
    try {
      const imgForm = new FormData();
      //   for (let i = 0; i < data.image.length; i++) {
      //     imgForm.append("image", data.image[i]);
      //   }

      //   const uploadRes = await adminApi.post("/deals", imgForm, {
      //     headers: { "Content-Type": "multipart/form-data" },
      //   });

      const payload = {
        title: data.title,
        description: data.description,
        start_at: data.start_at,
        deadline: data.deadline,
        deal_status: data.deal_status,
        // images: uploadRes.data.url,
        max_participants: data.max_participants,
        seller_id: data.seller_id,
        category_id: data.category_id,
        creator: user?.id,
      };

      const res = await (deal
        ? updateDealById(deal.id, payload)
        : adminApi.post("/deals", payload));
      toast.success(res.data.message);
      reset(data);
      navigate("/admin/deal");
      // await getAllDeals();
    } catch (error) {
      toast.error(error.response?.data.message || error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="relative">
      <div className="mx-auto">
        <div className="flex flex-col gap-4 mt-10 mb-15">
          <CustomInput
            label="Title"
            {...setDeal("title")}
            error={errors.title?.message}
          />
          <CustomInput
            label="Description"
            type="textarea"
            {...setDeal("description")}
            error={errors.description?.message}
          />
          {/* <CustomSelectDropdown
            label="Category"
            initialValue="-- Select category --"
            error={errors.category_name?.message}
            options={categories}
            control={control}
            {...setDeal("category_name")}
          />
          <p>{errors.category_name?.message}</p> */}
          <label className="pt-4">
            <div className="relative">
              <select
                className="text-input peer h-10 w-full"
                {...setDeal("category_id")}
              >
                {/* <option value="" disabled selected>
                  -- Select Category --
                </option> */}
                {categories?.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <span className="custom-label">Category</span>
            </div>
            {errors.category_id && (
              <p className="text-sm text-red-500">
                {errors.category_id.message}
              </p>
            )}
          </label>

          <label className="font-medium peer-focus:-top-4 peer-focus:text-black peer-focus:text-sm peer-placeholder-shown:top-1 peer-placeholder-shown:text-base peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-sm peer-not-placeholder-shown:text-black transition-all duration-200 -z-1 left-0">
            Status
          </label>
          <select className="border rounded p-2" {...setDeal("deal_status")}>
            {/* <option value="" disabled selected>
              -- Select Status --
            </option> */}
            {dealStatusOptions.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
          {errors.status && (
            <p className="text-sm text-red-500">{errors.status.message}</p>
          )}

          <label className="font-medium peer-focus:-top-4 peer-focus:text-black peer-focus:text-sm peer-placeholder-shown:top-1 peer-placeholder-shown:text-base peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-sm peer-not-placeholder-shown:text-black transition-all duration-200 -z-1 left-0">
            Seller
          </label>
          <select className="border rounded p-2" {...setDeal("seller_id")}>
            {/* <option value="" disabled selected>
              -- Select Seller --
            </option> */}
            {sellers.map((seller) => (
              <option key={seller.id} value={seller.id}>
                {seller.name}
              </option>
            ))}
          </select>
          {errors.seller_id && (
            <p className="text-sm text-red-500">{errors.seller_id.message}</p>
          )}

          <CustomInput
            type="number"
            label="Max participants"
            {...setDeal("max_participants")}
            error={errors.max_participants?.message}
          />

          <CustomInput
            label="Images"
            {...setDeal("images")}
            type="file"
            multiple
          />
          {errors.images && (
            <p className="text-sm text-red-500">{errors.images?.message}</p>
          )}

          <DatePicker
            label="Start Date"
            name="start_at"
            {...setDeal("start_at")}
            control={control}
          />
          {errors.start_at && (
            <p className="text-sm text-red-500">{errors.start_at?.message}</p>
          )}
          <DatePicker
            label="Deadline Date"
            name="deadline"
            {...setDeal("deadline")}
            control={control}
          />
          {errors.deadline && (
            <p className="text-sm text-red-500">{errors.deadline?.message}</p>
          )}
        </div>
        <Button
          variant="default"
          className="px-10 py-2 mt-5"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? deal
              ? "Updating..."
              : "Creating..."
            : deal
            ? "Update"
            : "Create"}
        </Button>
      </div>
    </form>
  );
}
export default AdminDealForm;
