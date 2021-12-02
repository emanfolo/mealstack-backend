const express = require('express')
const router = express.Router()

const cors = require('cors')
router.use(cors())

// Homepage 

router.get('/', cors(), (req, res) => {

  res.send("Welcome to mealstack API!")

})


module.exports = router