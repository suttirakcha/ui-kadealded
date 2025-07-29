import OTPField from "@/components/custom/OTPField"
import { Button } from "@/components/ui/button"
import { Link } from "react-router"

function OTPPage({ email, onGoBack }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <button onClick={onGoBack} className="hover:underline mb-10">Back to Register</button>
      <form className="flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-5">Please check your email</h1>
      <h1 className="mb-2">The verification code has been sent to</h1>
      <h1 className="font-bold mb-10">{email}</h1>
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