const { Router } = require("express");
const { getGiftsTable } = require("../controllers/admin");

const adminRouter = Router();

adminRouter.get("/", getGiftsTable);

module.exports = adminRouter;
