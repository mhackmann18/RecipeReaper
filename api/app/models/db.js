const mysql = require("mysql2/promise");
const fs = require("fs");

// Create a connection to the database
module.exports = async function () {
  const conn = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    // port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: fs.readFileSync(process.env.MYSQL_PASSWORD_FILE, "utf-8").trim(),
    database: process.env.MYSQL_DB,
    multipleStatements: true,
  });

  return conn;
};
