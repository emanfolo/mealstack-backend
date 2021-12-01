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

// Viewing all created plans

app.get('/plans', cors(), async (req, res) => {

  const plans = await prisma.plan.findMany()

  res.json(plans)

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

// Creating a plan with params 

app.post('/mealplan/new', cors(), async (req, res) => {
  
  const newPlan = await prisma.plan.create({
      data: {
        calories: parseInt(req.param('calories')),
        protein: parseInt(req.param('protein')),
        carbs: parseInt(req.param('carbs')), 
        fat: parseInt(req.param('fat'))
      }
    })

  res.json(newPlan)

})

app.listen(process.env.PORT || 3000, 
	() => console.log("Server is running..."));



