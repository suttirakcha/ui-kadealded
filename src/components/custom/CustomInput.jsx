import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";

function CustomInput({
  type,
  label,
  placeholder = " ",
  className,
  error,
  ...props
}) {
  return (
    <label className="pt-4">
      <div className="relative mb-1">
        {type === "textarea" ? (
          <Textarea
            {...props}
            placeholder={placeholder}
            className={cn("text-input peer resize-none", className)}
          />
        ) : (
          <Input
            {...props}
            type={type}
            className={cn("text-input peer", className)}
            placeholder={placeholder}
          />
        )}
        <span className="custom-label">{label}</span>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </label>
  );
}

export default CustomInput;
