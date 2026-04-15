import { ApprovalInbox } from "@/components/approval-inbox"
import { MOCK_APPROVALS } from "@/lib/mock-data"

export default function Home() {
  return (
    <div className="flex flex-1 flex-col gap-4">
      <div>
        <h1 className="text-lg font-semibold tracking-tight text-foreground">
          Pending approvals
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Select a row or &quot;View&quot; to open a preview. Full detail drawer
          comes in Phase 3.
        </p>
      </div>
      <ApprovalInbox approvals={MOCK_APPROVALS} />
    </div>
  )
}
