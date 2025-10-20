import Link from "next/link";
import { getHref } from "@/lib/getHref";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import { Button } from "@/components/ui/Buttons/Button";
import { EmailContainer } from "@/components/email/EmailContainer";
import { CONTENT } from "@/lib/constants/content";

export default function ShippingUpdatePage() {
  const locale = getCurrentLocale();
  const orderNumber = "100002";

  return (
    <EmailContainer>
      <h2 className="text-3xl md:text-5xl font-normal">
        {CONTENT.emails.shippingUpdate.title}
      </h2>

      <p className="text-base text-gray-900">
        {CONTENT.emails.shippingUpdate.message1(orderNumber)}
      </p>

      <p className="text-base text-gray-900">
        {CONTENT.emails.shippingUpdate.message2}
      </p>

      <div>
        <Link href={getHref("/my-account", locale)}>
          <Button variant="primary" size="lg">
            {CONTENT.emails.shippingUpdate.button}
          </Button>
        </Link>
      </div>

      <p className="text-base text-gray-900">
        {CONTENT.emails.shippingUpdate.thankYou}
      </p>
    </EmailContainer>
  );
}
