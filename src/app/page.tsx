import { Inbox } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/30 px-6 py-16 text-center">
      <div className="flex size-12 items-center justify-center rounded-full bg-muted">
        <Inbox className="size-6 text-muted-foreground" aria-hidden />
      </div>
      <h1 className="mt-6 text-lg font-semibold text-foreground">
        Approval inbox
      </h1>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        Mock approvals and the list view will appear here in the next phase.
      </p>
    </div>
  );
}
