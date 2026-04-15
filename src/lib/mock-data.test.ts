import { describe, expect, it } from "vitest"
import { z } from "zod"

import {
  approvalSchema,
  MOCK_APPROVALS,
  type ApprovalRiskLevel,
  type ApprovalTool,
} from "@/lib/mock-data"

describe("MOCK_APPROVALS", () => {
  it("parses every record with the approval schema", () => {
    const parsed = z.array(approvalSchema).safeParse(MOCK_APPROVALS)
    expect(parsed.success).toBe(true)
  })

  it("has unique ids", () => {
    const ids = MOCK_APPROVALS.map((a) => a.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it("covers every tool and risk level used in the product model", () => {
    const tools = new Set<ApprovalTool>(MOCK_APPROVALS.map((a) => a.tool))
    const risks = new Set<ApprovalRiskLevel>(
      MOCK_APPROVALS.map((a) => a.riskLevel)
    )

    expect(tools).toEqual(
      new Set<ApprovalTool>(["email", "calendar", "finance", "documents", "other"])
    )
    expect(risks).toEqual(new Set<ApprovalRiskLevel>(["low", "medium", "high"]))
  })

  it("includes required nested fields on each record", () => {
    for (const a of MOCK_APPROVALS) {
      expect(a.impact.before).toBeDefined()
      expect(a.impact.after).toBeDefined()
      expect(Object.keys(a.impact.before).length).toBeGreaterThan(0)
      expect(Object.keys(a.impact.after).length).toBeGreaterThan(0)
      expect(a.recommendation.label.length).toBeGreaterThan(0)
      expect(a.recommendation.message.length).toBeGreaterThan(0)
      expect(Number.isNaN(Date.parse(a.timestamp))).toBe(false)
    }
  })
})
