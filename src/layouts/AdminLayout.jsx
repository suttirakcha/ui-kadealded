import React from "react";
import { Outlet } from "react-router";
import Sidebar from "@/components/custom/Sidebar"

function AdminLayout() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  )
}
export default AdminLayout