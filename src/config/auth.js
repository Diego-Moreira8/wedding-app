const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const prisma = require("../prisma/client");
const { comparePassword } = require("./bcrypt");

passport.use(
  new LocalStrategy(
    {
      usernameField: "guestId",
      passwordField: "phone",
    },
    async function verify(guestId, phone, done) {
      const user = await prisma.user.findUnique({
        where: { id: parseInt(guestId) },
      });

      if (!user) {
        return done(null, false);
      }

      const passwordMatch = await comparePassword(phone, user.phone);
      if (!passwordMatch) {
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
