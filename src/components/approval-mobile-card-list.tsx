"use client"

import { ChevronRight, Clock } from "lucide-react"

import { RiskBadge } from "@/components/risk-badge"
import type { Approval } from "@/lib/mock-data"
import { formatApprovalInboxTimestamp } from "@/lib/format-approval-timestamp"
import { cn } from "@/lib/utils"

type ApprovalMobileCardListProps = {
  approvals: Approval[]
  selectedId: string | null
  onActivate: (approval: Approval) => void
}

export function ApprovalMobileCardList({
  approvals,
  selectedId,
  onActivate,
}: ApprovalMobileCardListProps) {
  return (
    <ul className="flex flex-col gap-3" role="list">
      {approvals.map((approval) => (
        <li key={approval.id}>
          <button
            type="button"
            onClick={() => onActivate(approval)}
            className={cn(
              "group flex w-full items-start gap-3 rounded-xl border border-border bg-card p-4 text-left shadow-sm transition-all duration-150",
              "hover:border-primary/25 hover:bg-muted/35 hover:shadow-md",
              "active:scale-[0.99]",
              selectedId === approval.id &&
                "border-primary/40 bg-muted/45 shadow-md ring-1 ring-primary/15"
            )}
          >
            <div className="min-w-0 flex-1 space-y-2.5">
              <p className="line-clamp-2 text-[15px] font-medium leading-snug text-foreground">
                {approval.title}
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <RiskBadge level={approval.riskLevel} />
                <span className="inline-flex items-center gap-1 text-xs text-muted-foreground tabular-nums">
                  <Clock className="size-3.5 shrink-0 opacity-80" aria-hidden />
                  {formatApprovalInboxTimestamp(approval.timestamp)}
                </span>
              </div>
            </div>
            <ChevronRight
              className="mt-0.5 size-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5"
              aria-hidden
            />
          </button>
        </li>
      ))}
    </ul>
  )
}
