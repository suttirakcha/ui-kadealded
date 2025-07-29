import CustomInput from '@/components/custom/CustomInput'
import { Button } from '@/components/ui/button'
import { Mail, PhoneCall } from 'lucide-react'
import React from 'react'

function Contacts() {
  return (
    <>
    <div className='grid grid-cols-2 h-300 relative'>
      <div className='mx-auto p-30 w-200'>
        <p className='text-6xl font-bold text-[#003F66] mb-2'>Get in touch </p>
        <p className='text-xl font-bold text-[#003F66] mb-15'>Please fill your information and we will reach out to you</p>
        <div className='flex flex-col gap-4 mt-10 mb-15'>
        <CustomInput label="Company Name"/>
        <CustomInput label="Company Email"/>
        <CustomInput label="Company Number"/>
        </div>
        <textarea name="message" placeholder='Message' className='p-3 w-full h-50 border border-gray-200 rounded-sm resize-none mb-10' ></textarea>
        <Button variant="default" className="px-10 py-2">Submit</Button>
      </div>
      <img src="/src/assets/contactimg.png" className='object-cover w-full h-full min-h-screen' />
      </div>
      <div className='absolute -bottom-88 flex left-10 font-bold'><PhoneCall className='mr-2'/>Tel: 02-345-5623</div>
      <div className='absolute -bottom-88 flex left-160 font-bold'><Mail className='mr-2'/>Email: kadealded@gmail.com</div>
      </>
  )
}

export default Contacts