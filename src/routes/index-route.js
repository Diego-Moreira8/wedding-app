const { Router } = require("express");
const prisma = require("../prisma/client");

const indexRouter = Router();

indexRouter.get("/", async (req, res, next) => {
  if (req.user) {
    const giftChosen = await prisma.gift.findUnique({
      where: { userId: req.user.id },
    });

    if (giftChosen) {
      return res.redirect("/presentes/minha-escolha");
    }

    return res.redirect("/presentes");
  }

  res.redirect("/entrar");
});

module.exports = indexRouter;
