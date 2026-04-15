import { render, screen, within } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { BeforeAfterDiff } from "@/components/before-after-diff"

describe("BeforeAfterDiff", () => {
  it("renders before and after key-value columns", () => {
    render(
      <BeforeAfterDiff
        before={{ Status: "Draft", Owner: "Alex" }}
        after={{ Status: "Sent", Owner: "Alex" }}
      />
    )

    const beforeHeading = screen.getByText("Before")
    const afterHeading = screen.getByText("After")
    const beforeRegion = beforeHeading.closest("div")?.parentElement
    const afterRegion = afterHeading.closest("div")?.parentElement
    expect(beforeRegion).toBeTruthy()
    expect(afterRegion).toBeTruthy()

    expect(within(beforeRegion!).getByText("Draft")).toBeInTheDocument()
    expect(within(afterRegion!).getByText("Sent")).toBeInTheDocument()
  })

  it("aligns keys across columns with em dashes for missing values", () => {
    render(
      <BeforeAfterDiff before={{ Only: "here" }} after={{ Other: "there" }} />
    )
    expect(screen.getAllByText("—").length).toBeGreaterThanOrEqual(2)
    expect(screen.getByText("here")).toBeInTheDocument()
    expect(screen.getByText("there")).toBeInTheDocument()
  })
})
