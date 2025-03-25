const { Router } = require("express");
const { checkGuestId, postLogin, getLogin } = require("../controllers/auth");

const authRouter = Router();

authRouter.get("/entrar", getLogin);
authRouter.post("/entrar", checkGuestId, postLogin);

module.exports = authRouter;
