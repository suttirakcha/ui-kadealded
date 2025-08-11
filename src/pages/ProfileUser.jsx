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

  return (
    <>
      <div className="flex-1 w-full">
        <h2 className="text-2xl font-semibold text-[#083b63] mb-6 border-b pb-2">
          ข้อมูลส่วนตัว
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-800">
          <div className="space-y-1">
            <span className="font-medium text-gray-600 text-lg">First name:</span>{" "}
            <p className="text-2xl font-bold">{user?.name}</p>
          </div>
          <div className="space-y-1">
            <span className="font-medium text-gray-600 text-lg">Last name:</span>{" "}
            <p className="text-2xl font-bold">{user?.last_name}</p>
          </div>
          <div className="space-y-1">
            <span className="font-medium text-gray-600 text-lg">Phone:</span>{" "}
            <p className="text-2xl font-bold">{user?.tel_number}</p>
          </div>
          <div className="space-y-1">
            <span className="font-medium text-gray-600 text-lg">Birth date:</span>{" "}
            <p className="text-2xl font-bold">{user?.birth_date
              ? format(new Date(user?.birth_date), "dd MMMM yyyy")
              : "-"}</p>
          </div>
          <div className="md:col-span-2 space-y-1">
            <span className="font-medium text-gray-600 text-lg">Email:</span>{" "}
            <p className="text-2xl font-bold">{user?.email}</p>
          </div>
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
