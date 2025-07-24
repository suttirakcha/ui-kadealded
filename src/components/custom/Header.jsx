import { Link } from "react-router"
import RegisterDialog from "../dialogs/RegisterDialog"
import LoginDialog from "../dialogs/LoginDialog"

function Header() {
  return (
    <>
      <div className="flex items-center justify-center bg-[#003f66] text-white px-2 py-2 h-13 gap-15 fixed top-0 inset-x-0 z-2">
        <div className="flex gap-7">
          <Link to="/" className="hover:text-[#e59b2b] text-">Home</Link>
          <Link to="/about" className="hover:text-[#e59b2b]">About Us</Link>
          <Link to="/coupon" className="hover:text-[#e59b2b]">Coupons</Link>
        </div>

         <div className="flex gap-4">
          <Link to="/" className="w-9 text-2xl" >Logo</Link>
        </div>

        <div className="flex items-center gap-7">
          <Link to="/contact" className="hover:text-[#e59b2b]">Contact Us</Link>

          {/* Will remove these links */}
          {/* <Link to="/login" className="hover:text-[#e59b2b]">Login</Link> */}
          {/* <Link to="/register" className="hover:text-[#e59b2b]" >Register</Link> */}
          <LoginDialog />
          <RegisterDialog />
        </div>
      </div>
    </>
  )
}

export default Header