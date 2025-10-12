import React from "react";
import { cn } from "@/lib/utils/cn";
import { XIcon } from "@/components/icons";
import { Button } from "./Button";

type ModalStyleConfig = {
  width: string;
  minHeight?: string;
  height?: string;
  gap: string;
  padding: string;
};

const MODAL_STYLES: Record<string, Record<string, ModalStyleConfig>> = {
  "popup-1": {
    desktop: { width: "616px", minHeight: "530px", gap: "40px", padding: "24px" },
    mobile: { width: "344px", minHeight: "538px", gap: "32px", padding: "24px 16px" },
  },
  "popup-2": {
    desktop: { width: "616px", minHeight: "482px", gap: "40px", padding: "24px" },
    mobile: { width: "344px", minHeight: "482px", gap: "40px", padding: "24px" },
  },
  "popup-3": {
    desktop: { width: "432px", minHeight: "392px", gap: "40px", padding: "24px" },
    mobile: { width: "344px", minHeight: "376px", gap: "32px", padding: "24px 16px" },
  },
  confirmation: {
    desktop: { width: "608px", height: "162px", gap: "32px", padding: "24px" },
    mobile: { width: "344px", height: "162px", gap: "32px", padding: "24px" },
  },
};

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  variant?: "popup-1" | "popup-2" | "popup-3" | "confirmation";
  device?: "desktop" | "mobile";
  primaryButtonLabel?: string;
  secondaryButtonLabel?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  showCloseButton?: boolean;
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  variant = "popup-1",
  device = "desktop",
  primaryButtonLabel = "Label",
  secondaryButtonLabel = "Label",
  onPrimaryClick,
  onSecondaryClick,
  showCloseButton = true,
  className,
}) => {
  if (!isOpen) return null;

  const isConfirmation = variant === "confirmation";
  const isMobile = device === "mobile";
  const modalStyles = MODAL_STYLES[variant][isMobile ? "mobile" : "desktop"];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className={cn(
          "bg-white rounded flex flex-col relative",
          className
        )}
        style={{
          width: modalStyles.width,
          minHeight: modalStyles.minHeight,
          height: modalStyles.height,
          padding: modalStyles.padding,
          gap: modalStyles.gap,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={cn(
          "flex items-start justify-between",
          isConfirmation && device === "desktop" && "justify-center"
        )}>
          <h2 className={cn(
            "text-[32px] leading-[1.375] font-semibold text-black",
            isConfirmation && device === "desktop" && "text-center"
          )}>
            {title}
          </h2>
          {showCloseButton && !isConfirmation && (
            <button
              onClick={onClose}
              className="text-black hover:text-gray-600 transition-colors"
              aria-label="Close modal"
            >
              <XIcon className="w-6 h-6" />
            </button>
          )}
        </div>

        {!isConfirmation && (
          <div className="flex-1 overflow-y-auto">
            {children}
          </div>
        )}

        <div className="flex gap-4">
          <Button
            variant="primary"
            size="lg"
            onClick={onPrimaryClick || onClose}
            className="flex-1"
          >
            {primaryButtonLabel}
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={onSecondaryClick || onClose}
            className="flex-1"
          >
            {secondaryButtonLabel}
          </Button>
        </div>
      </div>
    </div>
  );
};

Modal.displayName = "Modal";
