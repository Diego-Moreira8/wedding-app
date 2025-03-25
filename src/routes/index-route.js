const { Router } = require("express");

const indexRouter = Router();

indexRouter.get("/", (req, res, next) => {
  res.redirect("/entrar");
});

module.exports = indexRouter;
