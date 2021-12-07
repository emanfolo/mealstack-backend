require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');

const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

// routes
const welcomeRouter = require('./routes/welcome');
const planRouter = require('./routes/plans');
const recipeRouter = require('./routes/recipes');

// db connection
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const app = express();

// middleware
app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(
  session({
    secret: 'secretcode',
    resave: true,
    saveUninitialized: true,
    proxy: true,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'none',
    },
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
  /* can't just store the id because it throws an error
  only fixable with typescript */
  return done(null, user);
});

passport.deserializeUser((user, done) => {
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
    async (accessToken, refreshToken, profile, done) => {
      // find or create the user
      const databaseUser = await prisma.user
        .upsert({
          where: {
            githubId: profile.id,
          },
          update: {
            username: profile.username,
            image: profile._json.avatar_url,
          },
          create: {
            githubId: profile.id,
            username: profile.username,
            image: profile._json.avatar_url,
          },
        })
        .catch((error) => {
          console.log('Error in github auth: ', error);
          done(error, null);
        });

      if (databaseUser) {
        return done(null, databaseUser);
      }
    }
  )
);

app.get(
  '/auth/github',
  passport.authenticate('github', { scope: ['user:email'] })
);

app.get(
  '/auth/github/callback',
  passport.authenticate('github', {
    failureRedirect: `${FRONTEND_URL}/login`,
  }),
  function (req, res) {
    res.redirect(`${FRONTEND_URL}/login/success`);
  }
);

// getting the current user
app.get('/user', (req, res) => {
  if (req.user) {
    res.send({ user: req.user, logged_in: true });
  } else {
    res.send({ logged_in: false });
  }
});

app.post('/logout', (req, res) => {
  if (req.user) {
    req.logout();
    res.send({ status: 200, logged_out: true });
  } else {
    res.sendStatus(401);
  }
});
