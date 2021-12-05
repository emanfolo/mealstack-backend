const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');

// routes
const welcomeRouter = require('./routes/welcome');
const planRouter = require('./routes/plans');
const recipeRouter = require('./routes/recipes');
const userRouter = require('./routes/users');

const app = express();

// middleware
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(session);
app.use(passport.initialize());
app.use(passport.session());

app.use('/welcome', welcomeRouter);
app.use('/plans', planRouter);
app.use('/recipes', recipeRouter);

app.listen(process.env.PORT || 3000, () => console.log('Server is running...'));
