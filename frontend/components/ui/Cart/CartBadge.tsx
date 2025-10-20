import { cn } from "@/lib/utils/cn";

interface CartBadgeProps {
  count: number;
  variant?: "light" | "dark";
  className?: string;
}

export function CartBadge({
  count,
  variant = "dark",
  className,
}: CartBadgeProps) {
  if (count <= 0) return null;

  const variantStyles =
    variant === "light" ? "bg-white text-black" : "bg-black text-white";

  return (
    <span
      className={cn(
        "absolute -top-0.5 -right-0.5 w-4 h-4 text-[10px] font-medium rounded-full flex items-center justify-center",
        variantStyles,
        className,
      )}
    >
      {count}
    </span>
  );
}
