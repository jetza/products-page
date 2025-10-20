"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils/cn";
import { Button } from "../Buttons/Button";
import { Input } from "../Form/Input";
import { Notification } from "../Feedback/Notification";
import { LoadingSpinner } from "../icons/LoadingSpinner";
import Link from "next/link";
import { getHref } from "@/lib/getHref";
import { useLocale } from "@/lib/hooks/useLocale";
import { CONTENT } from "@/lib/constants/content";

interface NewsletterProps {
  layout?: "horizontal" | "vertical";
  className?: string;
}

export const Newsletter: React.FC<NewsletterProps> = ({
  layout = "horizontal",
  className,
}) => {
  const { locale } = useLocale();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubscribe = async () => {
    if (!email.trim()) {
      setNotificationMessage("Please enter your email address");
      setShowNotification(true);
      return;
    }

    if (!validateEmail(email)) {
      setNotificationMessage("Please enter a valid email address");
      setShowNotification(true);
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setNotificationMessage("Successfully subscribed to newsletter!");
      setShowNotification(true);
      setEmail("");
    }, 2000);
  };

  return (
    <>
      <div className={cn("w-full", className)}>
        <h3 className="text-body font-semibold mb-4">
          {CONTENT.footer.newsletter.title}
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          {CONTENT.footer.newsletter.coupons}
        </p>
        {layout === "horizontal" ? (
          <div className="flex flex-row gap-2 w-full items-stretch">
            <div className="flex-1 min-w-0">
              <Input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                disabled={isLoading}
              />
            </div>
            <Button
              variant="primary"
              size="md"
              onClick={handleSubscribe}
              className="whitespace-nowrap flex-shrink-0 h-12"
              disabled={isLoading}
            >
              {isLoading ? (
                <LoadingSpinner className="w-5 h-5 animate-spin" />
              ) : (
                "Subscribe"
              )}
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
              disabled={isLoading}
            />
            <Button
              variant="primary"
              size="md"
              fullWidth
              onClick={handleSubscribe}
              disabled={isLoading}
            >
              {isLoading ? (
                <LoadingSpinner className="w-5 h-5 animate-spin mx-auto" />
              ) : (
                "Subscribe"
              )}
            </Button>
          </div>
        )}
        <p
          className={cn(
            "text-xs text-gray-500",
            layout === "vertical" ? "mt-3" : "mt-2"
          )}
        >
          {CONTENT.footer.newsletter.agree}{" "}
          <Link href={getHref("/privacy-policy", locale)} className="underline">
            {CONTENT.footer.newsletter.privacy}
          </Link>{" "}
          {CONTENT.footer.newsletter.consent}
        </p>
      </div>
      <Notification
        message={notificationMessage}
        isOpen={showNotification}
        onClose={() => setShowNotification(false)}
        duration={3000}
      />
    </>
  );
};
