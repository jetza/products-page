import Link from "next/link";
import { Button } from "@/components/ui/Buttons/Button";
import EmailFooter from "@/components/email/EmailFooter";

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto px-3 lg:px-[116px] py-8 lg:py-24">
        <div className="bg-white rounded-3xl px-5 lg:px-16 py-8 lg:py-16 shadow-sm">
          <div className="mb-8 lg:mb-16">
            <h1 className="text-xl lg:text-2xl font-medium">SofaSocietyCo.</h1>
          </div>

        <div className="space-y-6 lg:space-y-8">
          <h2 className="text-3xl md:text-5xl font-normal">Reset your password</h2>

          <p className="text-base text-gray-900">
            We received a request to reset your Sofa Society account password. Click below to set a new password:
          </p>

          <div>
            <Link href="/my-account">
              <Button variant="primary" size="lg">
                Reset password
              </Button>
            </Link>
          </div>

          <p className="text-base text-gray-400">
            If you didn&apos;t request this change, please ignore this email, and your current password will remain unchanged.
          </p>
        </div>

        <EmailFooter />
        </div>
      </div>
    </div>
  );
}
