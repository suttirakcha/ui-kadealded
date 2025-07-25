import { Input } from "@/components/ui/input";

function CustomInput({ label, placeholder = " ", error, ...props }) {
  return (
    <label className="pt-4">
      <div className="relative mb-1">
        <Input
          {...props}
          className="text-input peer"
          placeholder={placeholder}
        />
        <span className="custom-label">{label}</span>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </label>
  );
}

export default CustomInput;
