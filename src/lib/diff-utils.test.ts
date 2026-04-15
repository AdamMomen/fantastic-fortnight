import { describe, expect, it } from "vitest"

import { buildDiffRows, formatDiffForDisplay } from "@/lib/diff-utils"

describe("buildDiffRows", () => {
  it("merges keys and fills missing sides with em dash", () => {
    const rows = buildDiffRows({ a: "1", b: "2" }, { b: "3", c: "4" })
    expect(rows).toEqual([
      { key: "a", before: "1", after: "—" },
      { key: "b", before: "2", after: "3" },
      { key: "c", before: "—", after: "4" },
    ])
  })

  it("sorts keys lexicographically", () => {
    const rows = buildDiffRows({ z: "z" }, { a: "a" })
    expect(rows.map((r) => r.key)).toEqual(["a", "z"])
  })
})

describe("formatDiffForDisplay", () => {
  it("joins rows with newlines", () => {
    const text = formatDiffForDisplay([
      { key: "x", before: "a", after: "b" },
      { key: "y", before: "—", after: "1" },
    ])
    expect(text).toBe("x: a → b\ny: — → 1")
  })
})
