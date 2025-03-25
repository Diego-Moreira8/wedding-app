const { Router } = require("express");
const { getList } = require("../controllers/gifts");

const giftsRouter = Router();

giftsRouter.get("/", getList);

module.exports = giftsRouter;
