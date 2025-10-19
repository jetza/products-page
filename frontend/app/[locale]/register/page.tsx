"use client";

import { useState } from "react";
import Link from "next/link";
import { getHref } from "@/lib/getHref";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import Image from "next/image";
import { Button } from "@/components/ui/Buttons/Button";
import { Input } from "@/components/ui/Input";
import { ResponsiveHeader } from "@/components/layout/ResponsiveHeader";
import { CONTENT } from "@/lib/constants/content";

export default function RegisterPage() {
  const locale = getCurrentLocale();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement registration logic
    console.log("Register:", { firstName, lastName, email, password });
  };

  return (
    <div className="fixed inset-0 bg-white flex flex-col">
      <ResponsiveHeader />
      <div className="grid grid-cols-1 lg:grid-cols-2 flex-1">
        <div className="hidden lg:block relative">
          <Image
            src="/collections/image.png"
            alt="Modern living room with grey sofa"
            fill
            className="object-cover"
            priority
            quality={100}
          />
        </div>

        <div className="flex items-center justify-center px-6 py-12 overflow-y-auto">
          <div className="w-full max-w-md">
            <h1 className="text-h2 font-medium text-black mb-12">
              {CONTENT.auth.register.title}<br />{CONTENT.auth.register.titleBrand}
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  type="text"
                  placeholder={CONTENT.auth.register.placeholders.firstName}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
                <Input
                  type="text"
                  placeholder={CONTENT.auth.register.placeholders.lastName}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>

              <Input
                type="email"
                placeholder={CONTENT.auth.register.placeholders.email}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <Input
                type="password"
                placeholder={CONTENT.auth.register.placeholders.password}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <Input
                type="password"
                placeholder={CONTENT.auth.register.placeholders.confirmPassword}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
              >
                {CONTENT.auth.register.button}
              </Button>
            </form>

            <p className="text-base text-gray-500 mt-8">
              {CONTENT.auth.register.haveAccount}{" "}
              <Link href={getHref("/login", locale)} className="text-black font-medium underline hover:no-underline">
                {CONTENT.auth.register.loginLink}
              </Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
