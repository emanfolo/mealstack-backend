const express = require('express')
const router = express.Router()

const cors = require('cors')
router.use(cors())
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const PlanAdder = require('../PlanAdder')
const { any } = require('jest-mock-extended')
const originUrl = '*'


// Viewing all created plans

router.get('/', cors(), async (req, res) => {

  const plans = await prisma.plan.findMany({
    include: { recipes: { include: { recipe: true } } },
  })

  res.json(plans)
})

// Viewing plans by search criteria

router.post('/search', cors(), async (req, res) => {
  const data = req.body;
  const calories = data.calories;
  const carbs = data.carbs;
  const protein = data.protein;
  const fat = data.fat;
  const dairyFree = data.dairyFree;
  const glutenFree = data.glutenFree;
  const kosher = data.kosher;
  const peanutFree = data.peanutFree;
  const porkFree = data.porkFree;
  const vegan = data.vegan;
  const vegetarian = data.vegetarian;

  const isSearchable = (macro) => {
    return (macro && macro != 'false' && macro != '')
  }
  console.log(isSearchable(vegetarian));
  const plans = await prisma.plan.findMany({
    include: { recipes: { include: { recipe: true } } },
    where: {
      calories: {
        gte: isSearchable(calories) ? parseInt(calories * .9) : undefined,
        lte: isSearchable(calories) ? parseInt(calories * 1.1) : undefined,
      },
      carbs: {
        gte: isSearchable(carbs) ? parseInt(carbs * .75) : undefined,
        lte: isSearchable(carbs) ? parseInt(carbs * 1.25) : undefined,
      },
      protein: {
        gte: isSearchable(protein) ? parseInt(protein * .75) : undefined,
        lte: isSearchable(protein) ? parseInt(protein * 1.25) : undefined,
      },
      fat: {
        gte: isSearchable(fat) ? parseInt(fat * .75) : undefined,
        lte: isSearchable(fat) ? parseInt(fat * 1.25) : undefined,
      },
      recipes: {
        every: {
          recipe: {
            dairyFree: {
              equals: isSearchable(dairyFree) ? true : undefined,
            },
            glutenFree: {
              equals: isSearchable(glutenFree) ? true : undefined,
            },
            kosher: {
              equals: isSearchable(kosher) ? true : undefined,
            },
            peanutFree: {
              equals: isSearchable(peanutFree) ? true : undefined,
            },
            porkFree: {
              equals: isSearchable(porkFree) ? true : undefined,
            },
            vegan: {
              equals: isSearchable(vegan) ? true : undefined,
            },
            vegetarian: {
              equals: isSearchable(vegetarian) ? true : undefined,
            },
          }
        }
      }
    },
  })

  res.set('Access-Control-Allow-Origin', originUrl)
  res.send({
    body: await plans
  });
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

  const createdPlan = PlanAdder.createPlan(req.body.label, [parseInt(req.body.first), parseInt(req.body.second), parseInt(req.body.third)])
  const response = await createdPlan
  res.json(response)

})

router.post('/new/custom/', cors(), async (req, res) => {
  const singleMealCalories = req.body.calories / 3;
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

  res.set('Access-Control-Allow-Origin', originUrl)
  res.send({
    body: await responseBody
  });
})

module.exports = router