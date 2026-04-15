"use client"

import { ApprovalRow } from "@/components/approval-row"
import type { Approval } from "@/lib/mock-data"

type ApprovalTableProps = {
  approvals: Approval[]
  selectedId: string | null
  onRowActivate: (approval: Approval) => void
}

export function ApprovalTable({
  approvals,
  selectedId,
  onRowActivate,
}: ApprovalTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-sm">
      <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/40 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            <th scope="col" className="px-3 py-2.5 font-medium">
              Title
            </th>
            <th scope="col" className="px-3 py-2.5 font-medium">
              Risk
            </th>
            <th scope="col" className="px-3 py-2.5 font-medium">
              Time
            </th>
            <th scope="col" className="px-3 py-2.5 font-medium">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {approvals.map((approval) => (
            <ApprovalRow
              key={approval.id}
              approval={approval}
              isSelected={approval.id === selectedId}
              onActivate={onRowActivate}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}
