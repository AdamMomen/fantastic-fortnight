"use client"

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
        "cursor-pointer border-b border-border transition-colors hover:bg-muted/50",
        isSelected && "bg-muted/40"
      )}
      onClick={() => onActivate(approval)}
    >
      <td className="max-w-[min(24rem,40vw)] px-3 py-3 align-middle">
        <span className="line-clamp-2 font-medium text-foreground">
          {approval.title}
        </span>
      </td>
      <td className="whitespace-nowrap px-3 py-3 align-middle">
        <RiskBadge level={approval.riskLevel} />
      </td>
      <td className="whitespace-nowrap px-3 py-3 align-middle text-muted-foreground tabular-nums">
        {formatApprovalInboxTimestamp(approval.timestamp)}
      </td>
      <td className="w-px whitespace-nowrap px-3 py-3 align-middle text-right">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="pointer-events-auto"
          onClick={(e) => {
            e.stopPropagation()
            onActivate(approval)
          }}
        >
          View
        </Button>
      </td>
    </tr>
  )
}
