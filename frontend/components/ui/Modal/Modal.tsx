import React, { useMemo } from "react";
import { cn } from "@/lib/utils/cn";
import { Button } from "../Buttons/Button";
import { CloseButton } from "../Buttons/CloseButton";
import MODAL_STYLES from "./modalStyles";

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

export const Modal = React.memo<ModalProps>(
  ({
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
    const isConfirmation = variant === "confirmation";
    const isMobile = device === "mobile";
    const modalStyles = useMemo(
      () => MODAL_STYLES[variant][isMobile ? "mobile" : "desktop"],
      [variant, isMobile],
    );

    if (!isOpen) return null;

    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
        onClick={onClose}
      >
        <div
          className={cn("bg-white rounded flex flex-col relative", className)}
          style={{
            width: modalStyles.width,
            minHeight: modalStyles.minHeight,
            height: modalStyles.height,
            padding: modalStyles.padding,
            gap: modalStyles.gap,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className={cn(
              "flex items-start justify-between",
              isConfirmation && device === "desktop" && "justify-center",
            )}
          >
            <h2
              className={cn(
                "text-h4 leading-normal font-semibold text-black",
                isConfirmation && device === "desktop" && "text-center",
              )}
            >
              {title}
            </h2>
            {showCloseButton && !isConfirmation && (
              <CloseButton variant="minimal" onClose={onClose} />
            )}
          </div>

          {!isConfirmation && (
            <div className="flex-1 overflow-y-auto">{children}</div>
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
  },
);

Modal.displayName = "Modal";
