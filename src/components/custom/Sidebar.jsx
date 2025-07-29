import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FlameIcon, Key,MemoryStick } from 'lucide-react';
import React, { useState } from 'react'
import { Link, useLocation } from 'react-router';

function Sidebar() {
    const sidebarItems = [
        { name: "Total Deals", icon: Key, to: "/admin-deal" },
        { name: "Total Amount", icon: MemoryStick, to: "/admin-amount" },
        { name: "Tops Deals", icon: FlameIcon, to: "/admin-top-deals" },
    ];

    const [user, setUser] = useState("hey");
     const location = useLocation();
    return (
            <div className="w-64 bg-white border-r min-h-screen h-full p-4">
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
                                    ${isActive ? "bg-gray-200 text-black font-semibold" : "hover:bg-gray-100 text-gray-700"
                                    }`}
                            >
                                <Icon size={18} />
                                <span>{name}</span>
                            </Link>
                        );
                    })}
                </nav>
            </div>
    )
}

export default Sidebar