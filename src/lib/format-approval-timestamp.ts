/** Formats ISO timestamps for the approval inbox list (stable for tests via fixed locale). */
export function formatApprovalInboxTimestamp(
  iso: string,
  locale = "en-US",
  timeZone = "UTC"
): string {
  const d = new Date(iso)
  return new Intl.DateTimeFormat(locale, {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone,
  }).format(d)
}
