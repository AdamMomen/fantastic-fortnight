import { renderHook, act } from "@testing-library/react"
import { toast } from "sonner"
import { beforeEach, describe, expect, it, vi } from "vitest"

import { MOCK_APPROVALS } from "@/lib/mock-data"

import {
  logApprovalAction,
  useApprovalInboxState,
} from "@/hooks/use-approval-inbox-state"

vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    message: vi.fn(),
  },
}))

describe("logApprovalAction", () => {
  it("logs approve and reject with id and title", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {})
    const a = MOCK_APPROVALS[0]

    logApprovalAction("approve", a)
    expect(logSpy).toHaveBeenCalledWith("[approve]", a.id, a.title)

    logApprovalAction("reject", a)
    expect(logSpy).toHaveBeenCalledWith("[reject]", a.id, a.title)

    logSpy.mockRestore()
  })
})

describe("useApprovalInboxState", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("selects an approval and opens the drawer", () => {
    const { result } = renderHook(() => useApprovalInboxState())
    const a = MOCK_APPROVALS[1]

    act(() => result.current.openDrawer(a))
    expect(result.current.drawerOpen).toBe(true)
    expect(result.current.selectedApproval).toBe(a)
  })

  it("clears selection when the drawer closes via onDrawerOpenChange", () => {
    const { result } = renderHook(() => useApprovalInboxState())
    const a = MOCK_APPROVALS[0]

    act(() => result.current.openDrawer(a))
    act(() => result.current.onDrawerOpenChange(false))

    expect(result.current.drawerOpen).toBe(false)
    expect(result.current.selectedApproval).toBe(null)
  })

  it("approve logs, shows toast, and closes", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {})
    const { result } = renderHook(() => useApprovalInboxState())
    const a = MOCK_APPROVALS[2]

    act(() => result.current.openDrawer(a))
    act(() => result.current.handleApprove(a))

    expect(logSpy).toHaveBeenCalledWith("[approve]", a.id, a.title)
    expect(toast.success).toHaveBeenCalledWith("Approved", {
      description: a.title,
    })
    expect(result.current.drawerOpen).toBe(false)
    expect(result.current.selectedApproval).toBe(null)

    logSpy.mockRestore()
  })

  it("reject logs, shows toast, and closes", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {})
    const { result } = renderHook(() => useApprovalInboxState())
    const a = MOCK_APPROVALS[3]

    act(() => result.current.openDrawer(a))
    act(() => result.current.handleReject(a))

    expect(logSpy).toHaveBeenCalledWith("[reject]", a.id, a.title)
    expect(toast.message).toHaveBeenCalledWith("Rejected", {
      description: a.title,
    })
    expect(result.current.drawerOpen).toBe(false)

    logSpy.mockRestore()
  })
})
