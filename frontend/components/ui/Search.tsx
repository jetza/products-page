"use client";

import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils/cn";
import { SearchIcon, XIcon } from "@/components/icons";

interface SearchProps {
  variant?: "desktop" | "mobile";
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export const Search: React.FC<SearchProps> = ({
  variant = "desktop",
  isOpen,
  onClose,
  className,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement search functionality
    console.log("Searching for:", searchQuery);
  };

  if (!isOpen) return null;

  if (variant === "mobile") {
    return (
      <div className={cn("px-4 pb-4 bg-black", className)}>
        <form onSubmit={handleSearch}>
          <div className="relative">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-12 pr-12 bg-black border-none text-white placeholder:text-white/60 focus:outline-none"
            />
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-1/2 -translate-y-1/2"
              aria-label="Close search"
            >
              <XIcon className="w-5 h-5 text-white" />
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />

      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-20">
        <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl mx-4">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <SearchIcon className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-16 pl-16 pr-16 text-body border-none focus:outline-none rounded-lg"
              />
              <button
                type="button"
                onClick={onClose}
                className="absolute right-6 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close search"
              >
                <XIcon className="w-6 h-6 text-gray-600" />
              </button>
            </div>
          </form>

          {searchQuery && (
            <div className="border-t border-gray-200 p-6">
              <p className="text-sm text-gray-500">
                Search results for &quot;{searchQuery}&quot; will appear here...
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

Search.displayName = "Search";
