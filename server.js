const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const app = express()
app.use(bodyParser.urlencoded({ extended: true }));


// app.use(cors())
app.use(express.json())
// app.use(express.static("public"))

const welcomeRouter = require('./routes/welcome')

app.use('/welcome', welcomeRouter)

const planRouter = require('./routes/plans')

app.use('/plans', planRouter)


const recipeRouter = require('./routes/recipes')

app.use('/recipes', recipeRouter)

app.listen(process.env.PORT || 3000, 
	() => console.log("Server is running..."));



