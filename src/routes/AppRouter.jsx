import { createBrowserRouter,RouterProvider } from "react-router"
import { lazy } from "react"
import DealPage from "@/pages/DealPage";

const MainLayout = lazy(() => import("../layouts/MainLayout"));
const Home = lazy(()=> import("../pages/Home"));
const NotFound = lazy(()=> import("../pages/NotFound"))
const About = lazy(()=> import("../pages/About"))
const Coupons = lazy(()=> import("../pages/Coupons"))
const Contacts = lazy(()=> import("../pages/Contacts"))
const AdminPage = lazy(()=> import("../pages/AdminPage"))

function AppRouter() {
    const guestRouter = createBrowserRouter([
        {
            path: "/", element: <MainLayout />, children: [
                { index: true, element: <Home /> },
                { path: "about", element: <About />},
                { path: "coupon", element: <Coupons/>},
                { path: "contact", element: <Contacts />},
                { path: "deal/:id", element: <DealPage />},
                { path: "admin", element: <AdminPage />},
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