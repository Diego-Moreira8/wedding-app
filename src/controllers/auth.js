const prisma = require("../prisma/client");
const passport = require("../config/auth");

const getRenderLoginOptions = async (error, req) => {
  const guests = await prisma.user.findMany();
  guests.sort((a, b) => {
    if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
    if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
    return 0;
  });
  return {
    template: "log-in",
    title: "Entrar",
    noHeader: true,
    guests: guests,
    error: error || "",
    values: req?.body,
  };
};

/** @type {import("express").RequestHandler} */
const checkGuestId = async (req, res, next) => {
  if (!req.body.guestId) {
    return res
      .status(401)
      .render(
        "layout",
        await getRenderLoginOptions("Você não escolheu um usuário!", req)
      );
  }
  next();
};

/** @type {import("express").RequestHandler} */
const getLogin = async (req, res, next) => {
  if (req.user) {
    return res.redirect("/");
  }
  res.render("layout", await getRenderLoginOptions());
};

/** @type {import("express").RequestHandler} */
const postLogin = (req, res, next) => {
  passport.authenticate("local", async (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res
        .status(401)
        .render(
          "layout",
          await getRenderLoginOptions("Telefone incorreto!", req)
        );
    }

    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  })(req, res, next);
};

/** @type {import("express").RequestHandler} */
const getLogout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};

module.exports = {
  checkGuestId,
  getLogin,
  postLogin,
  getLogout,
};
