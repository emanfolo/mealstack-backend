const express = require('express');
const cors = require('cors')
const app = express()

const axios = require('axios');

const path = require('path');

app.use(cors())
app.use(express.json())
app.use(express.static("public"))



app.set('view engine', 'ejs')


let authCode = 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjYwNzdBNzkyMERFNDM1NDQ5QkUxNEEwNTI5QkZFNjQxNUEzOTZFRjgiLCJ0eXAiOiJhdCtqd3QiLCJ4NXQiOiJZSGVua2cza05VU2I0VW9GS2JfbVFWbzVidmcifQ.eyJuYmYiOjE2MzgyMDI0NzUsImV4cCI6MTYzODI4ODg3NSwiaXNzIjoiaHR0cHM6Ly9vYXV0aC5mYXRzZWNyZXQuY29tIiwiYXVkIjoiYmFzaWMiLCJjbGllbnRfaWQiOiIxYWE0MTJiYzE4OWY0NTEyOWUwNjVmOTFjYTA1MzI4MyIsInNjb3BlIjpbImJhc2ljIl19.T4j0BH0-FqMqJgJ57Dy2fB62qT9rv0YjDg6Faw7xkpc0HpreEgoBRxGHUsBZRL5fsN_EyAgu9r6X2J241PAcAnSpDPgVjyo6AB_kf-venSL-_GGoLtQfyA9YNgSzpCTOL3GNGiWjko_cdOxJBZIzb0XA5iwfb6_7MGfwlWj3XVulRRKkC70Q0T6dvrprPqWOdRdGRp3Se4SsiTI9IYR08npQNuW0ueXrZPwXyztb7UkQg5BmdfLlCl_hIDI0F2l0LzvoQYl6bxYfDdEOcYDm4tCIOUTmTQTMLJztNDnl3ESsdKhHu_-bOB4n3OByZmt1dEOf574I4T2qYMG6SW6tVvxgKHcQMkXfE9dPSRD1sw5vg-WW0I7KqByNhfoiEImDFOUBO0EDDSqK0LCh-xLV0aP_BLkhMQZYUKzBTCD9iJM26GkmoJLLawa9djQFsBPR_8tb5ll0O-XsfB4d-R7WSDOM0rhoJZ_w_UDJCJVJV5YRMyL9gXJBBYhPck2FBycFPULl6cSkluhOUtRL4AWgBlKX4NSKMVrYuBWcohWXlA6kxaoJN44Vx3t7bhc9roTWcx0hgNAxhM7mjlMtcGkWoK9dc9-XlnMSHw7rwxeKrDDP9r-oVHDALKKvQrGQyONSuKP0dJu1yn9QMbLYWZ7aza6-NgHQLawfpyRE7xLgH68'


app.get('/', cors(), (req, res) => {

  async function getRecipes() {
    const apiURL = 'https://platform.fatsecret.com/rest/server.api?Content-Type=application/json&method=recipe.get&format=json&recipe_id=45647'
    
    axios.get(apiURL, {
      headers : {
        'Authorization' : authCode
      }
    })
    .then(function(response) {
      console.log(response)
      passedInObject = response
    })
    .catch(function(error) {
      console.log(error)
    })
  }
  
  getRecipes()

})

app.listen(process.env.PORT || 3000, 
	() => console.log("Server is running..."));



