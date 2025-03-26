const { Router } = require("express");
const { getList, postChoice, getUserChoice } = require("../controllers/gifts");

const giftsRouter = Router();

giftsRouter.get("/", getList);
giftsRouter.post("/", postChoice);
giftsRouter.get("/minha-escolha", getUserChoice);

module.exports = giftsRouter;
