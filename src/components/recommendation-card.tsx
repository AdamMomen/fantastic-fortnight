type RecommendationCardProps = {
  label: string
  message: string
  confidence?: number
}

export function RecommendationCard({
  label,
  message,
  confidence,
}: RecommendationCardProps) {
  return (
    <div className="rounded-lg border border-border bg-muted/40 p-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-foreground">{message}</p>
      {confidence != null ? (
        <p className="mt-2 text-xs tabular-nums text-muted-foreground">
          Confidence: {Math.round(confidence * 100)}%
        </p>
      ) : null}
    </div>
  )
}
