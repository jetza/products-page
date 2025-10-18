"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Buttons/Button";
import EmailFooter from "@/components/email/EmailFooter";
import { CONTENT } from "@/lib/constants/content";

export default function VerifyEmailPage() {
  const router = useRouter();
  const userName = "Jovana";
  
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto px-3 lg:px-[116px] py-8 lg:py-24">
        <div className="bg-white rounded-3xl px-5 lg:px-16 py-8 lg:py-16 shadow-sm">
          <div className="mb-8 lg:mb-16">
            <h1 className="text-xl lg:text-2xl font-medium">{CONTENT.brand.name}</h1>
          </div>

        <div className="space-y-6 lg:space-y-8">
          <h2 className="text-3xl md:text-5xl font-normal">{CONTENT.emails.verifyEmail.title}</h2>

          <p className="text-base text-gray-900">
            {CONTENT.emails.verifyEmail.greeting(userName)}
          </p>

          <div className="space-y-2">
            <p className="text-base text-gray-900">
              {CONTENT.emails.verifyEmail.message1}
            </p>
            <p className="text-base text-gray-900">
              {CONTENT.emails.verifyEmail.message2}
            </p>
          </div>

          <div>
            <Button 
              variant="primary" 
              size="lg"
              onClick={() => router.push('/my-account')}
            >
              {CONTENT.emails.verifyEmail.button}
            </Button>
          </div>
        </div>

        <EmailFooter />
        </div>
      </div>
    </div>
  );
}
