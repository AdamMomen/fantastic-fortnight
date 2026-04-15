import type { Approval, ApprovalRiskLevel } from "@/lib/mock-data"

const FALLBACK_EXPLANATION =
  "No additional explanation was provided for this action."

const IMPACT_PLACEHOLDER_KEY = "Details"
const IMPACT_PLACEHOLDER_VALUE = "—"

/** Map any runtime risk string to a UI-safe level (unknown → medium). */
export function normalizeRiskLevel(value: unknown): ApprovalRiskLevel {
  if (value === "low" || value === "medium" || value === "high") return value
  return "medium"
}

export function normalizeExplanation(explanation: unknown): string {
  if (typeof explanation === "string" && explanation.trim().length > 0) {
    return explanation.trim()
  }
  return FALLBACK_EXPLANATION
}

export function normalizeRecommendationLabel(label: unknown): string {
  if (typeof label === "string" && label.trim().length > 0) {
    return label.trim()
  }
  return "Recommendation"
}

export function normalizeRecommendationMessage(message: unknown): string {
  if (typeof message === "string" && message.trim().length > 0) {
    return message.trim()
  }
  return "No recommendation was provided."
}

export type NormalizedRecommendation = {
  label: string
  message: string
  confidence?: number
}

export function normalizeRecommendation(
  recommendation: Approval["recommendation"] | null | undefined
): NormalizedRecommendation {
  if (!recommendation) {
    return {
      label: "Recommendation",
      message: "No recommendation was provided.",
    }
  }
  const out: NormalizedRecommendation = {
    label: normalizeRecommendationLabel(recommendation.label),
    message: normalizeRecommendationMessage(recommendation.message),
  }
  if (recommendation.confidence !== undefined) {
    out.confidence = recommendation.confidence
  }
  return out
}

/** Ensures non-empty impact maps for placeholder UI when data is missing. */
export function normalizeImpact(
  before: Record<string, string> | undefined | null,
  after: Record<string, string> | undefined | null
): { before: Record<string, string>; after: Record<string, string> } {
  const b =
    before && Object.keys(before).length > 0
      ? before
      : { [IMPACT_PLACEHOLDER_KEY]: IMPACT_PLACEHOLDER_VALUE }
  const a =
    after && Object.keys(after).length > 0
      ? after
      : { [IMPACT_PLACEHOLDER_KEY]: IMPACT_PLACEHOLDER_VALUE }
  return { before: b, after: a }
}

export type ApprovalDisplayModel = {
  explanation: string
  riskLevel: ApprovalRiskLevel
  impact: { before: Record<string, string>; after: Record<string, string> }
  recommendation: NormalizedRecommendation
}

export function normalizeApprovalForDisplay(
  approval: Approval
): ApprovalDisplayModel {
  const impact = normalizeImpact(
    approval.impact.before,
    approval.impact.after
  )
  return {
    explanation: normalizeExplanation(approval.explanation),
    riskLevel: normalizeRiskLevel(approval.riskLevel),
    impact,
    recommendation: normalizeRecommendation(approval.recommendation),
  }
}
