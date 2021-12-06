const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

// routes
const welcomeRouter = require('./routes/welcome');
const planRouter = require('./routes/plans');
const recipeRouter = require('./routes/recipes');

const app = express();

// middleware
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(
  session({
    secret: 'secretcode',
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/welcome', welcomeRouter);
app.use('/plans', planRouter);
app.use('/recipes', recipeRouter);

const port = 4000;
app.listen(process.env.PORT || port, () =>
  console.log(`Server is running on port ${port}...`)
);

passport.serializeUser((user, done) => {
  // to be fixed
  return done(null, user);
});

passport.deserializeUser((user, done) => {
  // to be fixed
  return done(null, user);
});

// GitHub sign in
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: '/auth/github/callback',
    },
    function (accessToken, refreshToken, profile, done) {
      // User.findOrCreate({ githubId: profile.id }, function (err, user) {
      //   return done(err, user);
      // });
      console.log(
        'sucessfully authentiated with github:',
        console.log(profile)
      );
      done(null, profile);
    }
  )
);

app.get(
  '/auth/github',
  passport.authenticate('github', { scope: ['user:email'] })
);

app.get(
  '/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function (req, res) {
    res.redirect('/');
  }
);

// getting the current user
app.get('/user', (req, res) => {
  res.send(req.user);
});
