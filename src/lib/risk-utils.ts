import type { ApprovalRiskLevel } from "@/lib/mock-data"

export function riskLevelLabel(level: ApprovalRiskLevel): string {
  switch (level) {
    case "low":
      return "Low"
    case "medium":
      return "Medium"
    case "high":
      return "High"
  }
}

/** Tailwind classes for inbox risk chips (Phase 2); refined again in RiskBadge (Phase 4). */
export function riskBadgeClassName(level: ApprovalRiskLevel): string {
  switch (level) {
    case "low":
      return "bg-emerald-500/15 text-emerald-900 ring-1 ring-emerald-500/35 dark:text-emerald-200"
    case "medium":
      return "bg-amber-500/15 text-amber-950 ring-1 ring-amber-500/40 dark:text-amber-200"
    case "high":
      return "bg-red-500/15 text-red-950 ring-1 ring-red-500/40 dark:text-red-200"
  }
}
