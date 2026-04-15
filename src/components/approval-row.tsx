"use client"

import { Clock, Eye } from "lucide-react"

import { Button } from "@/components/ui/button"
import { RiskBadge } from "@/components/risk-badge"
import type { Approval } from "@/lib/mock-data"
import { formatApprovalInboxTimestamp } from "@/lib/format-approval-timestamp"
import { cn } from "@/lib/utils"

type ApprovalRowProps = {
  approval: Approval
  onActivate: (approval: Approval) => void
  isSelected: boolean
}

export function ApprovalRow({
  approval,
  onActivate,
  isSelected,
}: ApprovalRowProps) {
  return (
    <tr
      className={cn(
        "cursor-pointer border-b border-border transition-colors duration-150",
        "hover:bg-muted/55",
        isSelected && "bg-muted/45"
      )}
      onClick={() => onActivate(approval)}
    >
      <td className="max-w-[min(24rem,40vw)] px-4 py-3.5 align-middle">
        <span className="line-clamp-2 text-[15px] font-medium leading-snug text-foreground">
          {approval.title}
        </span>
      </td>
      <td className="whitespace-nowrap px-4 py-3.5 align-middle">
        <RiskBadge level={approval.riskLevel} />
      </td>
      <td className="whitespace-nowrap px-4 py-3.5 align-middle">
        <span className="inline-flex items-center gap-1.5 text-muted-foreground tabular-nums">
          <Clock className="size-3.5 shrink-0 opacity-70" aria-hidden />
          {formatApprovalInboxTimestamp(approval.timestamp)}
        </span>
      </td>
      <td className="w-px whitespace-nowrap px-4 py-3.5 align-middle text-right">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="pointer-events-auto gap-1.5 transition-colors hover:border-primary/40 hover:bg-primary/5"
          onClick={(e) => {
            e.stopPropagation()
            onActivate(approval)
          }}
        >
          <Eye className="size-3.5 opacity-80" aria-hidden />
          View
        </Button>
      </td>
    </tr>
  )
}
