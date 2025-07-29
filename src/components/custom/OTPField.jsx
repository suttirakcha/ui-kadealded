import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useState } from "react";

function OTPField() {
  const otpLength = 6;
  const [otpValue, setOTPValue] = useState("");
  return (
    <InputOTP
      maxLength={otpLength}
      pattern={REGEXP_ONLY_DIGITS}
      value={otpValue}
      onChange={(value) => setOTPValue(value)}
    >
      <InputOTPGroup>
        {[...Array(otpLength)].map((_, index) => (
          <InputOTPSlot key={index} index={index} />
        ))}
      </InputOTPGroup>
    </InputOTP>
  );
}

export default OTPField;
