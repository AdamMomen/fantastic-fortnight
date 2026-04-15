import { render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import { ApprovalMobileCardList } from "@/components/approval-mobile-card-list"
import { MOCK_APPROVALS } from "@/lib/mock-data"

describe("ApprovalMobileCardList", () => {
  it("invokes onActivate when a card is pressed", async () => {
    const user = userEvent.setup()
    const onActivate = vi.fn()
    const subset = MOCK_APPROVALS.slice(0, 2)

    render(
      <ApprovalMobileCardList
        approvals={subset}
        selectedId={null}
        onActivate={onActivate}
      />
    )

    const list = screen.getByRole("list")
    const [firstCard] = within(list).getAllByRole("button")
    await user.click(firstCard)
    expect(onActivate).toHaveBeenCalledWith(subset[0])
  })
})
