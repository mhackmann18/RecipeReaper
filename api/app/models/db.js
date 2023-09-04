const mysql = require("mysql2/promise");
const fs = require("fs");

// Create a connection to the database
module.exports = async function () {
  console.log(process.env.MYSQL_PASSWORD, process.env.MYSQL_USER);
  const conn = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    // port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password:
      process.env.MYSQL_PASSWORD ||
      fs.readFileSync(process.env.MYSQL_PASSWORD_FILE, "utf-8"),
    database: process.env.MYSQL_DB,
    multipleStatements: true,
  });

  return conn;
};
