"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Header } from "@/components/layout/Header";

export default function RegisterPage() {
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
      <Header />
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
              Hey, welcome to<br />Sofa Society!
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  type="text"
                  placeholder="First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
                <Input
                  type="text"
                  placeholder="Last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>

              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <Input
                type="password"
                placeholder="Confirm Password"
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
                Register
              </Button>
            </form>

            <p className="text-base text-gray-500 mt-8">
              Already have an account? No worries, just{" "}
              <Link href="/login" className="text-black font-medium underline hover:no-underline">
                log in
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
