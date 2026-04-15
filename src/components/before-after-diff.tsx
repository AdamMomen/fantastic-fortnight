import { Columns2 } from "lucide-react"

import { buildDiffRows } from "@/lib/diff-utils"

type BeforeAfterDiffProps = {
  before: Record<string, string>
  after: Record<string, string>
}

function DiffColumn({
  title,
  entries,
}: {
  title: string
  entries: Record<string, string>
}) {
  const keys = Object.keys(entries)
  return (
    <div className="rounded-lg border border-border bg-card p-3 shadow-sm transition-shadow hover:shadow-md">
      <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {title}
      </h4>
      <dl className="mt-3 space-y-2">
        {keys.length === 0 ? (
          <p className="text-sm text-muted-foreground">No data</p>
        ) : (
          keys.map((key) => (
            <div key={key}>
              <dt className="text-xs text-muted-foreground">{key}</dt>
              <dd className="text-sm font-medium text-foreground">
                {entries[key]}
              </dd>
            </div>
          ))
        )}
      </dl>
    </div>
  )
}

export function BeforeAfterDiff({ before, after }: BeforeAfterDiffProps) {
  const rows = buildDiffRows(before, after)

  if (rows.length === 0) {
    return (
      <div>
        <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          <Columns2 className="size-3.5 shrink-0 opacity-80" aria-hidden />
          Before / after
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          No before/after details.
        </p>
      </div>
    )
  }

  const beforeAligned: Record<string, string> = Object.fromEntries(
    rows.map((r) => [r.key, r.before])
  )
  const afterAligned: Record<string, string> = Object.fromEntries(
    rows.map((r) => [r.key, r.after])
  )

  return (
    <div>
      <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        <Columns2 className="size-3.5 shrink-0 opacity-80" aria-hidden />
        Before / after
      </h3>
      <div className="mt-2 grid gap-3 sm:grid-cols-2">
        <DiffColumn title="Before" entries={beforeAligned} />
        <DiffColumn title="After" entries={afterAligned} />
      </div>
    </div>
  )
}
