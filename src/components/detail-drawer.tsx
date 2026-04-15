"use client"

import { useMemo } from "react"

import {
  Check,
  CircleAlert,
  Lightbulb,
  ListTree,
  Sparkles,
  X,
} from "lucide-react"

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
import { normalizeApprovalForDisplay } from "@/lib/approval-normalizers"
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
  const display = useMemo(
    () => (approval ? normalizeApprovalForDisplay(approval) : null),
    [approval]
  )

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        showCloseButton
        className="flex h-full max-h-[100dvh] w-full flex-col gap-0 p-0 sm:max-w-lg"
      >
        {approval && display ? (
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

            <div className="min-h-0 flex-1 space-y-7 overflow-y-auto px-4 py-5">
              <section className="space-y-2.5">
                <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  <Sparkles className="size-3.5 shrink-0 opacity-80" aria-hidden />
                  What will happen
                </h3>
                <p className="text-sm leading-relaxed text-foreground">
                  {display.explanation}
                </p>
              </section>

              <section className="space-y-2.5">
                <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  <CircleAlert className="size-3.5 shrink-0 opacity-80" aria-hidden />
                  Risk
                </h3>
                <div className="flex flex-wrap items-center gap-2">
                  <RiskBadge level={display.riskLevel} />
                </div>
              </section>

              {approval.dataUsed && approval.dataUsed.length > 0 ? (
                <section className="space-y-2.5">
                  <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    <ListTree className="size-3.5 shrink-0 opacity-80" aria-hidden />
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
                before={display.impact.before}
                after={display.impact.after}
              />

              <section className="space-y-2.5">
                <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  <Lightbulb className="size-3.5 shrink-0 opacity-80" aria-hidden />
                  Recommendation
                </h3>
                <RecommendationCard
                  label={display.recommendation.label}
                  message={display.recommendation.message}
                  confidence={display.recommendation.confidence}
                />
              </section>
            </div>

            <SheetFooter className="flex-row gap-2 border-t border-border bg-muted/20 p-4 sm:justify-end">
              <Button
                type="button"
                variant="outline"
                className="flex-1 gap-1.5 sm:flex-none"
                onClick={() => onReject(approval)}
              >
                <X className="size-3.5 opacity-90" aria-hidden />
                Reject
              </Button>
              <Button
                type="button"
                variant="default"
                className="flex-1 gap-1.5 sm:flex-none"
                onClick={() => onApprove(approval)}
              >
                <Check className="size-3.5 opacity-90" aria-hidden />
                Approve
              </Button>
            </SheetFooter>
          </>
        ) : null}
      </SheetContent>
    </Sheet>
  )
}
