/** @type {import("express").RequestHandler} */
const addUserToLocals = (req, res, next) => {
  if (req?.user) {
    res.locals.user = req.user;
  }
  next();
};

/** @type {import("express").RequestHandler} */
const checkUser = (req, res, next) => {
  if (!req?.user) {
    throw new Error("Not authenticated");
  }
  next();
};

/** @type {import("express").RequestHandler} */
const checkAdmin = (req, res, next) => {
  if (req.user.role !== "ADMIN") {
    return res.status(403).redirect("/");
  }
  next();
};

/** @type {import("express").RequestHandler} */
const checkThaina = (req, res, next) => {
  if (req.user.name === "Thainá") {
    return res.render("layout", {
      template: "thaina",
      title: "Já deu presente!",
    });
  }
  next();
};

module.exports = {
  addUserToLocals,
  checkUser,
  checkAdmin,
  checkThaina,
};
