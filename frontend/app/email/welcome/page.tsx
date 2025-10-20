import { EmailContainer } from "@/components/email/EmailContainer";
import { CONTENT } from "@/lib/constants/content";

export default function WelcomePage() {
  return (
    <EmailContainer>
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
        <p className="text-base text-gray-900">{CONTENT.emails.welcome.team}</p>
      </div>
    </EmailContainer>
  );
}
