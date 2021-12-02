const plans = require('./routes/plans')
const recipes = require('./routes/recipes')
const welcome = require('./routes/welcome')

const request = require('supertest')


const express = require('express')
const app = express()

app.use(express.urlencoded({ extended: false }));
app.use("/", welcome);

test("welcome route works", done => {
  request(app)
    .get("/")
    .expect("Welcome to mealstack API!")
    .expect(200, done);
});

/*
test("recipes route works", done => {
  request(app)
    .get("/recipes")
    .expect(200, done);
})

test("recipes route works", done => {
  request(app)
    .get("/plans")
    .expect(200, done);
})
*/
