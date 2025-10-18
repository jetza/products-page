import Link from "next/link";
import { Button } from "@/components/ui/Buttons/Button";
import EmailFooter from "@/components/email/EmailFooter";

export default function ShippingUpdatePage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto px-3 lg:px-[116px] py-8 lg:py-24">
        <div className="bg-white rounded-3xl px-5 lg:px-16 py-8 lg:py-16 shadow-sm">
          <div className="mb-8 lg:mb-16">
            <h1 className="text-xl lg:text-2xl font-medium">SofaSocietyCo.</h1>
          </div>

          <div className="space-y-6 lg:space-y-8">
            <h2 className="text-3xl md:text-5xl font-normal">Shipping update</h2>

            <p className="text-base text-gray-900">
              Great news! Your order #100002 is now on its way to you. Here are the shipping details.
            </p>

            <p className="text-base text-gray-900">
              You can track your package by clicking below:
            </p>

            <div>
              <Link href="/my-account">
                <Button variant="primary" size="lg">
                  Order details
                </Button>
              </Link>
            </div>

            <p className="text-base text-gray-900">
              Thank you for choosing Sofa Society. We&apos;re excited for your new sofa to find its home with you!
            </p>
          </div>

          <EmailFooter />
        </div>
      </div>
    </div>
  );
}
