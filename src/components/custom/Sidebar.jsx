import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useAuthStore from "@/stores/useAuthStore";
import {
  FlameIcon,
  GemIcon,
  HandCoinsIcon,
  Handshake,
  Key,
  MemoryStick,
  Users,
  ChartPie,
  Home,
  HomeIcon,
  ChartBarStacked,
} from "lucide-react";
import { Link, useLocation } from "react-router";

function Sidebar() {
  const sidebarItems = [
    { name: "Users", icon: Users, to: "/admin/users" },
    { name: "Sellers", icon: HandCoinsIcon, to: "/admin/sellers" },
    { name: "Total deals", icon: Key, to: "/admin/deal" },
    { name: "Total amount", icon: MemoryStick, to: "/admin/amount" },
    { name: "Tops deals", icon: FlameIcon, to: "/admin/top-deals" },
    { name: "Categories", icon: ChartBarStacked, to: "/admin/category" },
    // { name: "Create Deals", icon: Handshake, to: "/admin/create-deal" },
    // { name: "Create Sellers", icon: GemIcon, to: "/admin/create-seller" },
    { name: "Statistics", icon: ChartPie, to: "/admin/stats" },
  ];

  const { user } = useAuthStore();
  const location = useLocation();

  return (
    <div className="text-white bg-[#033f66] min-h-screen h-full p-4 min-w-[280px] w-[280px]">
      <div className="flex p-2 gap-3 mb-4">
        <div>
          {user && (
            <div>
              <Avatar className="flex h-15 w-15">
                <AvatarImage src={user?.profile_image ?? "https://github.com/shadcn.png"} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
          )}
        </div>
        <div className="flex flex-col justify-center gap-1">
          <p className="font-bold text-2xl">{user?.name}</p>
          <p className="text-sm">{user?.role}</p>
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
                ${
                  isActive
                    ? "bg-gray-200 text-black font-semibold"
                    : "hover:bg-[#032238] text-white"
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
  );
}

export default Sidebar;
