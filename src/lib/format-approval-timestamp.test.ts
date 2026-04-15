import { describe, expect, it } from "vitest"

import { formatApprovalInboxTimestamp } from "@/lib/format-approval-timestamp"

describe("formatApprovalInboxTimestamp", () => {
  it("formats ISO strings in UTC for stable snapshots", () => {
    expect(formatApprovalInboxTimestamp("2026-04-15T09:12:00.000Z")).toBe(
      "Apr 15, 2026, 9:12 AM"
    )
  })
})
