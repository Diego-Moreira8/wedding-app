const path = require("path");
const express = require("express");
const logger = require("morgan");
const { errorsController } = require("./controllers/errors");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));

app.use(errorsController.errorHandler);
app.use(errorsController.notFound);

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on http://localhost:${listener.address().port}/`);
});
