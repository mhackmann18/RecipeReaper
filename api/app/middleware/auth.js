const jwt = require("jsonwebtoken");
const cookie = require("cookie");
const fs = require("fs");
const { printErrMsg } = require("../utilities/utils");
const errorCodes = require("../utilities/errorCodes");

const verifyToken = (checkPrivilegesFn) => (req, res, next) => {
  try {
    const cookies = req.headers.cookie && cookie.parse(req.headers.cookie);

    if (!cookies?.access_token) {
      printErrMsg({
        message: "No access token provided",
      });
      return res.status(401).send({
        message: "Please login",
        error: errorCodes.INVALID_TOKEN_ERR,
      });
    }

    const user = jwt.verify(
      cookies.access_token,
      process.env.JWT_SECRET ||
        fs.readFileSync(process.env.JWT_SECRET_FILE, "utf-8")
    );
    req.user = user;

    if (
      !checkPrivilegesFn(req) &&
      user.username !== process.env.ADMIN_USERNAME
    ) {
      printErrMsg({ message: "Permission denied" });
      return res.status(403).send({
        message: "Permission denied",
        error: errorCodes.NO_PERMISSION_ERR,
      });
    }
  } catch (error) {
    printErrMsg(error);
    return res
      .status(401)
      .send({ message: "Invalid Token", error: errorCodes.INVALID_TOKEN_ERR });
  }
  return next();
};

exports.allowAllUsers = verifyToken(() => true);

exports.restrictAllUsers = verifyToken(() => false);

exports.allowUserWithSameId = verifyToken(
  (req) => req.user.id === Number(req.params.id)
);
