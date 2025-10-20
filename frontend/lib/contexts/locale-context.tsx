"use client";
import React, { createContext, useEffect, useState } from "react";

export interface LocaleContextType {
  locale: string;
  setLocale: (locale: string) => void;
}

export const LocaleContext = createContext<LocaleContextType | undefined>(
  undefined
);

interface LocaleProviderProps {
  children: React.ReactNode;
  initialLocale: string;
}

export const LocaleProvider: React.FC<LocaleProviderProps> = ({
  children,
  initialLocale,
}) => {
  const [locale, setLocaleState] = useState<string>(initialLocale);

  useEffect(() => {
    // Update locale state when initialLocale changes (URL navigation)
    setLocaleState(initialLocale);

    // Save to localStorage and cookie so it persists across sessions
    localStorage.setItem("locale", initialLocale);
    document.cookie = `NEXT_LOCALE=${initialLocale}; path=/; max-age=31536000`;
  }, [initialLocale]);

  const setLocale = React.useCallback((newLocale: string) => {
    setLocaleState(newLocale);
    if (typeof window !== "undefined") {
      localStorage.setItem("locale", newLocale);
      // Also set a cookie so middleware can read it
      document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;
    }
  }, []);

  const value = React.useMemo(
    () => ({ locale, setLocale }),
    [locale, setLocale]
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
};
