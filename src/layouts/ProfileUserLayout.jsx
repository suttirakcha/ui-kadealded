import CustomInput from '@/components/custom/CustomInput';
import React, { useState } from 'react'
import { Link, Outlet } from 'react-router';

function ProfileUserLayout() {

  const [user, setUser] = useState({
    firstName: "Wiwat",
    lastName: "Suwanmosi",
    phone: "098-6696-9999",
    birthDate: "23-4-97",
    email: "tt_@gmail.com",
  });

  const [isEdit, setIsEdit] = useState(false);

  
  //function Change Edit
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  //สลับโหมด
  const toggleEdit = () => {
    setIsEdit((prev) => !prev);
  };


  return (
    <>
      <div className="min-h-screen bg-white font-sans">

        <div className='flex flex-col'>
          <div className="bg-[#083b63] text-white rounded-2xl m-6 p-6 flex text-center md:flex-row gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-32 h-32 bg-gray-300 rounded-full"></div>
              <p className="mt-2 font-semibold">lnwzaza_777</p>
              <hr className="my-2 w-24 border-white" />
              <Link to="Coupon">Coupon / Discount</Link>
              <Link to="Coin-transaction">Coin Transactions </Link>
              </div>
            <Outlet />
          </div>


          <div className="bg-gray-100 mx-6 my-4 p-6 rounded grid grid-cols-1 md:grid-cols-2 gap-4 text-center md:text-left">
            <div>
              <h3 className="font-semibold mb-2">Level</h3>
              <p>Bronze / Silver / Gold / Platinum</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Goal / Achievement</h3>
              <p>Total purchase: 200 baht</p>
              <p>Purchase 1000 baht to upgrade to Silver</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProfileUserLayout;
