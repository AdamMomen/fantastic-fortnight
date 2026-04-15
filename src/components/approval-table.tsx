"use client"

import { Clock, FileText, Shield, Eye } from "lucide-react"

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
    <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-sm ring-1 ring-black/[0.04] dark:ring-white/10">
      <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/50 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            <th scope="col" className="px-4 py-3 font-medium">
              <span className="inline-flex items-center gap-1.5">
                <FileText className="size-3.5 opacity-70" aria-hidden />
                Title
              </span>
            </th>
            <th scope="col" className="px-4 py-3 font-medium">
              <span className="inline-flex items-center gap-1.5">
                <Shield className="size-3.5 opacity-70" aria-hidden />
                Risk
              </span>
            </th>
            <th scope="col" className="px-4 py-3 font-medium">
              <span className="inline-flex items-center gap-1.5">
                <Clock className="size-3.5 opacity-70" aria-hidden />
                Time
              </span>
            </th>
            <th scope="col" className="px-4 py-3 font-medium">
              <span className="inline-flex items-center gap-1.5">
                <Eye className="size-3.5 opacity-70" aria-hidden />
                View
              </span>
            </th>
          </tr>
        </thead>
        <tbody className="[&_tr:last-child]:border-0">
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
