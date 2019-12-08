require("dotenv").config();
import express from "express";
import passport from "passport";
const router = express.Router();

router.get("/auth/facebook", passport.authenticate("facebook"));

router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect("/profile");
  }
);

router.get("/state", (req, res) => {
  const isAuthenticated = req.isAuthenticated();
  res.json({ isAuthenticated });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;