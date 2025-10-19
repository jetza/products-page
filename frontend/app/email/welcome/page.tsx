import EmailFooter from "@/components/email/EmailFooter";
import { CONTENT } from "@/lib/constants/content";

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto px-3 lg:px-[116px] py-8 lg:py-24">
        <div className="bg-white rounded-3xl px-5 lg:px-16 py-8 lg:py-16 shadow-sm">
          <div className="mb-8 lg:mb-16">
            <h1 className="text-xl lg:text-2xl font-medium">
              {CONTENT.brand.name}
            </h1>
          </div>

          <div className="space-y-6 lg:space-y-8">
            <h2 className="text-3xl md:text-5xl font-normal">
              {CONTENT.emails.welcome.title}
            </h2>

            <p className="text-base text-gray-900">
              {CONTENT.emails.welcome.greeting}
            </p>

            <div className="space-y-4">
              <p className="text-base text-gray-900 font-medium">
                {CONTENT.emails.welcome.subheading}
              </p>

              <ul className="space-y-3 ml-5">
                {CONTENT.emails.welcome.benefits.map((benefit, index) => (
                  <li key={index} className="text-base text-gray-900 list-disc">
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <p className="text-base text-gray-900">
                {CONTENT.emails.welcome.signature}
              </p>
              <p className="text-base text-gray-900">
                {CONTENT.emails.welcome.team}
              </p>
            </div>
          </div>

          <EmailFooter />
        </div>
      </div>
    </div>
  );
}
