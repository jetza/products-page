"use client";

import React from "react";
import Link from "next/link";
import { InfoIcon } from "@/components/icons";
import { CONTENT } from "@/lib/constants/content";
import { getHref } from "@/lib/getHref";
import { getCurrentLocale } from "@/lib/getCurrentLocale";

export const LoginPrompt: React.FC = () => {
  const locale = getCurrentLocale();
  return (
    <div className="flex items-center gap-3 bg-gray-100 rounded p-4 text-sm">
      <InfoIcon className="flex-shrink-0 w-5 h-5 text-gray-600" />
      <div className="text-sm leading-relaxed text-gray-600">
  <p>{CONTENT.auth.register.haveAccount} <Link href={getHref("/login", locale)} className="font-semibold text-black underline hover:no-underline">{CONTENT.auth.register.loginLink}</Link>.</p>
      </div>
    </div>
  );
};
