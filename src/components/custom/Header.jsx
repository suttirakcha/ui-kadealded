import { NavLink, Link } from "react-router";
import RegisterDialog from "../dialogs/RegisterDialog";
import LoginDialog from "../dialogs/LoginDialog";
import logoImg from "../../assets/kaDEALded_logo-removebg-preview.png";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CategorySheet from "../sheets/CategorySheet";
import useAuthStore from "@/stores/useAuthStore";
import { Menu, LogOut, User, DollarSign, BarChart3 } from "lucide-react";

function Header() {
  const { user, logout } = useAuthStore();
  const isAdmin = user?.role === "ADMIN" || user?.role === "SUPERADMIN";
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
        <div className="flex gap-3.5">
          <NavLink to="/" className="navbar-link">Home</NavLink>
          <NavLink to="/about" className="navbar-link">About Us</NavLink>
          
        </div>

        <Link to="/" className="h-20 w-20">
          <img src={logoImg} alt="kadealded-logo" className="h-full w-full object-contain" />
        </Link>
        <div className="flex items-center gap-3.5">
          <NavLink to="/searchDeal" className="navbar-link">Deals</NavLink>
          <NavLink to="/contact" className="navbar-link">
            Contact Us
          </NavLink>
          

        </div >
      </div>

      {user && (
        <div className="relative flex justify-end items-center gap-2">
          <button onClick={() => setMenuOpen(!menuOpen)} className="flex items-center gap-2 hover:bg-black/20 p-2 rounded-lg transition">
            <p className="font-medium text-lg">{user?.name}</p>
            <Avatar className="h-10 w-10">
              <AvatarImage src={user?.profile_image ?? "https://github.com/shadcn.png"} />
              <AvatarFallback>{user?.name}</AvatarFallback>
            </Avatar>
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-14 bg-white text-black rounded-xl shadow-lg w-52 z-50 py-2 animate-fade-in">
              <div className="flex items-center gap-3 px-4 py-2 border-b font-semibold text-lg">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.profile_image ?? "https://github.com/shadcn.png"} />
                  <AvatarFallback>{user?.name}</AvatarFallback>
                </Avatar>
                <span>{user?.name}</span>
              </div>
              <div className="flex flex-col py-2">
                {isAdmin ? (
                  <>
                    <Link to="/profile"
                      className="dropdown-item"
                      onClick={() => setMenuOpen(false)}>
                      <User className="h-5 w-5" /> Profile
                    </Link>
                    <Link to="/admin/stats"
                      className="dropdown-item"
                      onClick={() => setMenuOpen(false)}>
                      <BarChart3 className="h-5 w-5" /> Dashboard
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/profile"
                      className="dropdown-item"
                      onClick={() => setMenuOpen(false)}>
                      <User className="h-5 w-5" /> Profile
                    </Link>
                    <Link to="/coin"
                      className="dropdown-item"
                      onClick={() => setMenuOpen(false)}>
                      <DollarSign className="h-5 w-5" /> Coin
                    </Link>
                  </>
                )}
                <button
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                  }} className="dropdown-item text-red-600 hover:text-red-700">
                  <LogOut className="h-5 w-5" /> Logout
                </button>
              </div>
            </div>
          )}

        </div>
      )}
      {!user && (
        <div className="flex gap-5 justify-end">
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
        </div>
      )}
    </div>
  );
}

export default Header;