require("colors");
// require("dotenv").config({ path: `${__dirname}/config.env` });
const express = require("express");
const cors = require("cors");
const https = require("https");
const fs = require("fs");
const init = require("./app/utilities/init");
const logRequest = require("./app/middleware/logRequest");

const app = express();

const { CORS_ORIGIN } = process.env;

const corsOptions = {
  origin: `${CORS_ORIGIN}`,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(logRequest);

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to RecipeReaper" });
});

require("./app/routes/recipe")(app);
require("./app/routes/user")(app);

const { PORT, NODE_ENV } = process.env;

const MAX_RETRY_ATTEMPTS = 15;
const RETRY_INTERVAL = 5000;

if (NODE_ENV === "production") {
  const options = {
    key: fs.readFileSync("/etc/pki/tls/private/rrapi-tls.key"),
    cert: fs.readFileSync("/etc/pki/tls/certs/api_recipereaper_com.crt"),
  };

  // Connect to db and init

  init().then(() =>
    https.createServer(options, app).listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
    })
  );
}

if (NODE_ENV === "development") {
  // try {
  //   init().then(() => {
  //     app.listen(PORT, () => {
  //       console.log(`Server is running on port ${PORT}.`);
  //     });
  //   });
  // } catch (err) {
  //   console.log(err.red);
  // }
  // eslint-disable-next-line no-use-before-define
  connectToDBWithRetry(MAX_RETRY_ATTEMPTS, RETRY_INTERVAL);
}

async function connectToDBWithRetry(maxAttempts, interval) {
  let retryCount = 0;

  async function tryConnect() {
    try {
      await init();
      console.log("Database connected successfully!");
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}.`);
      });
    } catch (err) {
      console.error(
        `Error connecting to the database (Attempt ${retryCount + 1}):`,
        err
      );
      retryCount++;

      if (retryCount < maxAttempts) {
        setTimeout(tryConnect, interval);
      } else {
        console.error(`Max retry attempts (${maxAttempts}) reached. Exiting.`);
        process.exit(1); // Exit the application if max retry attempts are reached
      }
    }
  }

  tryConnect();
}
