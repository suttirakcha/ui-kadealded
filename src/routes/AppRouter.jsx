import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import { lazy } from "react";
import useAuthStore from "@/stores/useAuthStore";

const MainLayout = lazy(() => import("../layouts/MainLayout"));
const AdminLayout = lazy(() => import("../layouts/AdminLayout"));
const Home = lazy(() => import("../pages/Home"));
const NotFound = lazy(() => import("../pages/NotFound"));
const About = lazy(() => import("../pages/About"));
const Coupons = lazy(() => import("../pages/Coupons"));
const Contacts = lazy(() => import("../pages/Contacts"));
const OTPPage = lazy(() => import("../pages/OTPPage"));
const DealPage = lazy(() => import("../pages/DealPage"));
const AdminUsers = lazy(() => import("../pages/admin/AdminUsers"));
const AdminDeals = lazy(() => import("../pages/admin/AdminDeals"));
const AdminCreateDeal = lazy(() => import("../pages/admin/AdminCreateDeal"));
const AdminCreateSeller = lazy(() => import("../pages/admin/AdminCreateSeller"));
const AdminCategory = lazy(() => import("../pages/admin/AdminCategory"));
const AdminSellers = lazy(() => import("../pages/admin/AdminSellers"));
const AdminAmount = lazy(() => import("../pages/admin/AdminAmount"));
const AdminTopDeals = lazy(() => import("../pages/admin/AdminTopDeals"));
const SearchDeal = lazy(() => import("../pages/SearchDeal"));
const AdminStats = lazy(() => import("@/pages/admin/AdminStats"));
const CallbackPage = lazy(() => import("../pages/CallbackPage"));

function AppRouter() {
    const { user } = useAuthStore();
    const isAdmin = user?.role === "ADMIN" || user?.role === "SUPERADMIN";
    const router = createBrowserRouter([
        {
            path: "/",
            element: <MainLayout />,
            children: [
                { index: true, element: <Home /> },
                { path: "about", element: <About /> },
                { path: "coupon", element: <Coupons /> },
                { path: "contact", element: <Contacts /> },
                { path: "deal/:id", element: <DealPage /> },
                { path: "confirmEmail", element: <OTPPage /> },
                { path: "searchDeal", element: <SearchDeal /> },
            ],
        },
        { 
            path: "callback", element: <CallbackPage /> 
        },
        {
            path: "/admin",
            element: isAdmin ? <AdminLayout /> : <Navigate to="/" replace />,
            children: [
                { path: "users", element: <AdminUsers /> },
                { path: "sellers", element: <AdminSellers /> },
                { path: "deal", element: <AdminDeals /> },
                { path: "amount", element: <AdminAmount /> },
                { path: "top-deals", element: <AdminTopDeals /> },
                { path: "create-deal", element: <AdminCreateDeal /> },
                { path: "create-seller", element: <AdminCreateSeller /> },
                { path: "category", element: <AdminCategory /> },
                { path: "stats", element: <AdminStats /> },
            ],
        },
        {
            path: "*",
            element: <NotFound />,
        },
    ]);

    return (
        <RouterProvider router={router} />
    );
}

export default AppRouter;
