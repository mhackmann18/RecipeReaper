const jwt = require("jsonwebtoken");
const cookie = require("cookie");
const fs = require("fs");

const logRequest = (req, res, next) => {
  let user;
  try {
    const cookies = req.headers?.cookie && cookie.parse(req.headers.cookie);
    const ACCESS_TOKEN_KEY = fs.readFileSync(
      process.env.ACCESS_TOKEN_KEY_FILE,
      "utf-8"
    );
    user =
      cookies?.access_token &&
      jwt.verify(cookies.access_token, ACCESS_TOKEN_KEY);
  } finally {
    console.log(
      `Method: ${req.method.bold}  Endpoint: ${req.url.bold}  User: ${
        (user ? user.username : "none").bold
      }`.yellow
    );
  }
  return next();
};

module.exports = logRequest;
