import EmailFooter from "@/components/email/EmailFooter";

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto px-3 lg:px-[116px] py-8 lg:py-24">
        <div className="bg-white rounded-3xl px-5 lg:px-16 py-8 lg:py-16 shadow-sm">
          <div className="mb-8 lg:mb-16">
            <h1 className="text-xl lg:text-2xl font-medium">SofaSocietyCo.</h1>
          </div>

        <div className="space-y-6 lg:space-y-8">
          <h2 className="text-3xl md:text-5xl font-normal">Welcome to Sofa Society!</h2>

          <p className="text-base text-gray-900">
            Welcome to Sofa Society! We&apos;re excited to have you join our community of comfort enthusiasts. With our carefully crafted sofas, you&apos;re just steps away from adding elegance and coziness to your living space.
          </p>

          <div className="space-y-4">
            <p className="text-base text-gray-900 font-medium">
              As a new member, here&apos;s what you can expect:
            </p>

            <ul className="space-y-3 ml-5">
              <li className="text-base text-gray-900 list-disc">
                Premium, high-quality sofas in a range of styles and materials
              </li>
              <li className="text-base text-gray-900 list-disc">
                Dedicated customer support ready to assist you
              </li>
              <li className="text-base text-gray-900 list-disc">
                Exclusive offers and early access to new collections
              </li>
              <li className="text-base text-gray-900 list-disc">
                Explore our collections and find the sofa that suits your style!
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <p className="text-base text-gray-900">Best wishes,</p>
            <p className="text-base text-gray-900">The Sofa Society Team</p>
          </div>
        </div>

        <EmailFooter />
        </div>
      </div>
    </div>
  );
}
