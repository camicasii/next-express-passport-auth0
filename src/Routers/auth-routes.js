require('dotenv').config()
import express from 'express';
import passport from 'passport';


const router = express.Router();

router.get("/login", passport.authenticate("auth0", {
  scope: "openid email profile"
}), (req, res) => res.redirect("/"));

router.get("/callback", (req, res, next) => {
  passport.authenticate("auth0",  (err, user) => {
    if (err) return next(err);
    if (!user) return res.redirect("/login");
    req.logIn(user, (err) => {
      if (err) return next(err);
      res.redirect("/");
    });
  })(req, res, next);
});


router.get("/callback", (req, res,next) => {
    console.log("/callback");
    
if(req.isAuthenticated())
next()
else
res.redirect('/callback2');
},(req,res)=>res.redirect('/profile'))

router.get("/callback2", (req, res) => {
    console.log("/callback2");
 console.log(   req.isAuthenticated())
 res.redirect("/")
})
    

router.get("/logout", (req, res) => {
  req.logout();

  const {AUTH0_DOMAIN, AUTH0_CLIENT_ID, BASE_URL} = process.env;
  res.redirect(`https://${AUTH0_DOMAIN}/logout?client_id=${AUTH0_CLIENT_ID}&returnTo=${BASE_URL}`);
});

module.exports = router;