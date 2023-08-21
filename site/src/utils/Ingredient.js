import { v4 as uuidv4 } from "uuid";
import {
  isStringPositiveNumber,
  isStringPostiveFraction,
  getNumberFromNumericalString,
  formatAmount as getFormattedAmountString,
} from "./helperFunctions";
import { isCookingUnit, normalizeCookingUnit } from "./cookingUnit";

export default class Ingredient {
  constructor(ingredient) {
    const { quantity, unit, name, id } =
      typeof ingredient === "string"
        ? Ingredient.stringToObject(ingredient)
        : ingredient;
    this.quantity = quantity;
    this.unit = unit;
    this.name = name;
    this.id = id || uuidv4();
  }

  getString() {
    let str = "";

    if (this.quantity) {
      str += `${getFormattedAmountString(this.quantity, 2)} `;
    }

    if (this.unit) {
      if (!this.quantity || this.quantity === 1) {
        str += `${this.unit} `;
      } else {
        str += `${this.unit}s `;
      }
    }

    str += this.name;

    return str;
  }

  static stringToObject(str) {
    const strCopy = str.trim();
    const tokens = strCopy.split(" ");
    let i = 0; // The index of the current token being checked
    let quantity = 0;
    let unit = null;

    // Check for quantity in the first token
    if (isStringPositiveNumber(tokens[i])) {
      quantity += getNumberFromNumericalString(tokens[i]);
      i++;
    }

    // If there was an int quantity in the first token, check for a continuation of that quantity
    if (quantity && quantity % 1 === 0 && isStringPostiveFraction(tokens[i])) {
      const num = getNumberFromNumericalString(tokens[i]);

      if (num < 1) {
        quantity += num;
        i++;
      }
    }

    // Check for unit
    if (isCookingUnit(tokens[i])) {
      if (!quantity) {
        quantity = 1;
      }
      unit = normalizeCookingUnit(tokens[i]);
      i++;
    }

    const name = tokens.slice(i).join(" ").trim();

    return {
      quantity: quantity || null,
      unit,
      name,
    };

    /* 
    Reasoning:
      If the first token in the ingredient string was an integer, it's entirely possible
      that the second token could be a continuation of that integer (ex. "1 1/2 lbs ground beef").
      I've chosen to include this secondary token in the overall quantity only if it is a positive
      fraction less than 1. I believe that if the first two tokens in the string are numbers, and
      the second is greater than 1, it would be highly irregular for the second to be part of
      the quantity from token 1. I believe it's more likely that the second token is an unrelated number
      (such as in the string "1 2 lb package of ground beef"). On the contrary, if the second token is
      a fraction less than 1, I believe that it is more likely than not part of the quantity in token 1.
    */
  }
}
