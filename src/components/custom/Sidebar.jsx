import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FlameIcon, GemIcon, HandCoinsIcon, Handshake, Key, MemoryStick, Users, ChartPie, Home, HomeIcon } from 'lucide-react';
import React, { useState } from 'react'
import { Link, useLocation } from 'react-router';

function Sidebar() {
    const sidebarItems = [
        { name: "Users", icon: Users, to: "/admin/users" },
        { name: "Sellers", icon: HandCoinsIcon, to: "/admin/sellers" },
        { name: "Total Deals", icon: Key, to: "/admin/deal" },
        { name: "Total Amount", icon: MemoryStick, to: "/admin/amount" },
        { name: "Tops Deals", icon: FlameIcon, to: "/admin/top-deals" },
        { name: "Create Deals", icon: Handshake, to: "/admin/create-deal" },
        { name: "Create Sellers", icon: GemIcon, to: "/admin/create-seller" },
        { name: "Statistics", icon: ChartPie, to: "/admin/stats" },
    ];
    // { path: "users", element: <AdminUsers /> },
    //     { path: "sellers", element: <AdminSellers /> },
    //     { path: "deal", element: <AdminDeals /> },
    //     { path: "amount", element: <AdminAmount /> },
    //     { path: "top-deals", element: <AdminTopDeals /> },
    //     { path: "create-deal", element: <AdminCreateDeal /> },
    //     { path: "create-seller", element: <AdminCreateSeller /> },
    //     { path: "stats", element: <AdminStats /> },

    const [user, setUser] = useState("hey");
    const location = useLocation();

    return (
        <div className="text-white bg-[#033f66] border-r min-h-screen h-full p-4">
            <div className='flex p-2 gap-3 mb-4'>
                <div>
                    {user && (
                        <div>
                            <Avatar className="flex h-15 w-15">
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </div>
                    )}
                </div>
                <div className='flex flex-col justify-center'>
                    <p className="text-sm">
                        Welcome Back
                    </p>
                    <p className="font-bold text-2xl">Admin</p>

                </div>
            </div>

            <nav className="space-y-2">
                {sidebarItems.map(({ name, icon: Icon, to }, i) => {
                    const isActive = location.pathname === to;
                    return (
                        <Link
                            key={i}
                            to={to}
                            className={`flex items-center gap-3 px-3 py-2 rounded transition-colors 
                                    ${isActive ? "bg-gray-200 text-black font-semibold" : "hover:bg-[#032238] text-white"
                                }`}
                        >
                            <Icon size={18} />
                            <span>{name}</span>
                        </Link>
                    );
                })}
            </nav>
            <div className="mt-6">
                <Link
                    to="/"
                    className="flex items-center gap-3 px-3 py-2 rounded transition-colors hover:bg-[#032238] text-white"
                >
                    <HomeIcon size={18} />
                    <span>Back to Home</span>
                </Link>
            </div>
        </div>
    )
}

export default Sidebar