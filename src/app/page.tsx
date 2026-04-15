import { Inbox } from "lucide-react"

import { ApprovalInbox } from "@/components/approval-inbox"
import { MOCK_APPROVALS } from "@/lib/mock-data"

export default function Home() {
  return (
    <div className="flex flex-1 flex-col gap-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-sm ring-1 ring-primary/15">
          <Inbox className="size-6" strokeWidth={1.75} aria-hidden />
        </div>
        <div className="min-w-0 flex-1 space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            Pending approvals
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
            Select a row or &quot;View&quot; to inspect impact, risk, and
            recommendation—then approve or reject.
          </p>
        </div>
      </div>
      <ApprovalInbox approvals={MOCK_APPROVALS} />
    </div>
  )
}
