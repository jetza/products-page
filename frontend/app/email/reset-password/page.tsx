import Link from "next/link";
import { getHref } from "@/lib/getHref";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import { Button } from "@/components/ui/Buttons/Button";
import EmailFooter from "@/components/email/EmailFooter";
import { CONTENT } from "@/lib/constants/content";

export default function ResetPasswordPage() {
  const locale = getCurrentLocale();
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto px-3 lg:px-[116px] py-8 lg:py-24">
        <div className="bg-white rounded-3xl px-5 lg:px-16 py-8 lg:py-16 shadow-sm">
          <div className="mb-8 lg:mb-16">
            <h1 className="text-xl lg:text-2xl font-medium">{CONTENT.brand.name}</h1>
          </div>

        <div className="space-y-6 lg:space-y-8">
          <h2 className="text-3xl md:text-5xl font-normal">{CONTENT.emails.resetPassword.title}</h2>

          <p className="text-base text-gray-900">
            {CONTENT.emails.resetPassword.message}
          </p>

          <div>
            <Link href={getHref("/my-account", locale)}>
              <Button variant="primary" size="lg">
                {CONTENT.emails.resetPassword.button}
              </Button>
            </Link>
          </div>

          <p className="text-base text-gray-400">
            {CONTENT.emails.resetPassword.disclaimer}
          </p>
        </div>

        <EmailFooter />
        </div>
      </div>
    </div>
  );
}
