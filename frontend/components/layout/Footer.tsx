"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils/cn";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

interface FooterProps {
  variant?: "desktop" | "mobile";
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({ 
  variant = "desktop",
  className 
}) => {
  const [email, setEmail] = useState("");

  if (variant === "mobile") {
    return (
      <footer className={cn("bg-white border-t border-gray-200 py-6 px-6", className)}>
        <div className="max-w-md mx-auto">
          <div className="mb-6">
            <h2 className="text-big font-semibold">
              Sofa<br />Society<br />Co.
            </h2>
            <p className="text-xs text-gray-600 mt-4">© 2024, Sofa Society</p>
          </div>

          <div className="mb-12">
            <h3 className="text-body font-semibold mb-4">Join our newsletter</h3>
            <p className="text-sm text-gray-600 mb-4">
              We will ultra-send you our discount coupons!
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1"
              />
              <Button variant="primary" size="md">
                Subscribe
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              By subscribing you agree to with our{" "}
              <Link href="/privacy" className="underline">
                Privacy Policy
              </Link>{" "}
              and provide consent to receive updates from our company.
            </p>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-3 gap-8 text-sm">
            <div>
              <Link href="/faq" className="block mb-3 hover:text-gray-600">
                FAQ
              </Link>
              <Link href="/help" className="block mb-3 hover:text-gray-600">
                Help
              </Link>
              <Link href="/delivery" className="block mb-3 hover:text-gray-600">
                Delivery
              </Link>
              <Link href="/returns" className="block hover:text-gray-600">
                Returns
              </Link>
            </div>
            <div>
              <Link href="/instagram" className="block mb-3 hover:text-gray-600">
                Instagram
              </Link>
              <Link href="/tiktok" className="block mb-3 hover:text-gray-600">
                TikTok
              </Link>
              <Link href="/pinterest" className="block mb-3 hover:text-gray-600">
                Pinterest
              </Link>
              <Link href="/facebook" className="block hover:text-gray-600">
                Facebook
              </Link>
            </div>
            <div>
              <Link href="/privacy-policy" className="block mb-3 hover:text-gray-600">
                Privacy Policy
              </Link>
              <Link href="/cookie-policy" className="block mb-3 hover:text-gray-600">
                Cookie Policy
              </Link>
              <Link href="/terms-of-use" className="block hover:text-gray-600">
                Terms of Use
              </Link>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className={cn("bg-white border-t border-gray-200 py-6", className)}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-5 gap-8">
          <div>
            <h2 className="text-big font-semibold mb-4">
              Sofa<br />Society<br />Co.
            </h2>
            <p className="text-xs text-gray-600">© 2024, Sofa Society</p>
          </div>

          <div>
            <Link href="/faq" className="block mb-3 text-sm hover:text-gray-600">
              FAQ
            </Link>
            <Link href="/help" className="block mb-3 text-sm hover:text-gray-600">
              Help
            </Link>
            <Link href="/delivery" className="block mb-3 text-sm hover:text-gray-600">
              Delivery
            </Link>
            <Link href="/returns" className="block text-sm hover:text-gray-600">
              Returns
            </Link>
          </div>

          <div>
            <Link href="/instagram" className="block mb-3 text-sm hover:text-gray-600">
              Instagram
            </Link>
            <Link href="/tiktok" className="block mb-3 text-sm hover:text-gray-600">
              TikTok
            </Link>
            <Link href="/pinterest" className="block mb-3 text-sm hover:text-gray-600">
              Pinterest
            </Link>
            <Link href="/facebook" className="block text-sm hover:text-gray-600">
              Facebook
            </Link>
          </div>

          <div>
            <Link href="/privacy-policy" className="block mb-3 text-sm hover:text-gray-600">
              Privacy Policy
            </Link>
            <Link href="/cookie-policy" className="block mb-3 text-sm hover:text-gray-600">
              Cookie Policy
            </Link>
            <Link href="/terms-of-use" className="block text-sm hover:text-gray-600">
              Terms of Use
            </Link>
          </div>

          <div>
            <h3 className="text-body font-semibold mb-4">Join our newsletter</h3>
            <p className="text-sm text-gray-600 mb-4">
              We will ultra-send you our discount coupons!
            </p>
            <div className="flex flex-col gap-2">
              <Input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
              />
              <Button variant="primary" size="md" fullWidth>
                Subscribe
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-3">
              By subscribing you agree to with our{" "}
              <Link href="/privacy" className="underline">
                Privacy Policy
              </Link>{" "}
              and provide consent to receive updates from our company.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

Footer.displayName = "Footer";
