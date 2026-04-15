import { ShieldCheck } from "lucide-react"

import { cn } from "@/lib/utils"

type AppHeaderProps = {
  className?: string
}

export function AppHeader({ className }: AppHeaderProps) {
  return (
    <header
      className={cn(
        "shrink-0 border-b border-border bg-card/85 backdrop-blur-md",
        className
      )}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-4 sm:h-[3.75rem] sm:px-6">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted/80 text-foreground shadow-sm ring-1 ring-border">
          <ShieldCheck className="size-4" strokeWidth={2} aria-hidden />
        </div>
        <div className="flex min-w-0 flex-col py-1">
          <span className="truncate text-sm font-semibold tracking-tight text-foreground">
            Approval Clarity Layer
          </span>
          <span className="truncate text-xs leading-tight text-muted-foreground">
            Understand impact and risk before you approve
          </span>
        </div>
      </div>
    </header>
  )
}
