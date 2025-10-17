"use client";

import React from "react";
import { cn } from "@/lib/utils/cn";
import { Input } from "./Input";
import { Button } from "./Buttons/Button";

interface DiscountCodeInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onApply?: () => void;
  className?: string;
}

export const DiscountCodeInput: React.FC<DiscountCodeInputProps> = ({
  value,
  onChange,
  onApply,
  className,
}) => {
  return (
    <div className={cn("flex gap-3 w-full", className)}>
      <Input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Discount code"
        className="flex-1"
      />
      <Button
        variant="primary"
        size="lg"
        onClick={onApply}
        className="whitespace-nowrap"
      >
        Apply
      </Button>
    </div>
  );
};
