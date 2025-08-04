import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useState } from "react";

function OTPField({ value, onChange }) {
  const otpLength = 6;
  // const [otpValue, setOTPValue] = useState("");
  return (
    <InputOTP
      maxLength={otpLength}
      pattern={REGEXP_ONLY_DIGITS}
      value={value}
      onChange={onChange}
    >
      <InputOTPGroup>
        {[...Array(otpLength)].map((_, index) => (
          <InputOTPSlot key={index} index={index} className="w-12 h-12"/>
        ))}
      </InputOTPGroup>
    </InputOTP>
  );
}

export default OTPField;
