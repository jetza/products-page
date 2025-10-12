"use client";

import { Header } from "./Header";
import { useEffect, useState } from "react";

export const ResponsiveHeader = () => {
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
        <Header variant="desktop" />
      </div>
      <div className="block md:hidden">
        <Header variant="mobile" />
      </div>
    </>
  );
};
