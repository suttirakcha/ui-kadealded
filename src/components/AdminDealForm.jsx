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

function AdminDealForm({ deal }) {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { categories, fetchAllCategories } = useCategoryStore();
  const { sellers, fetchAllSellers } = useSellerStore();

  const { updateDealById, clearCurrentDeal } =
    useDealStore();

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
      category: deal?.category?.name || "",
      deal_status: deal?.deal_status || "",
      // images: uploadRes.data.url,
      max_participants: deal?.max_participants || "",
      seller: deal?.seller?.name || "",
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
        seller_name: data.seller?.name,
        category_name: data.category?.name,
        creator_name: user?.name || "Admin",
      };

      const res = await (deal
        ? updateDealById(deal.id, payload)
        : adminApi.post("/deals", payload));
      toast.success(res.data.message);
      navigate("/admin/deal");
      reset();
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
          <label className="font-medium peer-focus:-top-4 peer-focus:text-black peer-focus:text-sm peer-placeholder-shown:top-1 peer-placeholder-shown:text-base peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-sm peer-not-placeholder-shown:text-black transition-all duration-200 -z-1 left-0">
            Category
          </label>
          <select className="border rounded p-2" {...setDeal("category")}>
            <option value="" disabled selected>
              -- Select Category --
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-sm text-red-500">{errors.category.message}</p>
          )}

          <label className="font-medium peer-focus:-top-4 peer-focus:text-black peer-focus:text-sm peer-placeholder-shown:top-1 peer-placeholder-shown:text-base peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-sm peer-not-placeholder-shown:text-black transition-all duration-200 -z-1 left-0">
            Status
          </label>
          <select className="border rounded p-2" {...setDeal("deal_status")}>
            <option value="" disabled selected>
              -- Select Status --
            </option>
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
          <select className="border rounded p-2" {...setDeal("seller")}>
            <option value="" disabled selected>
              -- Select Seller --
            </option>
            {sellers.map((seller) => (
              <option key={seller.id} value={seller.name}>
                {seller.name}
              </option>
            ))}
          </select>
          {errors.seller && (
            <p className="text-sm text-red-500">{errors.seller.message}</p>
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
        <textarea
          {...setDeal("description")}
          placeholder="Description"
          className="p-3 w-full h-50 border border-gray-200 rounded-sm resize-none"
        ></textarea>
        {errors.description && (
          <p className="text-sm text-red-500 mb-10">
            {errors.description?.message}
          </p>
        )}
        <Button
          variant="default"
          className="px-10 py-2 mt-5"
          disabled={isSubmitting}
        >
          {isSubmitting ? (deal ? "Updating..." : "Creating...") : (deal ? "Update" : "Create")}
        </Button>
      </div>
    </form>
  );
}
export default AdminDealForm;
