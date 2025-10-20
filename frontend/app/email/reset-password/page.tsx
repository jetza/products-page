import Link from "next/link";
import { getHref } from "@/lib/getHref";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import { Button } from "@/components/ui/Buttons/Button";
import { EmailContainer } from "@/components/email/EmailContainer";
import { CONTENT } from "@/lib/constants/content";

export default function ResetPasswordPage() {
  const locale = getCurrentLocale();
  return (
    <EmailContainer>
      <h2 className="text-3xl md:text-5xl font-normal">
        {CONTENT.emails.resetPassword.title}
      </h2>

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
    </EmailContainer>
  );
}
