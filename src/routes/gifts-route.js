const { Router } = require("express");
const { getList, postChoice } = require("../controllers/gifts");

const giftsRouter = Router();

giftsRouter.get("/", getList);
giftsRouter.post("/", postChoice);

module.exports = giftsRouter;
