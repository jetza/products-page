import React from "react";

interface NotificationProps {
  message: string;
  isOpen: boolean;
  onClose: () => void;
  duration?: number;
}

export const Notification: React.FC<NotificationProps> = ({ message, isOpen, onClose, duration = 2000 }) => {
  React.useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, duration, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 bg-black text-white px-6 py-3 rounded shadow-lg animate-fade-in">
      {message}
    </div>
  );
};
