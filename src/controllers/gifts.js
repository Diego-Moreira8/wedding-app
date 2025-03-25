const prisma = require("../prisma/client");

/** @type {import("express").RequestHandler} */
const getList = async (req, res, next) => {
  const allGifts = await prisma.gift.findMany();
  res.render("layout", {
    template: "gifts-list",
    title: "Lista de Presentes",
    allGifts: allGifts,
  });
};

/** @type {import("express").RequestHandler} */
const postChoice = async (req, res, next) => {
  const userId = req.user.id;
  const giftId = parseInt(req.body.giftId);
  const gift = await prisma.gift.findUnique({ where: { id: giftId } });
  const giftTaken = gift.userId && gift.userId !== req.user.id;

  if (giftTaken) {
    return res.send("Gift already taken");
  }

  const userHasAlreadyChosen = await prisma.gift.findUnique({
    where: { userId: userId },
  });

  if (userHasAlreadyChosen) {
    await prisma.gift.update({
      where: { userId: userId },
      data: { userId: null },
    });
  }

  const updatedGift = await prisma.gift.update({
    where: { id: giftId },
    data: { userId: userId },
  });

  res.json(updatedGift);
};

module.exports = {
  getList,
  postChoice,
};
