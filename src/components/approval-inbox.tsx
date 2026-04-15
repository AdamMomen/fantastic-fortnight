"use client"

import { ApprovalTable } from "@/components/approval-table"
import { DetailDrawer } from "@/components/detail-drawer"
import { useApprovalInboxState } from "@/hooks/use-approval-inbox-state"
import type { Approval } from "@/lib/mock-data"

type ApprovalInboxProps = {
  approvals: Approval[]
}

export function ApprovalInbox({ approvals }: ApprovalInboxProps) {
  const {
    selectedApproval,
    drawerOpen,
    openDrawer,
    onDrawerOpenChange,
    handleApprove,
    handleReject,
  } = useApprovalInboxState()

  return (
    <>
      <ApprovalTable
        approvals={approvals}
        selectedId={selectedApproval?.id ?? null}
        onRowActivate={openDrawer}
      />

      <DetailDrawer
        approval={selectedApproval}
        open={drawerOpen}
        onOpenChange={onDrawerOpenChange}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </>
  )
}
