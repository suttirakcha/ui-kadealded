import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { adminApi } from '@/api/routesApi';
import { dealSchema } from '@/schemas/dealSchema';
import CustomInput from '@/components/custom/CustomInput'
import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/custom/DatePicker';
import { toast } from 'sonner';

function AdminCreateDeal() {
    const { control, register: deal, handleSubmit, formState, reset } = useForm({
        resolver: yupResolver(dealSchema),
    });
    const { errors, isSubmitting } = formState;

    const onSubmit = async (data) => {
        try {
            const imgFile = new FormData(); 
            imgFile.append("image", data.image);

            const result = { ...data, image: imgFile };

            const res = await adminApi.post("/deals", result);
            // console.log(result);
            toast.success(res.data.message);
            // reset();
        } catch (error) {
            console.log(error);
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
                                <CustomInput
                                    label="Category"
                                    {...deal("category")}
                                    error={errors.category?.message}
                                />
                                <CustomInput
                                    label="Status"
                                    {...deal("status")}
                                    error={errors.status?.message}
                                />
                                <CustomInput
                                    label="Seller"
                                    {...deal("seller")}
                                    error={errors.seller?.message}
                                />
                                 <CustomInput
                                    label="Images"
                                    {...deal("images")}
                                    type="file"
                                />
                                {errors.images && <p className="text-sm text-red-500">{errors.images?.message}</p>}
                                <DatePicker
                                    label="Start Date"
                                    name="start_date"
                                    {...deal("start_date")}
                                    control={control}
                                />
                                {errors.start_date && <p className="text-sm text-red-500">{errors.start_date?.message}</p>}
                                <DatePicker
                                    label="Deal Line Date"
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