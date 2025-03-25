/** @type {import("express").RequestHandler} */
const addUserToLocals = (req, res, next) => {
  if (req?.user) {
    res.locals.user = req.user;
  }
  next();
};

const checkUser = (req, res, next) => {
  if (!req?.user) {
    throw new Error("Not authenticated");
  }
  next();
};

module.exports = {
  addUserToLocals,
  checkUser,
};
