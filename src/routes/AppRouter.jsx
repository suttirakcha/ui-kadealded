import { createBrowserRouter,RouterProvider } from "react-router"
import { lazy } from "react"
import AdminCreateDeal from "@/pages/admin/AdminCreateDeal";
import AdminCreateSeller from "@/pages/admin/AdminCreateSeller";
import AdminSellers from "@/pages/admin/AdminSellers";

const MainLayout = lazy(() => import("../layouts/MainLayout"));
const Home = lazy(()=> import("../pages/Home"));
const NotFound = lazy(()=> import("../pages/NotFound"))
const About = lazy(()=> import("../pages/About"))
const Coupons = lazy(()=> import("../pages/Coupons"))
const Contacts = lazy(()=> import("../pages/Contacts"))
const OTPPage = lazy(()=> import("../pages/OTPPage"))
const DealPage = lazy(()=> import("../pages/DealPage"))
const AdminUsers = lazy(()=> import("../pages/admin/AdminUsers"))
const AdminDeals = lazy(()=> import("../pages/admin/AdminDeals"))
const AdminAmount = lazy(()=> import("../pages/admin/AdminAmount"))
const AdminTopDeals = lazy(()=> import("../pages/admin/AdminTopDeals"))
const AdminStats = lazy(()=> import("../pages/admin/AdminStats"))
const SearchDeal = lazy(()=> import("../pages/SearchDeal"))

function AppRouter() {
    const guestRouter = createBrowserRouter([
        {
            path: "/", element: <MainLayout />, children: [
                { index: true, element: <Home /> },
                { path: "about", element: <About />},
                { path: "coupon", element: <Coupons/>},
                { path: "contact", element: <Contacts />},
                { path: "deal/:id", element: <DealPage />},
                { path: "confirmEmail", element: <OTPPage />},
                { path: "admin-users", element: <AdminUsers />},   
                { path: "admin-sellers", element: <AdminSellers />},   
                { path: "admin-deal", element: <AdminDeals />},                
                { path: "admin-amount", element: <AdminAmount />},
                { path: "admin-top-deals", element: <AdminTopDeals />},
                // { path: "admin-create-deal", element: <AdminCreateDeal />},
                { path: "admin-stats", element: <AdminStats />},
                { path: "admin-create-deal", element: <AdminCreateDeal />},
                { path: "admin-create-seller", element: <AdminCreateSeller />},
                { path: "searchDeal", element: <SearchDeal />},
            ]
        },
        {
            path: "*", element: <NotFound />
        }
    ])

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
        <RouterProvider router={guestRouter}/>
    )
}

export default AppRouter