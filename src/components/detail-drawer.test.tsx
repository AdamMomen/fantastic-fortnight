import { render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import { DetailDrawer } from "@/components/detail-drawer"
import { MOCK_APPROVALS } from "@/lib/mock-data"

const sample = MOCK_APPROVALS[0]

describe("DetailDrawer", () => {
  it("renders core sections and close control when open", () => {
    render(
      <DetailDrawer approval={sample} open onOpenChange={vi.fn()} />
    )

    const dialog = screen.getByRole("dialog")
    expect(within(dialog).getByText("What will happen")).toBeInTheDocument()
    expect(within(dialog).getByText(sample.explanation)).toBeInTheDocument()
    expect(within(dialog).getByText("Risk")).toBeInTheDocument()
    expect(within(dialog).getByText("Before / after")).toBeInTheDocument()
    expect(within(dialog).getByText("Recommendation")).toBeInTheDocument()
    expect(
      within(dialog).getByText(sample.recommendation.message)
    ).toBeInTheDocument()
    expect(
      within(dialog).getByRole("button", { name: /close/i })
    ).toBeInTheDocument()
    expect(
      within(dialog).getByRole("button", { name: /^approve$/i })
    ).toBeInTheDocument()
    expect(
      within(dialog).getByRole("button", { name: /^reject$/i })
    ).toBeInTheDocument()
  })

  it("lists data used when present", () => {
    render(<DetailDrawer approval={sample} open onOpenChange={vi.fn()} />)
    const dialog = screen.getByRole("dialog")
    expect(within(dialog).getByText("Data used")).toBeInTheDocument()
    expect(within(dialog).getByText(sample.dataUsed![0])).toBeInTheDocument()
  })

  it("omits data used when absent", () => {
    const noData = MOCK_APPROVALS.find((a) => !a.dataUsed)
    expect(noData).toBeDefined()
    render(<DetailDrawer approval={noData!} open onOpenChange={vi.fn()} />)
    expect(screen.queryByText("Data used")).not.toBeInTheDocument()
  })

  it("shows fallback explanation when the source string is blank", () => {
    const sparse = { ...sample, explanation: "   " }
    render(<DetailDrawer approval={sparse} open onOpenChange={vi.fn()} />)
    expect(
      screen.getByText(/No additional explanation was provided/i)
    ).toBeInTheDocument()
  })

  it("calls onApprove when Approve is clicked", async () => {
    const user = userEvent.setup()
    const onApprove = vi.fn()
    render(
      <DetailDrawer
        approval={sample}
        open
        onOpenChange={vi.fn()}
        onApprove={onApprove}
      />
    )
    await user.click(screen.getByRole("button", { name: /^approve$/i }))
    expect(onApprove).toHaveBeenCalledWith(sample)
  })
})
