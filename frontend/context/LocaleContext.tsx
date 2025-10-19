"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

interface LocaleContextType {
  locale: string;
  setLocale: (locale: string) => void;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export const LocaleProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [locale, setLocaleState] = useState<string>("en");

  useEffect(() => {
    const stored =
      typeof window !== "undefined" ? localStorage.getItem("locale") : null;
    if (stored) setLocaleState(stored);
  }, []);

  const setLocale = React.useCallback((newLocale: string) => {
    setLocaleState(newLocale);
    if (typeof window !== "undefined") {
      localStorage.setItem("locale", newLocale);
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

export const useLocale = (): LocaleContextType => {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
};
