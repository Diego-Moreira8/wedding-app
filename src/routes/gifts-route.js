const { Router } = require("express");
const {
  getList,
  postChoice,
  getUserChoice,
  getRemoveChoice,
  postRemoveChoice,
} = require("../controllers/gifts");

const giftsRouter = Router();

giftsRouter.get("/", getList);
giftsRouter.post("/", postChoice);
giftsRouter.get("/minha-escolha", getUserChoice);
giftsRouter.get("/minha-escolha/remover", getRemoveChoice);
giftsRouter.post("/minha-escolha/remover", postRemoveChoice);

module.exports = giftsRouter;
