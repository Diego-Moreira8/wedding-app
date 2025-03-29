const prisma = require("../prisma/client");

/** @type {import("express").RequestHandler} */
const getIndex = async (req, res, next) => {
  if (req.user) {
    if (req.user.role === "ADMIN") {
      return res.redirect("/noivos");
    }

    const giftChosen = await prisma.gift.findUnique({
      where: { userId: req.user.id },
    });

    if (giftChosen) {
      return res.redirect("/presentes/minha-escolha");
    }

    return res.redirect("/presentes");
  }

  res.redirect("/entrar");
};

module.exports = { getIndex };
