"use client"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { BeforeAfterDiff } from "@/components/before-after-diff"
import { RecommendationCard } from "@/components/recommendation-card"
import { RiskBadge } from "@/components/risk-badge"
import { formatApprovalInboxTimestamp } from "@/lib/format-approval-timestamp"
import type { Approval } from "@/lib/mock-data"

export type DetailDrawerProps = {
  approval: Approval | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onApprove?: (approval: Approval) => void
  onReject?: (approval: Approval) => void
}

function defaultApprove(approval: Approval) {
  console.log("[approve]", approval.id, approval.title)
}

function defaultReject(approval: Approval) {
  console.log("[reject]", approval.id, approval.title)
}

export function DetailDrawer({
  approval,
  open,
  onOpenChange,
  onApprove = defaultApprove,
  onReject = defaultReject,
}: DetailDrawerProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        showCloseButton
        className="flex h-full max-h-[100dvh] w-full flex-col gap-0 p-0 sm:max-w-lg"
      >
        {approval ? (
          <>
            <SheetHeader className="space-y-2 border-b border-border p-4 text-left">
              <SheetTitle className="pr-10 text-left text-base leading-snug">
                {approval.title}
              </SheetTitle>
              <SheetDescription className="text-left text-sm">
                {approval.summary}
              </SheetDescription>
              <p className="text-xs text-muted-foreground">
                {formatApprovalInboxTimestamp(approval.timestamp)} ·{" "}
                {approval.actionType} · {approval.tool}
              </p>
            </SheetHeader>

            <div className="min-h-0 flex-1 space-y-6 overflow-y-auto px-4 py-4">
              <section className="space-y-2">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  What will happen
                </h3>
                <p className="text-sm leading-relaxed text-foreground">
                  {approval.explanation}
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Risk
                </h3>
                <div className="flex flex-wrap items-center gap-2">
                  <RiskBadge level={approval.riskLevel} />
                </div>
              </section>

              {approval.dataUsed && approval.dataUsed.length > 0 ? (
                <section className="space-y-2">
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Data used
                  </h3>
                  <ul className="list-inside list-disc text-sm text-foreground">
                    {approval.dataUsed.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              ) : null}

              <BeforeAfterDiff
                before={approval.impact.before}
                after={approval.impact.after}
              />

              <section className="space-y-2">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Recommendation
                </h3>
                <RecommendationCard
                  label={approval.recommendation.label}
                  message={approval.recommendation.message}
                  confidence={approval.recommendation.confidence}
                />
              </section>
            </div>

            <SheetFooter className="flex-row gap-2 border-t border-border p-4 sm:justify-end">
              <Button
                type="button"
                variant="outline"
                className="flex-1 sm:flex-none"
                onClick={() => onReject(approval)}
              >
                Reject
              </Button>
              <Button
                type="button"
                variant="default"
                className="flex-1 sm:flex-none"
                onClick={() => onApprove(approval)}
              >
                Approve
              </Button>
            </SheetFooter>
          </>
        ) : null}
      </SheetContent>
    </Sheet>
  )
}
