interface AboutIntroProps {
  title: string;
  description: string;
  additionalText: string;
}

export function AboutIntro({
  title,
  description,
  additionalText,
}: AboutIntroProps) {
  return (
    <section className="bg-white">
      <div className="px-5">
        <div className="mx-auto px-4 lg:px-24 py-12 lg:py-16">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
            <div className="lg:w-[60%]">
              <h1 className="text-h3 lg:text-h2 font-semibold text-black leading-tight">
                {title}
              </h1>
            </div>

            <div className="lg:w-[40%] lg:pt-[72px] space-y-6">
              <p className="text-body text-gray-700 leading-relaxed">
                {description}
              </p>
              <p className="text-body text-gray-700 leading-relaxed">
                {additionalText}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
