// Utility to prefix hrefs with /hr if locale is Croatian
export function getHref(path: string, locale: string) {
  return locale === "hr" ? `/hr${path}` : path;
}