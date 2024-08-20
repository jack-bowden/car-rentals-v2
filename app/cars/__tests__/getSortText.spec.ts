import { getSortText } from "../../page";

it("returns the correct text for price-asc", () => {
    const result = getSortText("price-asc");

    expect(result).toBe("Sort by Price (Low to High)");
});

it("returns the correct text for price-desc", () => {
    const result = getSortText("price-desc");

    expect(result).toBe("Sort by Price (High to Low)");
});