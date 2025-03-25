const path = require("path");
const express = require("express");
const logger = require("morgan");
const expressSession = require("express-session");
const sessionOptions = require("./config/session");
const { errorHandler, notFound } = require("./controllers/errors");
const indexRouter = require("./routes/index-route");
const authRouter = require("./routes/auth-route");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(expressSession(sessionOptions));

app.use("/", indexRouter);
app.use("/", authRouter);

app.use(errorHandler);
app.use(notFound);

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on http://localhost:${listener.address().port}/`);
});
