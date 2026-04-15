import { AppHeader } from "@/components/app-header"
import { cn } from "@/lib/utils"

type PageShellProps = {
  children: React.ReactNode
  className?: string
}

export function PageShell({ children, className }: PageShellProps) {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <AppHeader />
      <main
        className={cn(
          "mx-auto flex min-h-0 w-full max-w-6xl flex-1 flex-col px-4 py-7 sm:px-6 sm:py-8",
          className
        )}
      >
        {children}
      </main>
    </div>
  )
}
