import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { RecommendationCard } from "@/components/recommendation-card"

describe("RecommendationCard", () => {
  it("shows message and optional confidence", () => {
    render(
      <RecommendationCard
        label="Heads up"
        message="Double-check the recipient."
        confidence={0.82}
      />
    )
    expect(screen.getByText("Heads up")).toBeInTheDocument()
    expect(
      screen.getByText("Double-check the recipient.")
    ).toBeInTheDocument()
    expect(screen.getByText("Confidence: 82%")).toBeInTheDocument()
  })

  it("hides confidence when not provided", () => {
    render(
      <RecommendationCard label="Note" message="No score available." />
    )
    expect(screen.queryByText(/confidence/i)).not.toBeInTheDocument()
  })
})
