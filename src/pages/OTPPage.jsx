import OTPField from "@/components/custom/OTPField";
import { Button } from "@/components/ui/button";
import useAuthStore from "@/stores/useAuthStore";
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";

function OTPPage({
  email,
  onGoBack,
  onRegistrationComplete,
  onResendSuccess,
  registeredData,
}) {
  const { login } = useAuthStore();
  const [otpCode, setOtpCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const registerUser = useAuthStore((state) => state.register);

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setIsVerifying(true);

    if (!otpCode || otpCode.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP.");
      setIsVerifying(false);
      return;
    }

    try {
      const verifyResponse = await axios.post("/otp/verify", {
        email: email,
        otp_code: otpCode,
        otp_type: "VERIFY_EMAIL",
      });

      toast.success(
        verifyResponse.data.message || "OTP verified successfully!"
      );

      if (!registeredData) {
        throw new Error(
          "No registration data available. Please register again."
        );
      }

      await registerUser(registeredData);

      if (onRegistrationComplete) {
        onRegistrationComplete();
        const res = await login({
          email: registeredData.email,
          password: registeredData.password,
        });
        toast.success("Succesfully registered");
      }
    } catch (error) {
      console.error("OTP verification or registration failed:", error);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      const response = await axios.post("/otp/send", {
        email: email,
        otp_type: "VERIFY_EMAIL",
      });

      toast.success(response.data.message || "New OTP sent to your email.");

      if (onResendSuccess) {
        onResendSuccess();
      }
      setOtpCode("");
    } catch (error) {
      console.error("Resend OTP failed:", error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <button onClick={onGoBack} className="hover:underline mb-10">
        Back to Register
      </button>
      <form className="flex flex-col items-center" onSubmit={handleVerifyOtp}>
        <h1 className="text-3xl font-bold mb-5">Please check your email</h1>
        <h1 className="mb-2">The verification code has been sent to</h1>
        <h1 className="font-bold mb-10">{email}</h1>
        <div className="mb-10">
          <OTPField value={otpCode} onChange={setOtpCode} />
        </div>
        <h1 className="mb-3">
          Don't get a code?{" "}
          <span>
            <button
              type="button"
              onClick={handleResendOtp}
              className="text-[#003F66] font-bold hover:underline"
            >
              Resend
            </button>
          </span>
        </h1>
        <Button
          type="submit"
          disabled={isVerifying}
          className="bg-[#003F66] w-full"
        >
          {isVerifying ? "Verifying..." : "Verify"}
        </Button>
      </form>
    </div>
  );
}
export default OTPPage;
