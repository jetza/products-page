"use client";

import { Header } from "./Header";
import { useEffect, useState } from "react";

interface ResponsiveHeaderProps {
  theme?: "solid" | "transparent";
}

export const ResponsiveHeader: React.FC<ResponsiveHeaderProps> = ({ theme = "solid" }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <div className="hidden md:block">
        <Header variant="desktop" theme={theme} />
      </div>
      <div className="block md:hidden">
        <Header variant="mobile" theme={theme} />
      </div>
    </>
  );
};
