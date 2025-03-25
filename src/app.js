const path = require("path");
const express = require("express");
const logger = require("morgan");
const expressSession = require("express-session");
const sessionOptions = require("./config/session");
const passport = require("./config/auth");
const { addUserToLocals, checkUser } = require("./middlewares/custom");
const indexRouter = require("./routes/index-route");
const authRouter = require("./routes/auth-route");
const giftsRouter = require("./routes/gifts-route");
const { errorHandler, notFound } = require("./controllers/errors");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(expressSession(sessionOptions));
app.use(passport.session());
app.use(addUserToLocals);

app.use("/", indexRouter);
app.use("/", authRouter);
app.use("/presentes", checkUser, giftsRouter);

app.use(errorHandler);
app.use(notFound);

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on http://localhost:${listener.address().port}/`);
});
