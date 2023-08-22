const connectToDB = require("../models/db");

/**
 * Creates database tables if they don't already exist.
 */
module.exports = async function init() {
  const connection = await connectToDB();

  await connection.execute(`CREATE TABLE IF NOT EXISTS users (
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(30) UNIQUE NOT NULL,
    password CHAR(60) NOT NULL,  
    theme ENUM('light', 'dark') DEFAULT 'light',
    PRIMARY KEY(id)
  );`);

  await connection.execute(`CREATE TABLE IF NOT EXISTS recipes (
    id INT NOT NULL AUTO_INCREMENT, 
      user_id INT NOT NULL,
      title VARCHAR(99) NOT NULL,
      servings TINYINT NOT NULL, 
      serving_size VARCHAR(80),
      prep_time SMALLINT,
      cook_time SMALLINT,
      original_url VARCHAR(2083),
      PRIMARY KEY (id),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );`);

  await Promise.all([
    connection.execute(`CREATE TABLE IF NOT EXISTS nutrients (
    id INT NOT NULL AUTO_INCREMENT,
    recipe_id INT UNIQUE NOT NULL,
    calories SMALLINT,
    fat SMALLINT,
    saturated_fat SMALLINT,
    unsaturated_fat SMALLINT,
    trans_fat SMALLINT,
    carbohydrate SMALLINT,
    protein SMALLINT,
    sugar SMALLINT,
    cholesterol SMALLINT,
    sodium SMALLINT,
    fiber SMALLINT,
      PRIMARY KEY (id),
      FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE
  );`),
    connection.execute(`CREATE TABLE IF NOT EXISTS instructions (
    id INT NOT NULL AUTO_INCREMENT,
      text VARCHAR(9999) NOT NULL, 
      step SMALLINT NOT NULL, 
      recipe_id INT NOT NULL,
      FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE,
      PRIMARY KEY (id),
      UNIQUE (step, recipe_id),
      CONSTRAINT no_negative_instr_step CHECK (step > 0)
  );`),
    connection.execute(`CREATE TABLE IF NOT EXISTS ingredients (
    id INT NOT NULL AUTO_INCREMENT,  
      recipe_id INT NOT NULL, 
      quantity FLOAT,
      unit ENUM(
    "milliliter", 
      "teaspoon", 
      "tablespoon", 
      "ounce", 
      "cup",
      "pint",
    "liter",
    "quart",
    "gallon",
    "milligram",
    "gram",
    "kilogram",
    "pound"),
      name VARCHAR(99) NOT NULL, 
      PRIMARY KEY (id), 
      UNIQUE (name, recipe_id),
      FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE
  );`),
  ]);

  await connection.close();
};
