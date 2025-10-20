import { LoadingSpinner } from "@/components/ui/icons/LoadingSpinner";

export function LoadingOverlay() {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-[9999]">
      <LoadingSpinner className="w-10 h-10 text-black animate-spin" />
    </div>
  );
}
