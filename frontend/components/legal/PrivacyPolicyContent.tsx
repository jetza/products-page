import { CONTENT } from "@/lib/constants/content";

export const PrivacyPolicyContent = () => {
  const { privacyPolicy } = CONTENT;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-h2 font-medium text-black mb-12 text-center">
          {privacyPolicy.title}
        </h1>

        <div className="mb-12">
          <p className="text-base text-black leading-relaxed">
            {privacyPolicy.intro}
          </p>
        </div>

        <section className="mb-12">
          <h2 className="text-big font-semibold text-black mb-6">
            {privacyPolicy.sections.informationWeCollect.title}
          </h2>

          <p className="text-base text-black leading-relaxed mb-4">
            {privacyPolicy.sections.informationWeCollect.description}
          </p>

          <ul className="list-disc pl-6 mb-6 space-y-2">
            {privacyPolicy.sections.informationWeCollect.items.map(
              (item, index) => (
                <li
                  key={index}
                  className="text-base text-black leading-relaxed"
                >
                  {item}
                </li>
              )
            )}
          </ul>

          <p className="text-base text-black leading-relaxed mb-4">
            {privacyPolicy.sections.informationWeCollect.additionalInfo}
          </p>

          <ul className="list-disc pl-6 space-y-2">
            {privacyPolicy.sections.informationWeCollect.additionalItems.map(
              (item, index) => (
                <li
                  key={index}
                  className="text-base text-black leading-relaxed"
                >
                  {item}
                </li>
              )
            )}
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-big font-semibold text-black mb-6">
            {privacyPolicy.sections.howWeUse.title}
          </h2>

          <p className="text-base text-black leading-relaxed mb-4">
            {privacyPolicy.sections.howWeUse.description}
          </p>

          <ul className="list-disc pl-6 space-y-2">
            {privacyPolicy.sections.howWeUse.items.map((item, index) => (
              <li key={index} className="text-base text-black leading-relaxed">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-big font-semibold text-black mb-6">
            {privacyPolicy.sections.cookies.title}
          </h2>

          <p className="text-base text-black leading-relaxed">
            {privacyPolicy.sections.cookies.description}
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-big font-semibold text-black mb-6">
            {privacyPolicy.sections.dataSharing.title}
          </h2>

          <p className="text-base text-black leading-relaxed mb-4">
            {privacyPolicy.sections.dataSharing.description}
          </p>

          <ul className="list-disc pl-6 mb-6 space-y-2">
            {privacyPolicy.sections.dataSharing.items.map((item, index) => (
              <li key={index} className="text-base text-black leading-relaxed">
                {item}
              </li>
            ))}
          </ul>

          <p className="text-base text-black leading-relaxed">
            {privacyPolicy.sections.dataSharing.note}
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-big font-semibold text-black mb-6">
            {privacyPolicy.sections.dataSecurity.title}
          </h2>

          <p className="text-base text-black leading-relaxed">
            {privacyPolicy.sections.dataSecurity.description}
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-big font-semibold text-black mb-6">
            {privacyPolicy.sections.yourChoices.title}
          </h2>

          <p className="text-base text-black leading-relaxed mb-4">
            {privacyPolicy.sections.yourChoices.description}
          </p>

          <ul className="list-disc pl-6 space-y-2">
            {privacyPolicy.sections.yourChoices.items.map((item, index) => (
              <li key={index} className="text-base text-black leading-relaxed">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-big font-semibold text-black mb-6">
            {privacyPolicy.sections.childrensPrivacy.title}
          </h2>

          <p className="text-base text-black leading-relaxed">
            {privacyPolicy.sections.childrensPrivacy.description}
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-big font-semibold text-black mb-6">
            {privacyPolicy.sections.changes.title}
          </h2>

          <p className="text-base text-black leading-relaxed">
            {privacyPolicy.sections.changes.description}
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-big font-semibold text-black mb-6">
            {privacyPolicy.sections.contactUs.title}
          </h2>

          <p className="text-base text-black leading-relaxed mb-4">
            {privacyPolicy.sections.contactUs.description}
          </p>

          <div className="space-y-2">
            <p className="text-base text-black leading-relaxed">
              {privacyPolicy.sections.contactUs.email}
            </p>
            <p className="text-base text-black leading-relaxed">
              {privacyPolicy.sections.contactUs.address}
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};
