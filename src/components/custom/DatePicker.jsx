import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Controller } from "react-hook-form";
import { cn } from "@/lib/utils";

export function DatePicker({ name, control, className }) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const { value, onChange } = field;
        return (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                data-empty={!value}
                className={cn(
                  "data-[empty=true]:text-muted-foreground !bg-white justify-start text-input",
                  className
                )}
              >
                <CalendarIcon />
                {value ? format(value, "dd/MM/yyyy") : <span>Birth Date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={value} onSelect={onChange} />
            </PopoverContent>
          </Popover>
        );
      }}
    />
  );
}
