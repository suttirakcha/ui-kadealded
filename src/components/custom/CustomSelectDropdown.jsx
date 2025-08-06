import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller } from "react-hook-form";

function CustomSelectDropdown({
  options,
  name,
  control,
  label,
  error,
}) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const { value, onChange, initialValue } = field;
        // console.log(initialValue);
        return (
          <label className="pt-4">
            <div className="relative mb-1">
              <Select onValueChange={onChange} defaultValue={value}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue
                    value={value}
                  />
                </SelectTrigger>
                <SelectContent>
                  {options.map((option) => (
                    <SelectItem key={option.id} value={option.name}>
                      {option.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <span className="custom-label">{label}</span>
            </div>
          </label>
        );
      }}
    />
    // <label className="pt-4">
    //   <div className="relative">

    //     <select
    //       className="text-input peer h-10 w-full"
    //       {...props}
    //     >
    //       <option value="" disabled selected>
    //         {initialValue}
    //       </option>
    //       {options}
    //     </select>
    //     <span className="custom-label">{label}</span>
    //   </div>
    //   {error && (
    //     <p className="text-sm text-red-500">{error}</p>
    //   )}
    // </label>
  );
}

export default CustomSelectDropdown;
