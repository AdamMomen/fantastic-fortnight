"use client"

import { useState } from "react"

import { ApprovalTable } from "@/components/approval-table"
import { DetailDrawer } from "@/components/detail-drawer"
import type { Approval } from "@/lib/mock-data"

type ApprovalInboxProps = {
  approvals: Approval[]
}

export function ApprovalInbox({ approvals }: ApprovalInboxProps) {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<Approval | null>(null)

  function activate(approval: Approval) {
    setSelected(approval)
    setOpen(true)
  }

  return (
    <>
      <ApprovalTable
        approvals={approvals}
        selectedId={selected?.id ?? null}
        onRowActivate={activate}
      />

      <DetailDrawer
        approval={selected}
        open={open}
        onOpenChange={(next) => {
          setOpen(next)
          if (!next) setSelected(null)
        }}
      />
    </>
  )
}
