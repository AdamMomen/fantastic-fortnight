import { render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"

import { ApprovalInbox } from "@/components/approval-inbox"
import { MOCK_APPROVALS } from "@/lib/mock-data"

describe("ApprovalInbox", () => {
  it("renders one row per approval with title and risk label", () => {
    render(<ApprovalInbox approvals={MOCK_APPROVALS} />)

    const table = screen.getByRole("table")
    for (const a of MOCK_APPROVALS) {
      expect(within(table).getByText(a.title)).toBeInTheDocument()
    }

    expect(within(table).getAllByText("Low").length).toBeGreaterThanOrEqual(1)
    expect(within(table).getAllByText("Medium").length).toBeGreaterThanOrEqual(
      1
    )
    expect(within(table).getAllByText("High").length).toBeGreaterThanOrEqual(1)
  })

  it("shows empty state when there are no approvals", () => {
    render(<ApprovalInbox approvals={[]} />)
    expect(
      screen.getByRole("heading", { name: /all caught up/i })
    ).toBeInTheDocument()
    expect(screen.queryByRole("table")).not.toBeInTheDocument()
  })

  it("opens the sheet when a row is clicked", async () => {
    const user = userEvent.setup()
    render(<ApprovalInbox approvals={MOCK_APPROVALS} />)

    const first = MOCK_APPROVALS[0]
    const [, firstBodyRow] = screen.getAllByRole("row")
    await user.click(firstBodyRow)

    const dialog = await screen.findByRole("dialog")
    expect(dialog).toBeInTheDocument()
    expect(within(dialog).getByText(first.title)).toBeInTheDocument()
    expect(within(dialog).getByText(first.summary)).toBeInTheDocument()
  })

  it("opens the sheet from the View button", async () => {
    const user = userEvent.setup()
    render(<ApprovalInbox approvals={MOCK_APPROVALS} />)

    const buttons = screen.getAllByRole("button", { name: /^view$/i })
    await user.click(buttons[0])

    const dialog = await screen.findByRole("dialog")
    expect(within(dialog).getByText(MOCK_APPROVALS[0].title)).toBeInTheDocument()
  })
})
