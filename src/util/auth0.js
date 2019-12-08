require('dotenv').config()
import passport from 'passport';
import Auth0Strategy from 'passport-auth0';

console.log( `domain: ${process.env.AUTH0_DOMAIN},
  clientID: ${process.env.AUTH0_CLIENT_ID},
  clientSecret: ${process.env.AUTH0_CLIENT_SECRET},
  callbackURL: ${process.env.AUTH0_CALLBACK_URL}|| 'http://localhost:3000/callback')`)

  // 3 - configuring Auth0Strategy  
  const auth0Strategy = new Auth0Strategy(
    {
      domain: process.env.AUTH0_DOMAIN,
      clientID: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      callbackURL: process.env.AUTH0_CALLBACK_URL
    },
    function(accessToken, refreshToken, extraParams, profile, done) {
        // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
      return done(null, profile);
    }
  );

   // 4 - configuring Passport
   passport.use(auth0Strategy);
   passport.serializeUser((user, done) => done(null, user));
   passport.deserializeUser((user, done) => done(null, user));
 