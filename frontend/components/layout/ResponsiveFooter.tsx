"use client";

import { Footer } from "./Footer";
import { useEffect, useState } from "react";

export const ResponsiveFooter = () => {
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
        <Footer variant="desktop" />
      </div>
      <div className="block md:hidden">
        <Footer variant="mobile" />
      </div>
    </>
  );
};
