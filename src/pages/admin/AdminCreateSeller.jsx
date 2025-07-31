import { useForm } from 'react-hook-form';
import Sidebar from '../../components/custom/Sidebar'
import { yupResolver } from '@hookform/resolvers/yup';
import CustomInput from '@/components/custom/CustomInput'
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { sellerSchema } from '@/schemas/sellerSchema';
import useSellerStore from '@/stores/userSellerStore';

function AdminCreateSeller() {
    const { createSeller } = useSellerStore();
    const { register: seller, handleSubmit, formState, reset } = useForm({
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
        <div className='flex'>
            <Sidebar />
            <div className="p-6">
                <div className="flex flex-col justify-between mb-4">
                    <h2 className="text-xl font-bold">CreateDeal</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className='relative'>
                        <div className='mx-auto p-10 w-200'>
                            <div className='flex flex-col gap-4 mt-10 mb-15'>
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
                            <Button variant="default" className="px-10 py-2 mt-5">Submit</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default AdminCreateSeller