"use client"

import { Button } from "@/components/ui/button"
import type { Approval } from "@/lib/mock-data"
import { formatApprovalInboxTimestamp } from "@/lib/format-approval-timestamp"
import { riskBadgeClassName, riskLevelLabel } from "@/lib/risk-utils"
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
        <span
          className={cn(
            "inline-flex rounded-md px-2 py-0.5 text-xs font-medium",
            riskBadgeClassName(approval.riskLevel)
          )}
        >
          {riskLevelLabel(approval.riskLevel)}
        </span>
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
