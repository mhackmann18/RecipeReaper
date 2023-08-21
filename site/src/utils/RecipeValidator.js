export default class RecipeValidator {
  // Error messages
  static requiredFieldMsg = "Required";

  static #getMaxValueMsg = (maxValue) => `Max value: ${maxValue}`;

  static #getMinValueMsg = (minValue) => `Min value: ${minValue}`;

  static #getMaxLengthMsg = (maxValue) => `Max length: ${maxValue} characters`;

  static #getMinLengthMsg = (minValue) => `Min length: ${minValue} characters`;

  // Field requirements
  static titleMaxLength = 99;

  static servingsMaxValue = 30;

  static servingsMinValue = 1;

  static timeMaxValue = 999;

  static timeMinValue = 1;

  static ingredientNameMaxLength = 99;

  static instructionMaxLength = 9999;

  static servingSizeQuantityMinValue = 0.01;

  static servingSizeQuantityMaxValue = 9999;

  static servingSizeUnitMaxLength = 69;

  static nutrientQuantityMaxValue = 9999;

  static getServingsMaxValue() {
    return RecipeValidator.servingsMaxValue;
  }

  static getTitleErrMsg(str) {
    let msg = "";

    const trimmedStr = str.trim();
    if (!trimmedStr.length) {
      msg = RecipeValidator.requiredFieldMsg;
    } else if (trimmedStr.length > RecipeValidator.titleMaxLength) {
      msg = RecipeValidator.#getMaxLengthMsg(RecipeValidator.titleMaxLength);
    }

    return msg || true;
  }

  static getServingsErrMsg(str) {
    return RecipeValidator.getIntegerErrMsg(
      str,
      RecipeValidator.servingsMaxValue,
      RecipeValidator.servingsMinValue,
      true
    );
  }

  static getTimeErrMsg(str) {
    return RecipeValidator.getIntegerErrMsg(
      str,
      RecipeValidator.timeMaxValue,
      RecipeValidator.timeMinValue
    );
  }

  static getIngredientQuantityErrMsg(str) {
    return RecipeValidator.getNumberErrMsg(str, 9999);
  }

  static getIngredientNameErrMsg(str) {
    let msg = "";

    const trimmedStr = str.trim();
    if (!trimmedStr.length) {
      msg = RecipeValidator.requiredFieldMsg;
    } else if (trimmedStr.length > RecipeValidator.ingredientNameMaxLength) {
      msg = RecipeValidator.#getMaxLengthMsg(
        RecipeValidator.ingredientNameMaxLength
      );
    }

    return msg || true;
  }

  static getInstructionErrMsg(str) {
    let msg = "";

    const trimmedStr = str.trim();
    if (!trimmedStr.length) {
      msg = RecipeValidator.requiredFieldMsg;
    } else if (trimmedStr.length > RecipeValidator.instructionMaxLength) {
      msg = RecipeValidator.#getMaxLengthMsg(
        RecipeValidator.instructionMaxLength
      );
    }

    return msg || true;
  }

  static getServingSizeQuantityErrMsg(str, required = false) {
    return RecipeValidator.getNumberErrMsg(
      str,
      RecipeValidator.servingSizeQuantityMaxValue,
      RecipeValidator.servingSizeQuantityMinValue,
      required
    );
  }

  static getServingSizeUnitErrMsg(str) {
    let msg = "";

    const trimmedStr = str.trim();
    if (trimmedStr.length > RecipeValidator.servingSizeUnitMaxLength) {
      msg = RecipeValidator.#getMaxLengthMsg(
        RecipeValidator.servingSizeUnitMaxLength
      );
    }

    return msg || true;
  }

  static getNutrientErrMsg(str, required = false) {
    return RecipeValidator.getNumberErrMsg(
      str,
      RecipeValidator.nutrientQuantityMaxValue,
      0,
      required
    );
  }

  static getNumberErrMsg(str, maxValue, minValue = 0, required = false) {
    let msg = "";
    const number = Number(str);

    if (!str && !required) {
      return true;
    }

    if (!str && required) {
      msg = RecipeValidator.requiredFieldMsg;
    } else if (Number.isNaN(number)) {
      msg = "Please enter a number";
    } else if (number > maxValue) {
      msg = RecipeValidator.#getMaxValueMsg(maxValue);
    } else if (number < minValue) {
      msg = RecipeValidator.#getMinValueMsg(minValue);
    }

    return msg || true;
  }

  static getIntegerErrMsg(str, maxValue, minValue = 0, required = false) {
    let msg = "";

    if (!str && !required) {
      return true;
    }

    const number = Number(str);

    if (!str && required) {
      msg = RecipeValidator.requiredFieldMsg;
    } else if (Number.isNaN(number)) {
      msg = "Please enter an integer";
    } else if (number % 1 !== 0) {
      msg = "Please enter an integer";
    } else if (number > maxValue) {
      msg = RecipeValidator.#getMaxValueMsg(maxValue);
    } else if (number < minValue) {
      msg = RecipeValidator.#getMinValueMsg(minValue);
    }

    return msg || true;
  }
}
