import { formatSearchQuery } from "../formatSearchQuery";

describe("formatSearchQuery", () => {
  it("replaces spaces with plus signs", () => {
    expect(formatSearchQuery("harry potter")).toBe("harry+potter");
  });

  it("handles multiple spaces", () => {
    expect(formatSearchQuery("lord of the rings")).toBe("lord+of+the+rings");
  });

  it("trims leading and trailing whitespace", () => {
    expect(formatSearchQuery("  harry potter  ")).toBe("harry+potter");
  });

  it("converts to lowercase", () => {
    expect(formatSearchQuery("Harry Potter")).toBe("harry+potter");
  });

  it("handles an empty string", () => {
    expect(formatSearchQuery("")).toBe("");
  });

  it("handles a single word with no spaces", () => {
    expect(formatSearchQuery("Dune")).toBe("dune");
  });
});
