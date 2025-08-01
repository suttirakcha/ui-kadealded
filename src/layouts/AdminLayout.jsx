import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import Sidebar from "@/components/custom/Sidebar"
import useAuthStore from "@/stores/useAuthStore";

function AdminLayout() {
   const navigate = useNavigate();
  const { user } = useAuthStore();

  useEffect(() => {
    if (!user || !["ADMIN", "SUPERADMIN"].includes(user.role)) {
      navigate("/", { replace: true }); 
    }
  }, [user, navigate]);

  return (
    <div className="flex">
      <Sidebar />
      <main className="p-6 h-dvh overflow-auto w-full">
        <Outlet />
      </main>
    </div>
  )
}
export default AdminLayout