"use client";

import React from "react";
import Link from "next/link";
import { InfoIcon } from "@/components/icons";

export const LoginPrompt: React.FC = () => {
  return (
    <div className="flex items-center gap-3 bg-gray-100 rounded p-4 text-sm">
      <InfoIcon className="flex-shrink-0 w-5 h-5 text-gray-600" />
      <div className="text-sm leading-relaxed text-gray-600">
        <p>Already have an account?</p>
        <p>No worries, just <Link href="/login" className="font-semibold text-black underline hover:no-underline">log in</Link>.</p>
      </div>
    </div>
  );
};
