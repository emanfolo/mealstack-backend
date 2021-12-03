const express = require('express')
const router = express.Router()

const cors = require('cors')
router.use(cors())

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// Viewing all recipes from DB

router.get('/', cors(), (req, res) => {

  const recipes = await prisma.recipe.findMany()

  res.json(recipes)

})

// Viewing specific recipe based on the id 

router.get('/:id', cors(), (req, res) => {

  const recipe = await prisma.recipe.findUnique({
    where: {
      id: parseInt(req.param('id')),
    },
  })

  res.json(recipe)
})

module.exports = router