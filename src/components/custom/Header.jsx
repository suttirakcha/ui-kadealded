import { NavLink, Link, useLocation } from "react-router";
import RegisterDialog from "../dialogs/RegisterDialog";
import LoginDialog from "../dialogs/LoginDialog";
import logoImg from "../../assets/kaDEALded_logo-removebg-preview.png";
import { useEffect, useState } from "react";
import { Hamburger, Menu } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CategorySheet from "../sheets/CategorySheet";
import useAuthStore from "@/stores/useAuthStore";

function Header() {
  const { user, logout } = useAuthStore();
  const location = useLocation();
  const isAdmin = user?.role === "ADMIN" || user?.role === "SUPERADMIN";
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const handleOpenRegister = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(true);
  };

  const handleOpenLogin = () => {
    setIsRegisterOpen(false);
    setIsLoginOpen(true);
  };

  return (
    <div className="grid grid-cols-5 items-center justify-center bg-[#003f66] fixed top-0 inset-x-0 z-2 text-white px-8">
      <CategorySheet />
      <div className="col-span-3 flex h-full items-center justify-center gap-6">
        <div className="flex h-full gap-3.5">
          <NavLink to="/" className="navbar-link group relative">
            Home
            {/* <div className="bg-white group-hover:h-1 w-full absolute bottom-0 transform-all duration-100"></div> */}
          </NavLink>
          <NavLink to="/about" className="navbar-link group relative">
            About Us
            {/* <div className="bg-white group-hover:h-1 w-full absolute bottom-0 transform-all duration-100"></div> */}
          </NavLink>
          <NavLink to="/coupon" className="navbar-link group relative">
            Coupons
            {/* <div className="bg-white group-hover:h-1 w-full absolute bottom-0 transform-all duration-100"></div> */}
          </NavLink>
        </div>

        <Link to="/" className="h-20 w-20">
          <img src={logoImg} alt="kadealded-logo" />
        </Link>

        <div className="flex items-center h-full gap-3.5">
          <NavLink to="/contact" className="navbar-link group relative">
            Contact Us
            {/* <div className="bg-white group-hover:h-1 w-full absolute bottom-0 transform-all duration-100"></div> */}
          </NavLink>
          {isAdmin && <NavLink to="/admin/stats" className="navbar-link">Admin</NavLink>}
          {user ? (
            <a className="navbar-link" onClick={logout}>
              {/* TODO: Will do the logout feature after user is dynamically fetched */}
              Logout
            </a>
          ) : (
            <>
              <LoginDialog
                open={isLoginOpen}
                setOpen={setIsLoginOpen}
                onSwitchLogin={handleOpenRegister}
              />
              <RegisterDialog
                open={isRegisterOpen}
                setOpen={setIsRegisterOpen}
                onSwitchRegister={handleOpenLogin}
              />
            </>
          )}
        </div>
      </div>
      {user && (
        <div className="flex justify-end items-center gap-2">
          <p className="font-medium text-lg text-center">{user?.name}</p>

          <Avatar className="h-10 w-10">
            <AvatarImage src={user?.profile_image ?? "https://github.com/shadcn.png"} />
            <AvatarFallback>{user?.name}</AvatarFallback>
          </Avatar>
        </div>
      )}
    </div>
  );
}

export default Header;
