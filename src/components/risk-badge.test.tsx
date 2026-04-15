import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { RiskBadge } from "@/components/risk-badge"

describe("RiskBadge", () => {
  it("renders label per level", () => {
    const { rerender } = render(<RiskBadge level="low" />)
    expect(screen.getByText("Low")).toBeInTheDocument()

    rerender(<RiskBadge level="medium" />)
    expect(screen.getByText("Medium")).toBeInTheDocument()

    rerender(<RiskBadge level="high" />)
    expect(screen.getByText("High")).toBeInTheDocument()
  })
})
