import { describe, expect, it } from "vitest"

import { riskBadgeClassName, riskLevelLabel } from "@/lib/risk-utils"

describe("riskLevelLabel", () => {
  it("maps levels to display labels", () => {
    expect(riskLevelLabel("low")).toBe("Low")
    expect(riskLevelLabel("medium")).toBe("Medium")
    expect(riskLevelLabel("high")).toBe("High")
  })
})

describe("riskBadgeClassName", () => {
  it("uses distinct color families per level", () => {
    expect(riskBadgeClassName("low")).toContain("emerald")
    expect(riskBadgeClassName("medium")).toContain("amber")
    expect(riskBadgeClassName("high")).toContain("red")
  })
})
