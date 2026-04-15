import type { ApprovalRiskLevel } from "@/lib/mock-data"
import { riskBadgeClassName, riskLevelLabel } from "@/lib/risk-utils"
import { cn } from "@/lib/utils"

type RiskBadgeProps = {
  level: ApprovalRiskLevel
  className?: string
}

export function RiskBadge({ level, className }: RiskBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex rounded-md px-2 py-0.5 text-xs font-medium",
        riskBadgeClassName(level),
        className
      )}
    >
      {riskLevelLabel(level)}
    </span>
  )
}
