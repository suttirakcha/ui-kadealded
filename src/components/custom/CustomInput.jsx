import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

function CustomInput({ label, placeholder = " ", className, error, ...props }) {
  return (
    <label className="pt-4">
      <div className="relative mb-1">
        <Input
          {...props}
          className={cn("text-input peer", className)}
          placeholder={placeholder}
        />
        <span className="custom-label">{label}</span>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </label>
  );
}

export default CustomInput;
