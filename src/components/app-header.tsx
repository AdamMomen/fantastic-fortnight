import { cn } from "@/lib/utils";

type AppHeaderProps = {
  className?: string;
};

export function AppHeader({ className }: AppHeaderProps) {
  return (
    <header
      className={cn(
        "shrink-0 border-b border-border bg-card/80 backdrop-blur-sm",
        className
      )}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-4 sm:px-6">
        <div className="flex min-w-0 flex-col">
          <span className="truncate text-sm font-semibold tracking-tight text-foreground">
            Approval Clarity Layer
          </span>
          <span className="truncate text-xs text-muted-foreground">
            Understand impact and risk before you approve
          </span>
        </div>
      </div>
    </header>
  );
}
