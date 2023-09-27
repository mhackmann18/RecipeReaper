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

export function checkUsernameInput(username) {
  let isValid = false;
  let msg = "";

  if (!/^[a-zA-Z0-9_-]*$/.test(username)) {
    msg =
      "Username must only contain letters, numbers, dashes ( - ), and underscores ( _ )";
  } else if (username.length < 6) {
    msg = "Username must be at least 6 characters in length";
  } else if (username.length > 30) {
    msg = "Username must be no more than 30 character in length";
  } else {
    isValid = true;
  }

  return [isValid, msg];
}

export async function checkPasswordInput(password) {
  let isValid = false;
  let msg = "";

  if (password.length < 8) {
    msg = "Password must be at least 8 characters in length";
  } else if (password.length > 128) {
    msg = "Password must be no more than 128 characters in length";
    // Regex from https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
  } else if (
    !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&-])[A-Za-z\d@$!%*#?&-]{8,128}$/.test(
      password
    )
  ) {
    msg =
      "Password must contain at least one letter, one number, and one special character (@, $, !, %, *, #, ?, &, -)";
  } else {
    isValid = true;
  }

  return [isValid, msg];
}
