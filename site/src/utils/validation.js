// Form validation

export function isValidNumberInput(input, maxValue = Infinity, minValue = 0) {
  if (input === "") {
    return true;
  }
  if (
    /^[0-9]+$/.test(input) &&
    Number(input) <= maxValue &&
    Number(input) >= minValue
  ) {
    return true;
  }
  return false;
}

export function isValidHttpUrl(string) {
  // https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return "Please enter a valid URL";
  }
  return (
    url.protocol === "http:" ||
    url.protocol === "https:" ||
    "Please enter a valid URL"
  );
}

/**
 *
 * @param {string} username
 * @returns true if username is valid, otherwise error message string
 */
export function checkUsernameInput(username) {
  if (!/^[a-zA-Z0-9_-]*$/.test(username)) {
    return "Username must only contain letters, numbers, dashes ( - ), and underscores ( _ )";
  }
  if (username.length < 6) {
    return "Username must be at least 6 characters in length";
  }
  if (username.length > 30) {
    return "Username must be no more than 30 character in length";
  }
  return true;
}

/**
 *
 * @param {string} password
 * @returns true if password is valid, otherwise error message string
 */
export function checkPasswordInput(password) {
  if (password.length < 8) {
    return "Password must be at least 8 characters in length";
  }
  if (password.length > 128) {
    return "Password must be no more than 128 characters in length";
    // Regex from https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
  }
  if (
    !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&-])[A-Za-z\d@$!%*#?&-]{8,128}$/.test(
      password
    )
  ) {
    return "Password must contain at least one letter, one number, and one special character (@, $, !, %, *, #, ?, &, -)";
  }
  return true;
}
