import { Input } from "@/components/ui/input";

function CustomInput({ label, placeholder = " ", ...props }) {
  return (
    <label className="pt-4 relative">
      <Input {...props} className="text-input peer" placeholder={placeholder} />
      <span className="custom-label">
        {label}
      </span>
    </label>
  );
}

export default CustomInput;
