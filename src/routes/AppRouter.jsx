import { createBrowserRouter, RouterProvider } from "react-router";
import { lazy } from "react";

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
const AdminCreateSeller = lazy(() =>
  import("../pages/admin/AdminCreateSeller")
);
const AdminSellers = lazy(() => import("../pages/admin/AdminSellers"));
const AdminAmount = lazy(() => import("../pages/admin/AdminAmount"));
const AdminTopDeals = lazy(() => import("../pages/admin/AdminTopDeals"));
const SearchDeal = lazy(() => import("../pages/SearchDeal"));
const AdminStats = lazy(() => import("@/pages/admin/AdminStats"));

function AppRouter() {
    let isAdmin = true;
  const guestRouter = createBrowserRouter([
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
      path: "*",
      element: <NotFound />,
    },
  ]);

  const adminRouter = createBrowserRouter([
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        { path: "users", element: <AdminUsers /> },
        { path: "sellers", element: <AdminSellers /> },
        { path: "deal", element: <AdminDeals /> },
        { path: "amount", element: <AdminAmount /> },
        { path: "top-deals", element: <AdminTopDeals /> },
        { path: "create-deal", element: <AdminCreateDeal /> },
        { path: "create-seller", element: <AdminCreateSeller /> },
        { path: "stats", element: <AdminStats /> },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return (
    // <BrowserRouter>
    //     <Routes>
    //         <Route path="/" element={<MainLayout />}>
    //             <Route index element={<Home />} />
    //             <Route path="login" element={<Login />} />
    //             <Route path="register" element={<Register />} />
    //         </Route>
    //         <Route path="*" element={<NotFound />} />
    //     </Routes>
    // </BrowserRouter>
    <RouterProvider router={isAdmin ? adminRouter : guestRouter} />
  );
}

export default AppRouter;
