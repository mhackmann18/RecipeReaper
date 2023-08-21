// May have an 's'
export const standardFormUnits = [
  // Volume
  "milliliter",
  "teaspoon",
  "tablespoon",
  "ounce",
  "cup",
  "pint",
  "liter",
  "quart",
  "gallon",
  // Mass
  "milligram",
  "gram",
  "kilogram",
  "pound",
];

export const standardFormUnitsPlural = standardFormUnits.map(
  (unit) => `${unit}s`
);

// May have an 's', an '.', or 's.'
const nonStandardFormUnits = [
  // Volume
  "ml",
  "tsp",
  "tbsp",
  "oz",
  "c",
  "pt",
  "l",
  "qt",
  "gal",
  // Mass
  "mg",
  "g",
  "kg",
  "lb",
];

export function isCookingUnit(str) {
  const unitStr = str.toLowerCase();

  for (const unit of standardFormUnits) {
    if (unitStr === unit || unitStr === `${unit}s`) {
      return true;
    }
  }

  for (const unit of nonStandardFormUnits) {
    if (
      unitStr === unit ||
      unitStr === `${unit}s` ||
      unitStr === `${unit}.` ||
      unitStr === `${unit}s.`
    ) {
      return true;
    }
  }

  return false;
}

export function normalizeCookingUnit(str) {
  const unitStr = str.toLowerCase();

  for (const unit of standardFormUnits) {
    if (unitStr === unit || unitStr === `${unit}s`) {
      return unit;
    }
  }

  for (const unit of nonStandardFormUnits) {
    if (
      unitStr === unit ||
      unitStr === `${unit}s` ||
      unitStr === `${unit}.` ||
      unitStr === `${unit}s.`
    ) {
      return standardFormUnits[nonStandardFormUnits.indexOf(unit)];
    }
  }

  return false;
}

export function getSingularCookingUnit(str) {
  const unit = normalizeCookingUnit(str);

  if (!unit) {
    return false;
  }

  if (standardFormUnits.includes(unit)) {
    return unit;
  }
  return standardFormUnitsPlural[standardFormUnits.indexOf(unit)];
}
