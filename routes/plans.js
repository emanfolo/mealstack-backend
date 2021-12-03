const express = require('express')
const router = express.Router()

const cors = require('cors')
router.use(cors())
const importedData = require("../data.json")
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


// Viewing all created plans

router.get('/', cors(), async (req, res) => {

  const plans = await prisma.plan.findMany({
    include: { recipes: { include: { recipe: true } } },
  })

  res.json(plans)
})

// Viewing specific plan by id

router.get('/:id', cors(), async (req, res) => {

  const plan = await prisma.plan.findUnique({
    where: {
      id: parseInt(req.param('id')),
    },
  })

  res.json(plan)

})

// Route for changing the name of a mealplan

router.post('/edit', async (req, res) =>{

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

router.post('/new', cors(), async (req, res) => {

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

module.exports = router