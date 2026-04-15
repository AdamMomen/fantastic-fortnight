import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { EmptyApprovalsState } from "@/components/empty-approvals-state"

describe("EmptyApprovalsState", () => {
  it("announces the empty inbox", () => {
    render(<EmptyApprovalsState />)
    expect(
      screen.getByRole("heading", { name: /all caught up/i })
    ).toBeInTheDocument()
    expect(screen.getByRole("status")).toBeInTheDocument()
  })
})
