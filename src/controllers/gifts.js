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

module.exports = {
  getList,
};
