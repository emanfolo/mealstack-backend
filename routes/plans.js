const express = require('express')
const router = express.Router()

const cors = require('cors')
router.use(cors())
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


// Viewing all created plans

router.get('/', cors(), async (req, res) => {

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
      AND: [
        {
          calories: {
            gte: req.params.calories-50,
          },
        },
        {
          calories: {
            lte: parseInt(req.params.calories)+50,
          },
        },
        {
          carbs: {
            gte: req.params.carbs-10,
          },
        },
        {
          carbs: {
            lte: parseInt(req.params.carbs)+10,
          },
        },
        {
          protein: {
            gte: req.params.protein-10,
          },
        },
        {
          protein: {
            lte: parseInt(req.params.protein)+10,
          },
        },
        {
          fat: {
            gte: req.params.fats-10,
          },
        },
        {
          fat: {
            lte: parseInt(req.params.fats)+10,
          },
        },
      ],
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

router.get('/new/custom', cors(), async (req, res) => {
  const singleMealCalories = 1000;
  const singleMealCarbs = 50;
  const singleMealProtein = 83;
  const singleMealFat = 60;

  // const singleMealCalories = req.params.calories/3;
  // const singleMealCarbs = req.params.carbs/3;
  // const singleMealProtein = req.params.protein/3;
  // const singleMealFat = req.params.fats/3;

  //fetch 3 meals that have params/3 give or take 10%
  const recipes = await prisma.recipe.findMany({
    where: {
      AND: [
        {
          calories: {
            gte: parseInt(singleMealCalories * .9),
          },
        },
        {
          calories: {
            lte: parseInt(singleMealCalories * 1.1),
          },
        },
        {
          carbs: {
            gte: parseInt(singleMealCarbs * .9),
          },
        },
        {
          carbs: {
            lte: parseInt(singleMealCarbs * 1.1),
          },
        },
        {
          protein: {
            gte: parseInt(singleMealProtein * .9),
          },
        },
        {
          protein: {
            lte: parseInt(singleMealProtein * 1.1),
          },
        },
        {
          fat: {
            gte: parseInt(singleMealFat * .9),
          },
        },
        {
          fat: {
            lte: parseInt(singleMealFat * 1.1),
          },
        },
      ],
    },
  })

  const randomRecipe = (recipes) => {
    return recipes[Math.floor(Math.random() * recipes.length)].id
  }

  const recipeArray = [randomRecipe(recipes), randomRecipe(recipes), randomRecipe(recipes)];
  console.log(recipeArray);

  
  // const newPlan = await prisma.plan.create({
  //     data: {
  //       calories: parseInt(req.param('calories')),
  //       protein: parseInt(req.param('protein')),
  //       carbs: parseInt(req.param('carbs')), 
  //       fat: parseInt(req.param('fat')), 
  //       breakfast_id: parseInt(req.param('breakfast_id')),
  //       lunch_id: parseInt(req.param('lunch_id')),
  //       dinner_id: parseInt(req.param('dinner_id')),
  //       snack_id: parseInt(req.param('snack_id')),
  //       name: req.param('name')
  //     }
  //   })

  res.json(recipes)

})

module.exports = router