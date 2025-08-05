import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { adminApi } from '@/api/routesApi';
import { dealSchema } from '@/schemas/dealSchema';
import CustomInput from '@/components/custom/CustomInput'
import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/custom/DatePicker';
import { toast } from 'sonner';
import useCategoryStore from '@/stores/useCategoryStore';
import { useEffect } from 'react';
import useSellerStore from '@/stores/useSellerStore';
import useAuthStore from '@/stores/useAuthStore';

function AdminCreateDeal() {
    const { control, register: deal, handleSubmit, formState, reset } = useForm({
        resolver: yupResolver(dealSchema),
    });

    const dealStatusOptions = [
        { label: "Pre Open", value: "PRE_OPEN" },
        { label: "Open", value: "OPEN" },
        { label: "Completed", value: "COMPLETED" },
        { label: "Expired", value: "EXPIRED" },
        { label: "Cancelled", value: "CANCELLED" },
    ];

    const { user } = useAuthStore();
    const { categories, fetchAllCategories } = useCategoryStore();
    const { sellers, fetchAllSellers } = useSellerStore();
    const { errors, isSubmitting } = formState;

    useEffect(() => {
        const run = async () => {
            await fetchAllCategories();
            await fetchAllSellers();
        }
        run();
    }, []);

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
                deal_status: data.status,
                images: uploadRes.data.url,
                seller_name: data.seller,
                category_name: data.category,
                creator_name: user?.name || "Admin",
            };

            const res = await adminApi.post("/deals", payload);
            toast.success(res.data.message);
            reset();
        } catch (error) {
            toast.error(error.response?.data.message || error.message);
        }
    };


    return (
        <div className="flex flex-col justify-between mb-4">
            <h2 className="text-xl font-bold">CreateDeal</h2>
            <form onSubmit={handleSubmit(onSubmit)} className='relative'>
                <div className='mx-auto p-10 w-200'>
                    <div className='flex flex-col gap-4 mt-10 mb-15'>
                        <CustomInput
                            label="Title"
                            {...deal("title")}
                            error={errors.title?.message}
                        />
                        <label className='font-medium peer-focus:-top-4 peer-focus:text-black peer-focus:text-sm peer-placeholder-shown:top-1 peer-placeholder-shown:text-base peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-sm peer-not-placeholder-shown:text-black transition-all duration-200 -z-1 left-0'>
                            Category</label>
                        <select className='border rounded p-2' name="category" {...deal("category")} >
                            <option value="" disabled selected>-- Select Category --</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.name}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        {errors.category && <p className="text-sm text-red-500">{errors.category.message}</p>}

                        <label className='font-medium peer-focus:-top-4 peer-focus:text-black peer-focus:text-sm peer-placeholder-shown:top-1 peer-placeholder-shown:text-base peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-sm peer-not-placeholder-shown:text-black transition-all duration-200 -z-1 left-0'>
                            Status</label>
                        <select className='border rounded p-2' name="name" {...deal("status")} >
                            <option value="" disabled selected>-- Select Status --</option>
                            {dealStatusOptions.map((status) => (
                                <option key={status.value} value={status.value}>
                                    {status.label}
                                </option>
                            ))}
                        </select>
                        {errors.status && <p className="text-sm text-red-500">{errors.status.message}</p>}

                        <label className='font-medium peer-focus:-top-4 peer-focus:text-black peer-focus:text-sm peer-placeholder-shown:top-1 peer-placeholder-shown:text-base peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-sm peer-not-placeholder-shown:text-black transition-all duration-200 -z-1 left-0'>
                            Seller</label>
                        <select className='border rounded p-2' name="seller" {...deal("seller")} >
                            <option value="" disabled selected>-- Select Seller --</option>
                            {sellers.map((seller) => (
                                <option key={seller.id} value={seller.name}>
                                    {seller.name}
                                </option>
                            ))}
                        </select>
                        {errors.seller && <p className="text-sm text-red-500">{errors.seller.message}</p>}

                        <CustomInput
                            label="Images"
                            {...deal("images")}
                            type="file"
                            multiple
                        />
                        {errors.images && <p className="text-sm text-red-500">{errors.images?.message}</p>}

                        <DatePicker
                            label="Start Date"
                            name="start_at"
                            {...deal("start_at")}
                            control={control}
                        />
                        {errors.start_at && <p className="text-sm text-red-500">{errors.start_at?.message}</p>}
                        <DatePicker
                            label="Dealline Date"
                            name="deadline"
                            {...deal("deadline")}
                            control={control}
                        />
                        {errors.deadline && <p className="text-sm text-red-500">{errors.deadline?.message}</p>}
                    </div>
                    <textarea
                        {...deal("description")}
                        placeholder='Description'
                        className='p-3 w-full h-50 border border-gray-200 rounded-sm resize-none' >
                    </textarea>
                    {errors.description && <p className="text-sm text-red-500 mb-10">{errors.description?.message}</p>}
                    <Button variant="default" className="px-10 py-2 mt-5">Submit</Button>
                </div>
            </form>
        </div>
    )
}
export default AdminCreateDeal