import React from "react";
import EmailFooter from "./EmailFooter";
import { CONTENT } from "@/lib/constants/content";

interface EmailContainerProps {
  children: React.ReactNode;
}

export const EmailContainer: React.FC<EmailContainerProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto px-3 lg:px-[116px] py-8 lg:py-24">
        <div className="bg-white rounded-3xl px-5 lg:px-16 py-8 lg:py-16 shadow-sm">
          <div className="mb-8 lg:mb-16">
            <h1 className="text-xl lg:text-2xl font-medium">
              {CONTENT.brand.name}
            </h1>
          </div>

          <div className="space-y-6 lg:space-y-8">{children}</div>

          <EmailFooter />
        </div>
      </div>
    </div>
  );
};
