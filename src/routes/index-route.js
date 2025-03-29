const { Router } = require("express");
const { getIndex } = require("../controllers");

const indexRouter = Router();

indexRouter.get("/", getIndex);

module.exports = indexRouter;
