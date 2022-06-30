const LocalStrategy = require("passport-local").Strategy;
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
const bcrypt = require("bcrypt");
const { User } = require("../models/User");

function initialize(passport) {
  const authenticateUser = (email, password, done) => {
    User.findOne({ email: email.toLowerCase() }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "No user with that email" });
      }
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          return done(err);
        }
        if (result) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Incorrect Password" });
        }
      });
    });
  };
	// passport.use(new GoogleStrategy({
	// 	clientID: process.env.GOOGLE_CLIENT_ID,
	// 	clientSecret: process.env.GOOGLE_CLIENT_SECRET,
	// 	callbackURL: "http://localhost:3000/auth/google/callback",
	// 	},
	// 	(accessToken, refreshToken, profile, cb) => {
	// 		User.findOrCreate({googleId: profile.id}, (err, user) => {
	// 			return cb(err, user);
	// 		});
	// 	}
	// ));
  passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
		return done(err, user);
    });
  });
}

module.exports = initialize;
