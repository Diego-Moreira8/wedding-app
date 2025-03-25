const { Router } = require("express");

const indexRouter = Router();

indexRouter.get("/", (req, res, next) => {
  if (req.user) {
    return res.redirect("/presentes");
  }

  res.redirect("/entrar");
});

module.exports = indexRouter;
