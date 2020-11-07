/**
 * Module dependencies.
 */
const express = require("express");
const compression = require("compression");
const bodyParser = require("body-parser");
const chalk = require("chalk");
const errorHandler = require("errorhandler");
const dotenv = require("dotenv");
const passport = require("passport");
const expressValidator = require("express-validator");
// const DB = require('./config/database');
const api_routes = require("./routes/api")(express);
const morgan = require("morgan");
const httpError = require("http-errors");

/**
 * Middlewares
 */
const NotFoundMiddleware = require("./Middlewares/NotFoundlMiddleware");
const ServerErrorMiddleware = require("./Middlewares/ServerErrorMiddleware");
const EnablingCorsMiddleware = require("./Middlewares/EnablingCorsMiddleware");
const jwtMiddleware = require("./Middlewares/JwtMiddleware");

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.config({ path: ".env" });

/**
 * Create Express server.
 */
const app = express();

/**
 * Connect to MongoDB.
 */
// DB();

/**
 * Express configuration.
 */
app.set("host", process.env.HOST || "127.0.0.1");
app.set("port", process.env.PORT || 8080);

/**
 * Disable x-powered-by
 */
app.disable("x-powered-by");

/*
|--------------------------------------------------------------------------
|  Middlewares
|--------------------------------------------------------------------------
|  
|  
*/

// Compress Body
app.use(compression());

// Configure bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configure bodyparser
app.use(expressValidator());
app.use(passport.initialize());

// Access-Control-Allow
app.use(EnablingCorsMiddleware);

// Routes
app.use("/api", api_routes);

//, jwtMiddleware.checkToken
app.get("/privatRessource", (req, res) => {
  console.log("last middleware", res.locals.userData);
  res.json({ success: "true", message: "you can access" });
});

/**
 * Switch between dev/prod
 * [ERROR HANDLER]
 */
if (process.env.NODE_ENV === "development") {
  // only use in development
  app.use(ServerErrorMiddleware); // Show detail about 500 error
  app.use(morgan("dev")); // Show all logs in console
  app.use(errorHandler());
} else {
  app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  });
}

// catch 404 errors to json
app.use(NotFoundMiddleware);
/*
 ***************************************
 * END Middlewares
 ****************************************
 */

/**
 * Start Express server.
 */
const server = app.listen(app.get("port"), () => {
  console.log(
    "%s App is running at http://localhost:%d in %s mode",
    chalk.green("✓"),
    app.get("port"),
    app.get("env")
  );
  console.log("  Press CTRL-C to stop\n");
});

const io = require("socket.io")(server);
io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", (msg) => {
    console.log("user disconnected");
  });

  // setInterval(function () {
  //   socket.emit("news_by_server", "Cow goes moo");
  // }, 1000);
});

module.exports = app;
