import OTPField from "@/components/custom/OTPField"
import { Button } from "@/components/ui/button"
import { Link } from "react-router"

function OTPPage() {
  return (
    <div className="bg-gray-100 h-screen w-screen flex items-center justify-center">
      <form className="bg-white w-1/3 h-3/5 rounded-sm shadow-sm flex flex-col items-center p-10">
      <Link to='/' className="hover:underline mb-10">Back to Homepage</Link>
      <h1 className="text-3xl font-bold mb-5">Please check your email</h1>
      <h1 className="mb-2">The verification code has been sent to</h1>
      <h1 className="font-bold mb-10">test@mail.com</h1>
      <div className="mb-10">
      <OTPField />
      </div>
      <h1 className="mb-3">Don't get a code? <span><button className="text-[#003F66] font-bold hover:underline">Resend</button></span></h1>
      <Button className='bg-[#003F66] w-full'>Verify</Button>
      </form>
    </div>
  )
}
export default OTPPage