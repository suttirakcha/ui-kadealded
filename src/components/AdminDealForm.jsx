import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { adminApi } from "@/api/routesApi";
import { dealSchema } from "@/schemas/dealSchema";
import CustomInput from "@/components/custom/CustomInput";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/custom/DatePicker";
import { toast } from "sonner";
import useCategoryStore from "@/stores/useCategoryStore";
import { useEffect, useState } from "react";
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
import Loading from "./icons/Loading";
import { Plus, X } from "lucide-react";

function AdminDealForm({ deal }) {
  const navigate = useNavigate();
  const [dealImages, setDealImages] = useState(deal?.images ?? []);
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
      seller_id: deal?.seller_id || "",
      category_id: deal?.category_id || "",
      deal_status: deal?.deal_status || "",
      images: dealImages,
      max_participants: deal?.max_participants || "",
      creator: deal?.creator || "",
      // creator: user?.name || "Admin",
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

  const uploadImage = (files) => {
    const previewImage = URL.createObjectURL(files[0]);
    setDealImages(prev => [...prev, ...previewImage]);
  }

  const onSubmit = async (data) => {
    try {
      const imgForm = new FormData();
        for (let i = 0; i < data.image.length; i++) {
          imgForm.append("image", data.image[i]);
        }

      const uploadRes = await adminApi.post("/deals", imgForm, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const payload = {
        title: data.title,
        description: data.description,
        start_at: data.start_at,
        deadline: data.deadline,
        deal_status: data.deal_status,
        images: uploadRes.data.url,
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

  console.log(dealImages);

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
          <CustomSelectDropdown
            label="Category"
            error={errors.category_name?.message}
            options={
              <>
                {categories?.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </>
            }
            {...setDeal("category_id")}
          />

          <CustomSelectDropdown
            label="Status"
            error={errors.status?.message}
            options={
              <>
                {dealStatusOptions.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </>
            }
            {...setDeal("deal_status")}
          />

          <CustomSelectDropdown
            label="Seller"
            error={errors.seller_id?.message}
            options={
              <>
                {sellers.map((seller) => (
                  <option key={seller.id} value={seller.id}>
                    {seller.name}
                  </option>
                ))}
              </>
            }
            {...setDeal("seller_id")}
          />

          <CustomInput
            type="number"
            label="Max participants"
            {...setDeal("max_participants")}
            error={errors.max_participants?.message}
          />

          {/* <CustomInput
            label="Images"
            {...setDeal("images")}
            type="file"
            multiple
          /> */}

          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium">Images</span>
            <div className="flex items-center gap-4">
              {dealImages?.map((image) => (
                <div className="group relative overflow-hidden">
                  <img
                    key={image.id}
                    src={image.image_url}
                    className="w-20 h-20 rounded-md object-cover"
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setDealImages((prev) =>
                        prev.filter((img) => img.id !== image.id)
                      );
                    }}
                    className="cursor-pointer opacity-0 group-hover:opacity-100 flex items-center justify-center bg-white/80 absolute top-0 left-0 w-full h-full transition-opacity duration-300"
                  >
                    <X className="h-8 w-8" />
                  </button>
                </div>
              ))}

              <label className="border rounded-md h-20 w-20 relative group cursor-pointer">
                <input onChange={(e) => {
                  e.preventDefault();
                  uploadImage(e.target.files)
                }} type="file" className="hidden" {...setDeal("images")} />
                <span className="absolute top-0 left-0 h-full w-full flex items-center justify-center group-hover:bg-gray-200 transition-background duration-300">
                  <Plus className="w-8 h-8" />
                </span>
              </label>
            </div>
          </div>

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
