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

  res.redirect("/presentes/minha-escolha");
};

/** @type {import("express").RequestHandler} */
const getUserChoice = async (req, res, next) => {
  const userChoice = await prisma.gift.findUnique({
    where: { userId: req.user.id },
  });
  res.render("layout", {
    template: "choice-details",
    title: "Minha Escolha",
    userChoice: userChoice,
  });
};

/** @type {import("express").RequestHandler} */
const getRemoveChoice = async (req, res, next) => {
  const userChoice = await prisma.gift.findUnique({
    where: { userId: req.user.id },
  });

  res.render("layout", {
    template: "remove-choice",
    title: "Remover Escolha",
    userChoice: userChoice,
  });
};

/** @type {import("express").RequestHandler} */
const postRemoveChoice = async (req, res, next) => {
  await prisma.gift.update({
    where: { userId: req.user.id },
    data: { userId: null },
  });
  res.redirect("/presentes");
};

module.exports = {
  getList,
  postChoice,
  getUserChoice,
  getRemoveChoice,
  postRemoveChoice,
};
