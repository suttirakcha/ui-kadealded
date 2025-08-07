import React from 'react'

function ProfileUser() {
  return (
    <>
       <div className="min-h-screen bg-white font-sans">
     

      <div className='flex '>
      <div className="bg-[#083b63] text-white rounded-2xl m-6 p-6 flex flex-col md:flex-row gap-8">
        <div className="flex flex-col items-center text-center">
          <div className="w-32 h-32 bg-gray-300 rounded-full"></div>
          <p className="mt-2 font-semibold">lnwzaza_777</p>
          <hr className="my-2 w-24 border-white" />
          <p>คูปอง/ส่วนลด</p>
          <p>Loyalty Program</p>
        </div>

        <div className="flex-1 flex flex-col justify-center items-center text-center md:text-left md:items-start">
          <h2 className="text-2xl mb-4">INFORMATION</h2>
          <div className="grid grid-cols-2 gap-y-2">
            <span>wiwat</span>
            <span>Suwannmosi</span>
            <span>09-888888</span>
            <span>14/01/1996</span>
            <span className="col-span-2">aamnds@gmail.com</span>
          </div>
          <button className="bg-yellow-500 hover:bg-yellow-600 text-white mt-6 px-6 py-2 rounded">
            Edit Profile
          </button>
        </div>
      </div>


      <div className="bg-gray-100 mx-6 my-4 p-6 rounded grid grid-cols-1 md:grid-cols-2 gap-4 text-center md:text-left">
        <div>
          <h3 className="font-semibold mb-2">Level</h3>
          <p>• Bronze / Silver / Gold / Platinum</p>
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

export default ProfileUser
