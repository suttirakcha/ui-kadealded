import EditUserDialog from "@/components/dialogs/EditUserDialog";
import useAuthStore from "@/stores/useAuthStore";
import useUserStore from "@/stores/useUserStore";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";

function ProfileUser() {
  const { user } = useAuthStore();
  const { users, fetchAllUsers } = useUserStore();
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

  const progressPercent = Math.min(
    (totalPurchase / nextLevelThreshold) * 100,
    100
  );

  return (
    <>
      <div className="flex-1 w-full">
        <h2 className="text-2xl font-semibold text-[#083b63] mb-6 border-b pb-2">
          ข้อมูลส่วนตัว
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-800">
          <p>
            <span className="font-semibold text-gray-600">First name:</span>{" "}
            {user?.name}
          </p>
          <p>
            <span className="font-semibold text-gray-600">Last name:</span>{" "}
            {user?.last_name}
          </p>
          <p>
            <span className="font-semibold text-gray-600">Phone:</span>{" "}
            {user?.tel_number}
          </p>
          <p>
            <span className="font-semibold text-gray-600">Birth date:</span>{" "}
            {user?.birth_date
              ? format(new Date(user?.birth_date), "dd MMMM yyyy")
              : "-"}
          </p>
          <p className="md:col-span-2">
            <span className="font-semibold text-gray-600">Email:</span>{" "}
            {user?.email}
          </p>
        </div>
        <button
          onClick={() => setSelectedUser(user)}
          className="mt-8 bg-[#fbbf24] hover:bg-[#f59e0b] transition px-6 py-2 text-white font-medium rounded shadow"
        >
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
    </>
  );
}

export default ProfileUser;
