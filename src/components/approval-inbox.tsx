"use client"

import { useState } from "react"

import { ApprovalTable } from "@/components/approval-table"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
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

      <Sheet
        open={open}
        onOpenChange={(next) => {
          setOpen(next)
          if (!next) setSelected(null)
        }}
      >
        <SheetContent side="right" className="flex w-full flex-col sm:max-w-md">
          {selected ? (
            <>
              <SheetHeader className="border-b border-border text-left">
                <SheetTitle className="pr-8 text-left leading-snug">
                  {selected.title}
                </SheetTitle>
                <SheetDescription className="text-left">
                  {selected.summary}
                </SheetDescription>
              </SheetHeader>
              <p className="px-4 pt-2 text-xs text-muted-foreground">
                Full detail layout (explanation, risk, diff, actions) ships in
                Phase 3.
              </p>
            </>
          ) : null}
        </SheetContent>
      </Sheet>
    </>
  )
}
