"use client";

import { FooterContainer } from "./FooterContainer";
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
        <FooterContainer variant="desktop" />
      </div>
      <div className="block md:hidden">
        <FooterContainer variant="mobile" />
      </div>
    </>
  );
};
