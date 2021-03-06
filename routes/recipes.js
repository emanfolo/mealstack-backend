const express = require('express')
const router = express.Router()

const cors = require('cors')
router.use(cors())
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));



const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// Viewing all recipes from DB

router.get('/', cors(), async (req, res) => {

  const recipes = await prisma.recipe.findMany()

  res.json(recipes)

})

// Viewing specific recipe based on the id 

router.get('/:id', cors(), async (req, res) => {

  const recipe = await prisma.recipe.findUnique({
    where: {
      id: parseInt(req.param('id')),
    },
  })

  res.json(recipe)
})

router.post('/filter', cors(), async (req, res) => {

  const filteredRecipes = await prisma.recipe.findMany({
    where: {
      label: {
        contains: req.body.label,
        mode: 'insensitive',
      },
    },
    take: 20
  })


  res.json(filteredRecipes)

})

module.exports = router