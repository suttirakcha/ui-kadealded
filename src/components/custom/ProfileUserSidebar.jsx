import useAuthStore from "@/stores/useAuthStore";
import { Coins } from "lucide-react";
import { Link } from "react-router";

function ProfileUserSidebar() {
  const { user } = useAuthStore();

  return (
    <div className="flex flex-col items-center text-center min-w-50 w-50">
      <div className="w-36 h-36 rounded-full border-4 border-[#083b63] overflow-hidden shadow-md">
        <img
          src={user?.profile_image || "/default-profile.png"}
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </div>
      <p className="text-3xl font-bold my-6 flex items-center gap-2 text-orange-500">
        <Coins className="w-10 h-10" />
        {user?.coin || 0}
      </p>
      <div className="flex flex-col gap-1">
        <Link to="/profile" className="text-xl font-bold text-[#083b63]">
          {user?.name}
        </Link>
        <p className="text-gray-600">{user?.email}</p>
      </div>
      <hr className="my-6 w-full border-[#083b63]" />
      <div className="flex flex-col gap-2 font-bold text-[#003f66] text-lg">
        <Link to="/profile">Profile</Link>
        <Link to="/profile/deal-history">Deal history</Link>
        <Link to="/profile/coin-transaction">Coin transaction</Link>
      </div>
      {/* <p className="text-sm text-gray-600">Loyalty program</p> */}
    </div>
  );
}

export default ProfileUserSidebar;
