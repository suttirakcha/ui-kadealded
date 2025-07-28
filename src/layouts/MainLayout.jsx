import React from "react";
import Header from "../components/custom/Header";
import { Outlet } from "react-router";
import Footer from "@/components/custom/Footer";

function MainLayout() {
  return (
    <div className="flex flex-col min-h-dvh justify-between">
      <Header />
      <main className="mt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
