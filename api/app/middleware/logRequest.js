const jwt = require("jsonwebtoken");
const cookie = require("cookie");
const fs = require("fs");

const logRequest = (req, res, next) => {
  let user;
  try {
    const cookies = req.headers?.cookie && cookie.parse(req.headers.cookie);
    const JWT_SECRET =
      process.env.JWT_SECRET ||
      fs.readFileSync(process.env.JWT_SECRET_FILE, "utf-8");
    user =
      cookies?.access_token && jwt.verify(cookies.access_token, JWT_SECRET);
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
