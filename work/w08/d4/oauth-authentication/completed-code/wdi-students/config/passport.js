var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var Student = require('../models/student');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
  },
  function(accessToken, refreshToken, profile, cb) {
    // a user has logged in with OAuth...
    Student.findOne({ 'googleId': profile.id }, function(err, student) {
      if (err) return cb(err);
      if (student) {
        if (!student.avatar) {
          student.avatar = profile.photos[0].value;
          student.save(function(err) {
            return cb(null, student);
          });
        } else {
          return cb(null, student);
        }
      } else {
        // we have a new student via OAuth!
        var newStudent = new Student({
          name: profile.displayName,
          email: profile.emails[0].value,
          avatar: profile.photos[0].value,
          googleId: profile.id
        });
        newStudent.save(function(err) {
          if (err) return cb(err);
          return cb(null, newStudent);
        });
      }
    });
  }
));

// provides passport with what to store in req.session.passport.user
passport.serializeUser(function(student, done) {
  done(null, student.id);
});

// provides passport with the user to attach to req.user
passport.deserializeUser(function(id, done) {
  Student.findById(id, function(err, student) {
    done(err, student);
  });
});