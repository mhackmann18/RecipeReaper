import { isCookingUnit } from "../utils/cookingUnit";

// Test suite (describe can be nested to make more complex hierarchies)
describe("isCookingUnit", () => {
  // Fixture
  const nonCookingUnits = ["tsdf", "fdsf", "", "ajdfjsfjasdjfjdsfj"];

  // Test case
  test.each(nonCookingUnits)("returns false for value %j", (fixture) => {
    // Assertion
    expect(isCookingUnit(fixture)).toBe(false);
  });

  test("Valid cooking unit", () => {
    expect(isCookingUnit("tbsp")).toBe(true);
  });

  const cookingUnits = ["tbsp", "tablespoons", "cups", "c"];

  test.each(cookingUnits)("returns true for value %j", (fixture) => {
    expect(isCookingUnit(fixture)).toBe(true);
  });
});
