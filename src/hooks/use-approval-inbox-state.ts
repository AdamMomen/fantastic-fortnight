"use client"

import { useCallback, useState } from "react"
import { toast } from "sonner"

import type { Approval } from "@/lib/mock-data"

export function logApprovalAction(
  action: "approve" | "reject",
  approval: Approval
) {
  console.log(`[${action}]`, approval.id, approval.title)
}

export function useApprovalInboxState(initialApprovals: Approval[]) {
  const [pendingApprovals, setPendingApprovals] = useState<Approval[]>(() => [
    ...initialApprovals,
  ])
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [selectedApproval, setSelectedApproval] = useState<Approval | null>(
    null
  )

  const openDrawer = useCallback((approval: Approval) => {
    setSelectedApproval(approval)
    setDrawerOpen(true)
  }, [])

  const closeDrawer = useCallback(() => {
    setDrawerOpen(false)
    setSelectedApproval(null)
  }, [])

  const onDrawerOpenChange = useCallback((open: boolean) => {
    setDrawerOpen(open)
    if (!open) setSelectedApproval(null)
  }, [])

  const removePending = useCallback((approval: Approval) => {
    setPendingApprovals((prev) => prev.filter((p) => p.id !== approval.id))
  }, [])

  const handleApprove = useCallback(
    (approval: Approval) => {
      logApprovalAction("approve", approval)
      toast.success("Approved", {
        description: approval.title,
      })
      removePending(approval)
      closeDrawer()
    },
    [closeDrawer, removePending]
  )

  const handleReject = useCallback(
    (approval: Approval) => {
      logApprovalAction("reject", approval)
      toast.message("Rejected", {
        description: approval.title,
      })
      removePending(approval)
      closeDrawer()
    },
    [closeDrawer, removePending]
  )

  return {
    pendingApprovals,
    selectedApproval,
    drawerOpen,
    openDrawer,
    closeDrawer,
    onDrawerOpenChange,
    handleApprove,
    handleReject,
  }
}
