import { Inbox } from "lucide-react"

export function EmptyApprovalsState() {
  return (
    <div
      className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-muted/25 px-6 py-16 text-center"
      role="status"
      aria-live="polite"
    >
      <div className="flex size-14 items-center justify-center rounded-full bg-muted/90 text-muted-foreground shadow-inner">
        <Inbox className="size-7" strokeWidth={1.5} aria-hidden />
      </div>
      <h2 className="mt-6 text-lg font-semibold tracking-tight text-foreground">
        You&apos;re all caught up
      </h2>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
        No pending approvals right now. New requests will show up here when
        they arrive.
      </p>
    </div>
  )
}
