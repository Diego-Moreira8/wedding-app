const { Router } = require("express");
const {
  checkGuestId,
  postLogin,
  getLogin,
  getLogout,
} = require("../controllers/auth");

const authRouter = Router();

authRouter.get("/entrar", getLogin);
authRouter.post("/entrar", checkGuestId, postLogin);
authRouter.get("/sair", getLogout);

module.exports = authRouter;
