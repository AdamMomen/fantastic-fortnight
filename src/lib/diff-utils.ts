export type DiffRow = {
  key: string
  before: string
  after: string
}

/** Union of keys, sorted; missing values shown as em dash (aligned diff). */
export function buildDiffRows(
  before: Record<string, string>,
  after: Record<string, string>
): DiffRow[] {
  const keys = [
    ...new Set([...Object.keys(before), ...Object.keys(after)]),
  ].sort((a, b) => a.localeCompare(b))

  return keys.map((key) => ({
    key,
    before: before[key] ?? "—",
    after: after[key] ?? "—",
  }))
}

/** Compact multi-line string for logging or snapshots. */
export function formatDiffForDisplay(rows: DiffRow[]): string {
  return rows.map((r) => `${r.key}: ${r.before} → ${r.after}`).join("\n")
}
