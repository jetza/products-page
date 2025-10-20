"use client";

import { Header } from "./Header";
import { useEffect, useState } from "react";

interface ResponsiveHeaderProps {
  theme?: "solid" | "transparent";
  className?: string;
}

export const ResponsiveHeader: React.FC<ResponsiveHeaderProps> = ({
  theme = "solid",
  className,
}) => {
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
        <Header variant="desktop" theme={theme} className={className} />
      </div>
      <div className="block md:hidden">
        <Header variant="mobile" theme="solid" className={className} />
      </div>
    </>
  );
};
