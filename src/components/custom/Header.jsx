import { NavLink,Link } from "react-router"
import RegisterDialog from "../dialogs/RegisterDialog"

function Header() {
  return (
    <>
      <div className="flex items-center justify-center bg-[#003f66] text-white px-2 py-2 h-13 gap-15 fixed top-0 inset-x-0 z-2">
        <div className="flex">
          <NavLink to="/" className="hover:text-[#e59b2b] hover:bg-white p-3.5">Home</NavLink>
          <NavLink to="/about" className="hover:text-[#e59b2b] hover:bg-white p-3.5">About Us</NavLink>
          <NavLink to="/coupon" className="hover:text-[#e59b2b] hover:bg-white p-3.5">Coupons</NavLink>
        </div>

         <div className="flex gap-4">
          <Link to="/" className="w-9 text-2xl" >Logo</Link>
        </div>

        <div className="flex items-center">
          <NavLink to="/contact" className="hover:text-[#e59b2b] hover:bg-white p-3.5">Contact Us</NavLink>
          <NavLink to="/login" className="hover:text-[#e59b2b] hover:bg-white p-3.5 mr-3">Login</NavLink>
          {/* <Link to="/register" className="hover:text-[#e59b2b]" >Register</Link> */}
          <RegisterDialog />
        </div>
      </div>
    </>
  )
}

export default Header