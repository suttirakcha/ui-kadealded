import EditUserDialog from '@/components/dialogs/EditUserDialog';
import useAuthStore from '@/stores/useAuthStore';
import useUserStore from '@/stores/useUserStore';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';

function ProfileUser() {
  const { user } = useAuthStore();
  const { users , fetchAllUsers } = useUserStore();
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
      const run = async () => {
        await fetchAllUsers();
      };
      run();
    }, []);

  const totalPurchase = 200;
  const nextLevelThreshold = 1000;
  const dealPurchased = 5;
  const coupons = [
    { name: "ส่วนลด 10%", code: "DISCOUNT10", expiry: "31/12/2025" },
    { name: "ลดค่าส่ง", code: "SHIPFREE", expiry: "15/09/2025" },
  ];

  const progressPercent = Math.min((totalPurchase / nextLevelThreshold) * 100, 100);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#e0f2f1] to-white font-sans py-10">
      <div className="max-w-5xl mx-auto px-4">
        {/* Profile Card */}
        <div className="bg-white shadow-xl rounded-3xl p-8 flex flex-col md:flex-row gap-10 items-center md:items-start">
          {/* Profile Image Section */}
          <div className="flex flex-col items-center text-center">
            <div className="w-36 h-36 rounded-full border-4 border-[#083b63] overflow-hidden shadow-md">
              <img
                src={user?.profile_image || "/default-profile.png"}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="mt-4 text-lg font-bold text-[#083b63]">{users.name}</p>
            <hr className="my-2 w-24 border-[#083b63]" />
            <p className="text-sm text-gray-600">คูปอง / ส่วนลด: {coupons.length} รายการ</p>
            <p className="text-sm text-gray-600">ดีลที่ซื้อแล้ว: {dealPurchased} ดีล</p>
            <p className="text-sm text-gray-600">Loyalty program</p>
          </div>

          {/* Information Section */}
          <div className="flex-1 w-full">
            <h2 className="text-2xl font-semibold text-[#083b63] mb-6 border-b pb-2">
              ข้อมูลส่วนตัว
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-800">
              <p><span className="font-semibold text-gray-600">First name:</span> {user?.name}</p>
              <p><span className="font-semibold text-gray-600">Last name:</span> {user?.last_name}</p>
              <p><span className="font-semibold text-gray-600">Phone:</span> {user?.tel_number}</p>
              <p>
                <span className="font-semibold text-gray-600">Birth date:</span>{" "}
                {user?.birth_date ? format(new Date(user?.birth_date), "dd MMMM yyyy") : "-"}
              </p>
              <p className="md:col-span-2">
                <span className="font-semibold text-gray-600">Email:</span> {user?.email}
              </p>
            </div>
            <button 
             onClick={() => setSelectedUser(user)}
            className="mt-8 bg-[#fbbf24] hover:bg-[#f59e0b] transition px-6 py-2 text-white font-medium rounded shadow">
              แก้ไขข้อมูล
            </button>
          </div>
          {selectedUser && (
            <EditUserDialog
              open={selectedUser}
              onOpenChange={setSelectedUser}
              user={selectedUser}
            />
          )}
        </div>

        {/* Membership Status & Progress */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow">
            <h3 className="text-lg font-semibold text-[#083b63] mb-2">ระดับสมาชิก</h3>
            <p className="text-gray-700 mb-2">• Bronze / Silver / Gold / Platinum</p>
            <div className="w-full bg-gray-200 h-4 rounded-full overflow-hidden">
              <div
                className="bg-[#083b63] h-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <p className="text-sm mt-2 text-gray-600">
              ยอดซื้อสะสม: {totalPurchase} บาท / {nextLevelThreshold} บาท
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow">
            <h3 className="text-lg font-semibold text-[#083b63] mb-2">คูปองของฉัน</h3>
            {coupons.length === 0 ? (
              <p className="text-gray-500">ยังไม่มีคูปอง</p>
            ) : (
              <ul className="text-sm text-gray-700 space-y-2">
                {coupons.map((coupon, index) => (
                  <li key={index} className="border-b pb-2">
                    <p className="font-medium">{coupon.name}</p>
                    <p>Code: <span className="font-mono bg-gray-100 px-2 py-1 rounded">{coupon.code}</span></p>
                    <p className="text-xs text-gray-500">หมดอายุ: {coupon.expiry}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileUser;
