const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const prisma = require("../prisma/client");

passport.use(
  new LocalStrategy(
    {
      usernameField: "guestId",
      passwordField: "phone",
    },
    async function verify(guestId, phone, done) {
      const user = await prisma.user.findUnique({
        where: {
          id: parseInt(guestId),
          phone: phone,
        },
      });

      if (!user) {
        return done(null, false);
      }

      if (phone !== user.phone) {
        return done(null, false);
      }

      return done(null, user);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: id } });
    done(null, user);
  } catch (err) {
    done(err);
  }
});

module.exports = passport;
