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
        gte: req.params.calories-50,
        lte: parseInt(req.params.calories)+50,
      },
      carbs: {
        gte: req.params.carbs-10,
        lte: parseInt(req.params.carbs)+10,
      },
      protein: {
        gte: req.params.protein-10,
        lte: parseInt(req.params.protein)+10,
      },
      fat: {
        gte: req.params.fats-10,
        lte: parseInt(req.params.fats)+10,
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

module.exports = router