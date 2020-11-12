import TagManager from "../TagManager"


describe("testing the tag manager", () => {
  it("has a single tag", () => {
    const tg = new TagManager(["hey"])
    expect(tg.hasTag("hey")).toBe(true)
  })
  it("does not have a single tag", () => {
    const tg = new TagManager(["hello"])
    expect(tg.hasTag("hey")).toBe(false)
  })
  it("has many tags", () => {
    const tg = new TagManager(["a", "b"])
    expect(tg.hasTag("a")).toBe(true)
    expect(tg.hasTag("b")).toBe(true)
  })
  it("has not many tags", () => {
    const tg = new TagManager(["a", "b"])
    expect(tg.hasTag("c")).toBe(false)
    expect(tg.hasTag("d")).toBe(false)
  })
  it("has any tag", () => {
    const tg = new TagManager(["a", "b"])
    expect(tg.hasAnyTag(["a"])).toBe(true)
    expect(tg.hasAnyTag(["a", "c"])).toBe(true)
  })
  it("does not have any tag", () => {
    const tg = new TagManager(["a", "b"])
    expect(tg.hasAnyTag(["c"])).toBe(false)
    expect(tg.hasAnyTag(["c", "d"])).toBe(false)
  })
})