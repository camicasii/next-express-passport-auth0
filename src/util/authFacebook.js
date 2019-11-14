require("dotenv").config();
import passport from "passport";
import FacebookStrategy from "passport-facebook";
import User from "../database/mongodb/Schema";

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL:
        process.env.CALLBACKURL ||
        "http://localhost:3000/auth/facebook/callback"
    },
    async function(accessToken, refreshToken, profile, cb) {
      try {
        const user = await User.find({ facebookId: profile.id });
        if (user.length > 0) {
          return cb(null, user[0]);
        } else {
          const newUser = new User({ facebookId: profile.id });
          await newUser.save();
          return cb(null, newUser);
        }
      } catch (e) {
        return cb(e, null);
      }
    }
  )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));
