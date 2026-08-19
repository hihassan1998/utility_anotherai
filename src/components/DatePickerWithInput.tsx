"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/Icon";

interface DatePickerWithInputProps {
  id?: string;
  value: string; // YYYY-MM-DD
  onChange: (val: string) => void;
  required?: boolean;
  className?: string;
}

export function DatePickerWithInput({
  id,
  value,
  onChange,
  required,
  className,
}: DatePickerWithInputProps) {
  const dateInputRef = React.useRef<HTMLInputElement>(null);
  const yearInputRef = React.useRef<HTMLInputElement>(null);
  const monthInputRef = React.useRef<HTMLInputElement>(null);
  const dayInputRef = React.useRef<HTMLInputElement>(null);

  // Parse YYYY-MM-DD safely
  const [yearVal, monthVal, dayVal] = React.useMemo(() => {
    if (!value) return ["", "", ""];
    const parts = value.split("-");
    return [parts[0] || "", parts[1] || "", parts[2] || ""];
  }, [value]);

  const updateDate = (y: string, m: string, d: string) => {
    // Keep only numeric characters
    const cleanY = y.replace(/\D/g, "").slice(0, 4);
    const cleanM = m.replace(/\D/g, "").slice(0, 2);
    const cleanD = d.replace(/\D/g, "").slice(0, 2);

    onChange(`${cleanY}-${cleanM}-${cleanD}`);
  };

  const handleYearChange = (val: string) => {
    const cleanVal = val.replace(/\D/g, "");
    updateDate(cleanVal, monthVal, dayVal);
    // Auto-advance to month if 4 digits entered
    if (cleanVal.length === 4) {
      monthInputRef.current?.focus();
    }
  };

  const handleMonthChange = (val: string) => {
    const cleanVal = val.replace(/\D/g, "");
    updateDate(yearVal, cleanVal, dayVal);
    // Auto-advance to day if 2 digits entered
    if (cleanVal.length === 2) {
      dayInputRef.current?.focus();
    }
  };

  const handleDayChange = (val: string) => {
    const cleanVal = val.replace(/\D/g, "");
    updateDate(yearVal, monthVal, cleanVal);
  };

  const handleCalendarClick = () => {
    if (dateInputRef.current) {
      try {
        dateInputRef.current.showPicker();
      } catch (err) {
        dateInputRef.current.click();
      }
    }
  };

  return (
    <div className={`flex gap-2 items-center w-full ${className || ""}`}>
      {/* 3-Box Date Input Wrapper styled to look like a single premium field */}
      <div className="flex items-center gap-1 sm:gap-1.5 flex-1 bg-muted/30 border border-muted-foreground/15 rounded-lg px-3 py-1 focus-within:ring-2 focus-within:ring-emerald-500 focus-within:border-emerald-500 transition-all h-10">
        <Input
          ref={yearInputRef}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder="YYYY"
          value={yearVal}
          onChange={(e) => handleYearChange(e.target.value)}
          required={required}
          className="border-0 bg-transparent p-0 text-center w-12 sm:w-16 focus-visible:ring-0 focus-visible:ring-offset-0 text-sm h-8"
          maxLength={4}
          aria-label="Year (4 digits)"
        />
        <span className="text-muted-foreground/30 select-none text-xs font-semibold">-</span>
        <Input
          ref={monthInputRef}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder="MM"
          value={monthVal}
          onChange={(e) => handleMonthChange(e.target.value)}
          required={required}
          className="border-0 bg-transparent p-0 text-center w-8 sm:w-10 focus-visible:ring-0 focus-visible:ring-offset-0 text-sm h-8"
          maxLength={2}
          aria-label="Month (2 digits)"
        />
        <span className="text-muted-foreground/30 select-none text-xs font-semibold">-</span>
        <Input
          ref={dayInputRef}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder="DD"
          value={dayVal}
          onChange={(e) => handleDayChange(e.target.value)}
          required={required}
          className="border-0 bg-transparent p-0 text-center w-8 sm:w-10 focus-visible:ring-0 focus-visible:ring-offset-0 text-sm h-8"
          maxLength={2}
          aria-label="Day (2 digits)"
        />
      </div>

      {/* Calendar native date picker trigger */}
      <div className="relative flex items-center">
        <input
          ref={dateInputRef}
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="absolute opacity-0 pointer-events-none w-px h-px overflow-hidden"
          tabIndex={-1}
          aria-hidden="true"
        />
        <Button
          type="button"
          variant="outline"
          onClick={handleCalendarClick}
          className="h-10 px-3 border-muted-foreground/15 rounded-lg hover:bg-accent text-emerald-600 dark:text-emerald-400"
          aria-label="Open calendar picker"
        >
          <Icon name="Calendar" size={16} />
        </Button>
      </div>
    </div>
  );
}
