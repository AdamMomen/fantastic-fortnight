import { render, screen, waitFor, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import { ApprovalInbox } from "@/components/approval-inbox"
import { DetailDrawer } from "@/components/detail-drawer"
import { MOCK_APPROVALS } from "@/lib/mock-data"

describe("Approval inbox flow (integration)", () => {
  it("opens the drawer from a row click and closes it from the close control", async () => {
    const user = userEvent.setup()
    render(<ApprovalInbox approvals={MOCK_APPROVALS} />)

    const table = screen.getByRole("table")
    const [, firstBodyRow] = within(table).getAllByRole("row")
    await user.click(firstBodyRow)

    const dialog = await screen.findByRole("dialog")
    expect(dialog).toBeVisible()

    await user.click(within(dialog).getByRole("button", { name: /close/i }))
    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
    })
  })

  it("fires onApprove from the drawer", async () => {
    const user = userEvent.setup()
    const onApprove = vi.fn()
    const sample = MOCK_APPROVALS[0]

    render(
      <DetailDrawer
        approval={sample}
        open
        onOpenChange={vi.fn()}
        onApprove={onApprove}
        onReject={vi.fn()}
      />
    )

    const dialog = screen.getByRole("dialog")
    await user.click(within(dialog).getByRole("button", { name: /^approve$/i }))
    expect(onApprove).toHaveBeenCalledWith(sample)
  })

  it("fires onReject from the drawer", async () => {
    const user = userEvent.setup()
    const onReject = vi.fn()
    const sample = MOCK_APPROVALS[1]

    render(
      <DetailDrawer
        approval={sample}
        open
        onOpenChange={vi.fn()}
        onApprove={vi.fn()}
        onReject={onReject}
      />
    )

    const dialog = screen.getByRole("dialog")
    await user.click(within(dialog).getByRole("button", { name: /^reject$/i }))
    expect(onReject).toHaveBeenCalledWith(sample)
  })
})
