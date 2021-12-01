const express = require('express');
const cors = require('cors')
const app = express()
const importedData = require("./data.json")
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


app.use(cors())
app.use(express.json())
app.use(express.static("public"))


app.set('view engine', 'ejs')

// Homepage 

app.get('/', cors(), (req, res) => {


  res.send("Welcome to mealstack API!")

})

// Viewing static JSON recipes object

app.get('/recipes', cors(), (req, res) => {

  res.send(importedData)

})

// Viewing specific recipe based on the id 

app.get('/recipes/:id', cors(), (req, res) => {

  let filteredRecipe = importedData.recipes.recipe.filter( result => result.recipe_id == req.param('id'))

  res.send(filteredRecipe)
})

// Viewing all created plans

app.get('/plans', cors(), async (req, res) => {

  const plans = await prisma.plan.findMany()

  const plansAndMeals = [plans, importedData]

  res.json(plansAndMeals)

})

// Viewing specific plan by id

app.get('/plan/:id', cors(), async (req, res) => {

  const plan = await prisma.plan.findUnique({
    where: {
      id: parseInt(req.param('id')),
    },
  })

  res.json(plan)

})

// Route for changing the name of a mealplan

app.post('/mealplan/edit', async (req, res) =>{

  const editedPlan = await prisma.plan.update({
    where:{
      id: parseInt(req.param('id')),
    }, 
    data: {
      name: req.param('name'),
    },
  })

  res.send(editedPlan)

})

// Creating a plan with params 

app.post('/mealplan/new', cors(), async (req, res) => {

  //Future logic for finding recipes using the id's given and calculating macros & calories on backend

  // let selectedBreakfast = importedData.recipes.recipe.filter( result => result.recipe_id == req.param('breakfast_id'))
  // let selectedLunch = importedData.recipes.recipe.filter( result => result.recipe_id == req.param('lunch_id'))
  // let selectedDinner = importedData.recipes.recipe.filter( result => result.recipe_id == req.param('dinner_id'))
  // let selectedSnack = importedData.recipes.recipe.filter( result => result.recipe_id == req.param('snack_id'))

  
  const newPlan = await prisma.plan.create({
      data: {
        calories: parseInt(req.param('calories')),
        protein: parseInt(req.param('protein')),
        carbs: parseInt(req.param('carbs')), 
        fat: parseInt(req.param('fat')), 
        breakfast_id: parseInt(req.param('breakfast_id')),
        lunch_id: parseInt(req.param('lunch_id')),
        dinner_id: parseInt(req.param('dinner_id')),
        snack_id: parseInt(req.param('snack_id')),
        name: req.param('name')
      }
    })

  res.json(newPlan)

})

app.listen(process.env.PORT || 3000, 
	() => console.log("Server is running..."));



