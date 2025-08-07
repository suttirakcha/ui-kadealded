import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import Sidebar from "@/components/custom/Sidebar"
import useAuthStore from "@/stores/useAuthStore";
import AdminSidebarSheet from "@/components/sheets/AdminSidebarSheet";

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
      <header className="lg:hidden">
        <AdminSidebarSheet />
      </header>
      <nav className="max-lg:hidden">
        <Sidebar />
      </nav>
      <main className="p-12 h-dvh overflow-auto w-full">
        <Outlet />
      </main>
    </div>
  )
}
export default AdminLayout