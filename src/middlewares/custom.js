/** @type {import("express").RequestHandler} */
const addUserToLocals = (req, res, next) => {
  if (req?.user) {
    res.locals.user = req.user;
  }
  next();
};

module.exports = { addUserToLocals };
