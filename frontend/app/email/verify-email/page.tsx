"use client";

import { useRouter } from "next/navigation";
import { getHref } from "@/lib/getHref";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import { Button } from "@/components/ui/Buttons/Button";
import { EmailContainer } from "@/components/email/EmailContainer";
import { CONTENT } from "@/lib/constants/content";

export default function VerifyEmailPage() {
  const router = useRouter();
  const locale = getCurrentLocale();
  const userName = "Jovana";

  return (
    <EmailContainer>
      <h2 className="text-3xl md:text-5xl font-normal">
        {CONTENT.emails.verifyEmail.title}
      </h2>

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
          onClick={() => router.push(getHref("/my-account", locale))}
        >
          {CONTENT.emails.verifyEmail.button}
        </Button>
      </div>
    </EmailContainer>
  );
}
