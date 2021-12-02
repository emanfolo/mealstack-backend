const express = require('express')
const router = express.Router()

const cors = require('cors')
router.use(cors())
const importedData = require("../data.json")

// Viewing static JSON recipes object

router.get('/', cors(), (req, res) => {

  res.send(importedData)

})

// Viewing specific recipe based on the id 

router.get('/:id', cors(), (req, res) => {

  let filteredRecipe = importedData.recipes.recipe.filter( result => result.recipe_id == req.param('id'))

  res.send(filteredRecipe)
})

module.exports = router