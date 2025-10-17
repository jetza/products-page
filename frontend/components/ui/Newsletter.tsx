"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils/cn";
import { Button } from "./Buttons/Button";
import { Input } from "./Input";
import Link from "next/link";

interface NewsletterProps {
  layout?: "horizontal" | "vertical";
  className?: string;
}

export const Newsletter: React.FC<NewsletterProps> = ({ 
  layout = "horizontal",
  className 
}) => {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    console.log("Subscribe:", email);
    // TODO: Implement newsletter subscription logic
  };

  return (
    <div className={cn("w-full", className)}>
      <h3 className="text-body font-semibold mb-4">Join our newsletter</h3>
      <p className="text-sm text-gray-600 mb-4">
        We will ultra-send you our discount coupons!
      </p>
      {layout === "horizontal" ? (
        <div className="flex flex-col sm:flex-row gap-2 w-full items-stretch sm:items-start">
          <div className="flex-1 min-w-0">
            <Input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            />
          </div>
          <Button 
            variant="primary" 
            size="md" 
            onClick={handleSubscribe} 
            className="whitespace-nowrap flex-shrink-0 h-12 w-full sm:w-auto"
          >
            Subscribe
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <Input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />
          <Button variant="primary" size="md" fullWidth onClick={handleSubscribe}>
            Subscribe
          </Button>
        </div>
      )}
      <p className={cn("text-xs text-gray-500", layout === "vertical" ? "mt-3" : "mt-2")}>
        By subscribing you agree to with our{" "}
        <Link href="/privacy" className="underline">
          Privacy Policy
        </Link>{" "}
        and provide consent to receive updates from our company.
      </p>
    </div>
  );
};
