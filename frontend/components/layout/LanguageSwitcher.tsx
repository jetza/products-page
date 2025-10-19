"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { locales, localeNames, type Locale } from "@/i18n/config";
import { ChevronDownIcon } from "@/components/icons";
import { cn } from "@/lib/utils/cn";

interface LanguageSwitcherProps {
  variant?: "light" | "dark";
  position?: "top" | "bottom";
}

export function LanguageSwitcher({
  variant = "dark",
  position = "bottom",
}: LanguageSwitcherProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const getCurrentLocale = (): Locale => {
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length > 0 && locales.includes(segments[0] as Locale)) {
      return segments[0] as Locale;
    }
    return "en";
  };

  const currentLocale = getCurrentLocale();

  const handleLocaleChange = (newLocale: Locale) => {
    if (newLocale === currentLocale) {
      setIsOpen(false);
      return;
    }

    const segments = pathname.split("/").filter(Boolean);
    const hasLocaleInPath =
      segments.length > 0 && locales.includes(segments[0] as Locale);
    const pathWithoutLocale = hasLocaleInPath
      ? `/${segments.slice(1).join("/")}`
      : pathname;

    let newPath: string;
    if (newLocale === "en") {
      newPath = pathWithoutLocale || "/";
    } else {
      newPath =
        pathWithoutLocale === "/"
          ? `/${newLocale}`
          : `/${newLocale}${pathWithoutLocale}`;
    }

    setIsOpen(false);

    window.location.href = newPath;
  };

  const isLight = variant === "light";
  const textClass = isLight ? "text-white" : "text-black";
  const dropdownBgClass = isLight ? "bg-white" : "bg-white";

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn("flex items-center gap-2 text-base", textClass)}
      >
        <span>{currentLocale.toUpperCase()}</span>
        <ChevronDownIcon
          className={cn("w-3 h-3 transition-transform", isOpen && "rotate-180")}
        />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          <div
            className={cn(
              "absolute right-0 border border-gray-200 rounded shadow-lg w-[200px] z-50",
              position === "top" ? "bottom-full mb-2" : "top-full mt-2",
              dropdownBgClass,
            )}
          >
            {locales.map((locale) => (
              <button
                key={locale}
                onClick={() => handleLocaleChange(locale)}
                className={cn(
                  "block w-full text-left px-4 py-3 text-sm hover:bg-gray-50",
                  currentLocale === locale
                    ? "text-black font-medium"
                    : "text-gray-700",
                )}
              >
                {localeNames[locale]}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
