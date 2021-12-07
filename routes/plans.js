const express = require('express')
const router = express.Router()

const cors = require('cors')
router.use(cors())
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const PlanAdder = require('../PlanAdder')
const { any } = require('jest-mock-extended')


// Viewing all created plans

router.get('/', cors(), async (req, res) => {

  const plans = await prisma.plan.findMany({
    include: { recipes: { include: { recipe: true } } },
  })

  res.json(plans)
})

// Viewing all plans

router.get('/search', cors(), async (req, res) => {

  const plans = await prisma.plan.findMany({
    include: { recipes: { include: { recipe: true } } },
  })

  res.json(plans)
})

// Viewing plans by search criteria

router.get('/search/:calories&:carbs&:protein&:fats', cors(), async (req, res) => {

  const plans = await prisma.plan.findMany({
    include: { recipes: { include: { recipe: true } } },
    where: {
      calories: {
        gte: parseInt(req.params.calories * .9),
        lte: parseInt(req.params.calories * 1.1),
      },
      carbs: {
        gte: parseInt(req.params.carbs * .8),
        lte: parseInt(req.params.carbs * 1.2),
      },
      protein: {
        gte: parseInt(req.params.protein * .8),
        lte: parseInt(req.params.protein * 1.2),
      },
      fat: {
        gte: parseInt(req.params.fats * .8),
        lte: parseInt(req.params.fats * 1.2),
      },
    },
  })

  res.json(plans)
})

// Viewing specific plan by id

router.get('/:id', cors(), async (req, res) => {

  const plan = await prisma.plan.findUnique({
    where: {
      id: parseInt(req.params.id),
    },
    include: { recipes: { include: { recipe: true } } },
  })

  res.json(plan)

})

// Route for changing the name of a mealplan

router.post('/edit', async (req, res) =>{

  const editedPlan = await prisma.plan.update({
    where:{
      id: parseInt(req.params.id),
    }, 
    data: {
      name: req.params.name,
    },
  })

  res.json(editedPlan)

})

// Creating a plan with params 

router.post('/new', cors(), async (req, res) => {

  //Will need to be rewritten using planadder.js when we decide to allow users to create their own plans

  
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

router.post('/new/custom/', cors(), async (req, res) => {
  const singleMealCalories = parseInt(req.body.calories) / 3;
  const singleMealCarbs = req.body.carbs/3;
  const singleMealProtein = req.body.protein/3;
  const singleMealFat = req.body.fat / 3;
  const recipeArray = [];

  const recipes = await prisma.recipe.findMany({
    where: {
      calories: {
        gte: parseInt(singleMealCalories * .9),
        lte: parseInt(singleMealCalories * 1.1),
      },
      carbs: {
        gte: parseInt(singleMealCarbs * .5),
        lte: parseInt(singleMealCarbs * 1.5),
      },
      protein: {
        gte: parseInt(singleMealProtein * .5),
        lte: parseInt(singleMealProtein * 1.5),
      },
      fat: {
        gte: parseInt(singleMealFat * .5),
        lte: parseInt(singleMealFat * 1.5),
      },
    },
  })

  let responseBody = null;

  if (recipes.length > 2) {
    for (let i = 0; i < 3; i++){
      let randNum = Math.floor(Math.random() * recipes.length);
      recipeArray.push(recipes[randNum].id);
      recipes.splice(randNum, 1);
    }
    const newPlan = PlanAdder.createPlan('Custom Plan', recipeArray);
    responseBody = await newPlan;
  }

  res.set('Access-Control-Allow-Origin', 'http://localhost:3006')
  res.send({
    headers: {
      'Access-Control-Allow-Origin': 'http://localhost:3006'
    },
    body: await responseBody
  });
})

module.exports = router