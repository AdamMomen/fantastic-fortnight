import { describe, expect, it } from "vitest"

import {
  normalizeApprovalForDisplay,
  normalizeExplanation,
  normalizeImpact,
  normalizeRecommendation,
  normalizeRiskLevel,
} from "@/lib/approval-normalizers"
import type { Approval } from "@/lib/mock-data"
import { MOCK_APPROVALS } from "@/lib/mock-data"

describe("normalizeRiskLevel", () => {
  it("passes through known levels", () => {
    expect(normalizeRiskLevel("low")).toBe("low")
    expect(normalizeRiskLevel("medium")).toBe("medium")
    expect(normalizeRiskLevel("high")).toBe("high")
  })

  it("defaults unknown values to medium", () => {
    expect(normalizeRiskLevel("critical")).toBe("medium")
    expect(normalizeRiskLevel(undefined)).toBe("medium")
    expect(normalizeRiskLevel(null)).toBe("medium")
    expect(normalizeRiskLevel(42)).toBe("medium")
  })
})

describe("normalizeExplanation", () => {
  it("trims non-empty strings", () => {
    expect(normalizeExplanation("  hi  ")).toBe("hi")
  })

  it("uses fallback when missing or blank", () => {
    expect(normalizeExplanation("")).toContain("No additional explanation")
    expect(normalizeExplanation("   ")).toContain("No additional explanation")
    expect(normalizeExplanation(null)).toContain("No additional explanation")
  })
})

describe("normalizeRecommendation", () => {
  it("maps labels and messages with fallbacks", () => {
    expect(normalizeRecommendation(undefined).message).toContain(
      "No recommendation"
    )
    expect(normalizeRecommendation(MOCK_APPROVALS[0].recommendation).label).toBe(
      MOCK_APPROVALS[0].recommendation.label
    )
  })
})

describe("normalizeImpact", () => {
  it("uses placeholders when a side is empty", () => {
    const { before, after } = normalizeImpact({}, { x: "y" })
    expect(before).toEqual({ Details: "—" })
    expect(after).toEqual({ x: "y" })
  })
})

describe("normalizeApprovalForDisplay", () => {
  it("keeps valid mock approvals recognizable", () => {
    const a = MOCK_APPROVALS[0]
    const d = normalizeApprovalForDisplay(a)
    expect(d.explanation).toBe(a.explanation)
    expect(d.riskLevel).toBe(a.riskLevel)
  })

  it("repairs invalid risk at runtime", () => {
    const broken = {
      ...MOCK_APPROVALS[0],
      riskLevel: "unknown" as Approval["riskLevel"],
    }
    expect(normalizeApprovalForDisplay(broken).riskLevel).toBe("medium")
  })
})
