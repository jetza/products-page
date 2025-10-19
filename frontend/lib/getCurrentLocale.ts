// Returns the current locale based on pathname. Extend as needed for your app.
export function getCurrentLocale(): string {
  if (typeof window !== "undefined") {
    return window.location.pathname.startsWith("/hr") ? "hr" : "en";
  }
  // Default fallback for SSR
  return "en";
}