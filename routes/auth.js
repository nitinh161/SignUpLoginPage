const express = require('express')
const passport = require('passport')
const findOrCreate = require("mongoose-findorcreate");
const FacebookStrategy=require('passport-facebook').Strategy;
const router = express.Router()


router.get('/auth/google', passport.authenticate('google', { scope: ['profile','email'] }))


router.get(
  '/auth/google/glogin',
  passport.authenticate('google', { 
		successRedirect: '/auth/google/glogin',
    failureRedirect: '/index'
	 }),
  (req, res, next) => {
    res.redirect('/glogin')
  }
)
router.get('/auth/facebook',
  passport.authenticate('facebook'));

router.get('/auth/facebook/fblogin',
  passport.authenticate('facebook', { failureRedirect: '/index' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/fblogin');
  });

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

module.exports = router;