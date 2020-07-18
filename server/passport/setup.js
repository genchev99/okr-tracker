const bcrypt = require("bcryptjs");
const User = require("../models/user");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

// Local Strategy
passport.use(
  new LocalStrategy({usernameField: 'email'}, (email, password, done) => {
    // Match User
    User.findOne({email: email, activated: true})
      .then(user => {
        if (!user) return done(null, false);
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;

          console.log(isMatch)
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, {message: 'Wrong password'});
          }
        });
      })
      .catch(err => {
        return done(null, false, {message: err});
      });
  })
);

module.exports = passport;
