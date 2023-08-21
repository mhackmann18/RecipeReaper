import { fraction } from "mathjs";

const unicodeFractions = [
  "½",
  "⅓",
  "⅔",
  "¼",
  "¾",
  "⅕",
  "⅖",
  "⅗",
  "⅘",
  "⅙",
  "⅚",
  "⅐",
  "⅛",
  "⅜",
  "⅝",
  "⅞",
  "⅑",
  "⅒",
];

export function getFracStrFromUniChar(str) {
  /* Accepts a single unicode character and returns its string representation, or null if it's not a valid unicode fraction */
  const unicodeFractionsConversions = [
    "1/2",
    "1/3",
    "2/3",
    "1/4",
    "3/4",
    "1/5",
    "2/5",
    "3/5",
    "4/5",
    "1/6",
    "5/6",
    "1/7",
    "1/8",
    "3/8",
    "5/8",
    "7/8",
    "1/9",
    "1/10",
  ];

  return unicodeFractions.includes(str)
    ? unicodeFractionsConversions[unicodeFractions.indexOf(str)]
    : null;
}

export function isUnicodeFraction(char) {
  return unicodeFractions.includes(char);
}

export function isStringPositiveNumber(str) {
  // Matches ints, decimals, and vulgar fractions
  const numericalRE = /^([1-9][0-9]*|0)((\/[1-9][0-9]*)|(\.[0-9]*))?$/;

  return Boolean(str.match(numericalRE) || isUnicodeFraction(str));
}

export function isStringPostiveFraction(str) {
  const fractionRE = /^([1-9][0-9]*|0)\/[1-9][0-9]*$/;

  return Boolean(str.match(fractionRE) || isUnicodeFraction(str));
}

export function getNumberFromNumericalString(str) {
  const numericalRE = /^([1-9][0-9]*|0)((\/[1-9][0-9]*)|(\.[0-9]*))?$/;

  const match = str.match(numericalRE);

  if (!match && !isUnicodeFraction(str)) {
    return null;
  }

  return Number(fraction((match && match[0]) || getFracStrFromUniChar(str)));
}

export function formatAmount(num, precision) {
  let multiplier = 10 ** precision;
  if (!precision || precision < 0) multiplier = 1;
  return `${Math.round(num * multiplier) / multiplier}`;
}
