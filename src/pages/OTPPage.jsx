import OTPField from "@/components/custom/OTPField"
import { Button } from "@/components/ui/button"
import { Link } from "react-router"

function OTPPage() {
  return (
    <div className="bg-gray-100 h-screen w-screen flex items-center justify-center">
      <form className="bg-white w-1/3 h-3/5 rounded-sm shadow-sm flex flex-col items-center">
      <Link to='/' className="hover:underline">Back to Homepage</Link>
      <h1 className="text-3xl">Please check your email</h1>
      <h1>The verification code has been sent to</h1>
      <h1 className="font-bold">test@mail.com</h1>
      <OTPField />
      <h1>Don't get a code? <span><button>Resend</button></span></h1>
      <Button>Verify</Button>
      </form>
    </div>
  )
}
export default OTPPage