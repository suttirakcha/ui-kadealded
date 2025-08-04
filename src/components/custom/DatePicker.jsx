import { format, getMonth, getYear, setMonth, setYear } from "date-fns";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export function DatePicker({ label, name, control, className }) {
  const startYear = getYear(new Date()) - 100;
  const endYear = getYear(new Date());
  const years = Array.from(
    { length: endYear - startYear + 1 },
    (_, i) => startYear + i
  );

  const [date, setDate] = useState(new Date());

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handleChangeMonth = (month) => {
    const newDate = setMonth(date, months.indexOf(month));
    setDate(newDate);
  };

  const handleChangeYear = (year) => {
    const newDate = setYear(date, parseInt(year));
    setDate(newDate);
  };

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
                {value ? format(value, "dd MMMM yyyy") : <span>{label}</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <div className="flex items-center gap-2 p-2">
                <Select
                  onValueChange={handleChangeMonth}
                  value={months[getMonth(date)]}
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Month" />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map((month) => (
                      <SelectItem key={month} value={month}>
                        {month}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  onValueChange={handleChangeYear}
                  value={getYear(date)}
                >
                  <SelectTrigger className="w-[100px]">
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Calendar
                mode="single"
                className="w-full"
                selected={value}
                onSelect={onChange}
                month={date}
                onMonthChange={setDate}
              />
            </PopoverContent>
          </Popover>
        );
      }}
    />
  );
}
