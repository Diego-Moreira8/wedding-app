const prisma = require("../prisma/client");
const sortGifts = require("../utils/sortGifts");

/** @type {import("express").RequestHandler} */
const getGiftsTable = async (req, res, next) => {
  const allGifts = sortGifts(
    await prisma.gift.findMany({
      include: { user: true },
    })
  );
  res.render("layout", {
    template: "gifts-table",
    title: "Acompanhamento de Presentes",
    allGifts,
  });
};

module.exports = { getGiftsTable };
