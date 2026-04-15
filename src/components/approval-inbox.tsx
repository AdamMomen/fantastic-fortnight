"use client"

import { ApprovalMobileCardList } from "@/components/approval-mobile-card-list"
import { ApprovalTable } from "@/components/approval-table"
import { DetailDrawer } from "@/components/detail-drawer"
import { EmptyApprovalsState } from "@/components/empty-approvals-state"
import { useApprovalInboxState } from "@/hooks/use-approval-inbox-state"
import type { Approval } from "@/lib/mock-data"

type ApprovalInboxProps = {
  approvals: Approval[]
}

export function ApprovalInbox({ approvals }: ApprovalInboxProps) {
  const {
    pendingApprovals,
    selectedApproval,
    drawerOpen,
    openDrawer,
    onDrawerOpenChange,
    handleApprove,
    handleReject,
  } = useApprovalInboxState(approvals)

  return (
    <>
      {pendingApprovals.length === 0 ? (
        <EmptyApprovalsState />
      ) : (
        <>
          <div className="hidden sm:block">
            <ApprovalTable
              approvals={pendingApprovals}
              selectedId={selectedApproval?.id ?? null}
              onRowActivate={openDrawer}
            />
          </div>
          <div className="sm:hidden">
            <ApprovalMobileCardList
              approvals={pendingApprovals}
              selectedId={selectedApproval?.id ?? null}
              onActivate={openDrawer}
            />
          </div>
        </>
      )}

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
