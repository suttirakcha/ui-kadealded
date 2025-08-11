import useAuthStore from "@/stores/useAuthStore";
import { Link } from "react-router";

function ProfileUserSidebar() {
  const { user } = useAuthStore();
  const dealPurchased = 5;
  const coupons = [
    { name: "ส่วนลด 10%", code: "DISCOUNT10", expiry: "31/12/2025" },
    { name: "ลดค่าส่ง", code: "SHIPFREE", expiry: "15/09/2025" },
  ];

  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-36 h-36 rounded-full border-4 border-[#083b63] overflow-hidden shadow-md">
        <img
          src={user?.profile_image || "/default-profile.png"}
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </div>
      <p className="mt-4 text-lg font-bold text-[#083b63]">{user?.name}</p>
      <hr className="my-2 w-24 border-[#083b63]" />
      <p className="text-sm text-gray-600">
        คูปอง / ส่วนลด: {coupons.length} รายการ
      </p>
      <p className="text-sm text-gray-600">
        ดีลที่ซื้อแล้ว: {dealPurchased} ดีล
      </p>
      <p className="text-sm text-gray-600">Loyalty program</p>
      <Link to="/profile/coin-transaction">Coin transaction</Link>
    </div>
  );
}

export default ProfileUserSidebar;
