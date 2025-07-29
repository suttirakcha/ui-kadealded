import { authApi } from '@/api/routesApi';
import CustomInput from '@/components/custom/CustomInput'
import { Button } from '@/components/ui/button'
import { contactSchema } from '@/schemas/contactSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { Mail, PhoneCall } from 'lucide-react'
import React from 'react'
import { useForm } from 'react-hook-form';
import { toast } from "sonner";

function Contacts() {
   const { register, handleSubmit, formState, reset } = useForm({
    resolver: yupResolver(contactSchema),
  });
  const { errors, isSubmitting } = formState;

  const onSubmit = async (data) => {
    try {
      const res = await authApi.post("/contactus",data)
      toast.success(res.data.message);
      reset();
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data.message || error.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-2 h-300 relative'>
        <div className='mx-auto p-30 w-200'>
          <p className='text-6xl font-bold text-[#003F66] mb-2'>Get in touch </p>
          <p className='text-xl font-bold text-[#003F66] mb-15'>Please fill your information and we will reach out to you</p>
          <div className='flex flex-col gap-4 mt-10 mb-15'>
            <CustomInput
              label="Company Name"
              {...register("name")} 
              error = {errors.name?.message}
              />
            <CustomInput
              label="Company Email"
              {...register("email")} 
              error = {errors.email?.message}
              />
            <CustomInput
              label="Company Number"
              {...register("tel_number")}
              error = {errors.tel_number?.message}
              />
          </div>
          <textarea
            {...register("message")}
            placeholder='Message'
            className='p-3 w-full h-50 border border-gray-200 rounded-sm resize-none' >
            </textarea>
            {errors.message && <p className="text-sm text-red-500 mb-10">{errors.message?.message}</p>}
          <Button variant="default" className="px-10 py-2">Submit</Button>
        </div>
        <img src="/src/assets/contactimg.png" className='object-cover w-full h-full min-h-screen' />
      </form>
      <div className='absolute -bottom-88 flex left-10 font-bold'><PhoneCall className='mr-2' />Tel: 02-345-5623</div>
      <div className='absolute -bottom-88 flex left-160 font-bold'><Mail className='mr-2' />Email: kadealded@gmail.com</div>
    </>
  )
}

export default Contacts