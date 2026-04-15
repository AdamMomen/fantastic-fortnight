import { render, screen, within } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

import { ApprovalTable } from "@/components/approval-table"
import { MOCK_APPROVALS } from "@/lib/mock-data"

describe("ApprovalTable", () => {
  it("renders one body row per approval plus header row", () => {
    const subset = MOCK_APPROVALS.slice(0, 3)
    render(
      <ApprovalTable
        approvals={subset}
        selectedId={null}
        onRowActivate={vi.fn()}
      />
    )

    const table = screen.getByRole("table")
    const rows = within(table).getAllByRole("row")
    expect(rows).toHaveLength(1 + subset.length)
    for (const a of subset) {
      expect(within(table).getByText(a.title)).toBeInTheDocument()
    }
  })
})
