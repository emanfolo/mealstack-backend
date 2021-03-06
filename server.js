if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const bodyParser = require('body-parser');

const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

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
    store: new (require('connect-pg-simple')(session))({
      createTableIfMissing: true,
      conObject: {
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false,
        },
      },
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    proxy: true,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'none',
      maxAge: 2629800000, // 1 month
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/welcome', welcomeRouter);
app.use('/plans', planRouter);
app.use('/recipes', recipeRouter);

const port = 4000;
app.listen(process.env.PORT || port, () =>
  console.log(`Server is running on port ${port}...`)
);

passport.serializeUser((user, done) => {
  // best practice to only store user id in session
  return done(null, user.id);
});

passport.deserializeUser(async (userid, done) => {
  const userObject = await prisma.user
    .findUnique({
      where: {
        id: parseInt(userid),
      },
    })
    .catch((err) => {
      console.log(err);
      done(err, null);
    });

  if (userObject) {
    return done(null, userObject);
  }
});

// GitHub sign in
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL:
        'https://mealstack-backend.herokuapp.com/auth/github/callback',
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
    failureRedirect: `${process.env.FRONTEND_URL}/login`,
  }),
  function (req, res) {
    res.redirect(`${process.env.FRONTEND_URL}/login/success`);
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

app.get('/', (req, res) => {
  res.redirect('/welcome');
});

// getting all of a users plans
app.get('/user/:id/plans', async (req, res) => {
  const plans = await prisma.plansOnUsers
    .findMany({
      include: {
        plan: { include: { recipes: { include: { recipe: true } } } },
      },
      where: { userId: parseInt(req.params.id) },
    })
    .catch((err) => console.log(err));

  res.json(plans);
});

// not restful but too late to change
app.post('/user/plans/:planid', async (req, res) => {
  const savedPlan = await prisma.plansOnUsers
    .create({
      data: {
        userId: parseInt(req.body.userid),
        planId: parseInt(req.params.planid),
      },
    })
    .catch((err) => {
      console.log(err);
    });
  res.json(savedPlan);
});

app.delete('/user/plans/:planid', async (req, res) => {
  const deletedPlan = await prisma.plansOnUsers
    .delete({
      where: {
        userId_planId: {
          userId: parseInt(req.body.userid),
          planId: parseInt(req.params.planid),
        },
      },
    })
    .catch((err) => {
      console.log(err);
    });
  res.json(deletedPlan);
});
