import Image from "next/image";
import { MOCK_ORDER } from "@/lib/constants/mock-data/mock-email-order.data";
import { EmailContainer } from "@/components/email/EmailContainer";
import { CONTENT } from "@/lib/constants/content";

export default function OrderConfirmationEmailPage() {
  return (
    <EmailContainer>
      <h2 className="text-3xl md:text-5xl font-normal">
        {CONTENT.emails.orderConfirmation.title}
      </h2>

      <p className="text-base text-gray-900">
        {CONTENT.emails.orderConfirmation.message1(MOCK_ORDER.orderNumber)}
      </p>

      <p className="text-base text-gray-900">
        {CONTENT.emails.orderConfirmation.message2}
      </p>

      <p className="text-base text-gray-900">
        {CONTENT.emails.orderConfirmation.thankYou}
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="border border-gray-200 p-5 space-y-2">
          <div className="flex items-center gap-2 text-gray-600 mb-3">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span className="text-sm font-medium">
              {CONTENT.emails.orderConfirmation.deliveryAddress}
            </span>
          </div>
          <p className="text-sm text-gray-900 font-medium">
            {MOCK_ORDER.deliveryAddress.name}
          </p>
          <p className="text-sm text-gray-600">
            {MOCK_ORDER.deliveryAddress.street}
          </p>
          <p className="text-sm text-gray-600">
            {MOCK_ORDER.deliveryAddress.phone}
          </p>
        </div>

        <div className="border border-gray-200 p-5 space-y-2">
          <div className="flex items-center gap-2 text-gray-600 mb-3">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M3 9h18" />
            </svg>
            <span className="text-sm font-medium">
              {CONTENT.emails.orderConfirmation.billingAddress}
            </span>
          </div>
          <p className="text-sm text-gray-900 font-medium">
            {MOCK_ORDER.billingAddress.name}
          </p>
          <p className="text-sm text-gray-600">
            {MOCK_ORDER.billingAddress.street}
          </p>
          <p className="text-sm text-gray-600">
            {MOCK_ORDER.billingAddress.phone}
          </p>
        </div>
      </div>

      <div className="space-y-6 border-t border-b border-gray-200 py-8">
        {MOCK_ORDER.items.map((item) => (
          <div key={item.id} className="flex gap-6">
            <div className="w-32 h-32 bg-gray-100 flex-shrink-0 relative">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 flex justify-between">
              <div className="space-y-1">
                <h3 className="font-medium text-gray-900 text-lg">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {CONTENT.product.material}: {item.material}
                </p>
                <p className="text-sm text-gray-600">
                  {CONTENT.product.color}: {item.color}
                </p>
                <p className="text-sm text-gray-600">
                  {CONTENT.product.quantity}: {item.quantity}
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium text-lg">€{item.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2 text-gray-600">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M3 9h18M7 15h4" />
          </svg>
          <span className="text-sm font-medium">
            {CONTENT.emails.orderConfirmation.payment}
          </span>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">
              {CONTENT.emails.orderConfirmation.subtotal}
            </span>
            <span className="text-gray-900">€{MOCK_ORDER.subtotal}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">
              {CONTENT.emails.orderConfirmation.shipping}
            </span>
            <span className="text-gray-900">€{MOCK_ORDER.shipping}</span>
          </div>
          <div className="flex justify-between text-base font-medium pt-2 border-t border-gray-200">
            <span>{CONTENT.emails.orderConfirmation.total}</span>
            <span>€{MOCK_ORDER.total}</span>
          </div>
          <p className="text-xs text-gray-500">
            {CONTENT.emails.orderConfirmation.tax(`€${MOCK_ORDER.tax}`)}
          </p>
        </div>
      </div>
    </EmailContainer>
  );
}
