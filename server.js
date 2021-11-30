const express = require('express');
const cors = require('cors')
const app = express()

const path = require('path');

app.use(cors())
app.use(express.json())
app.use(express.static("public"))


app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html')

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(process.env.PORT || 3000, 
	() => console.log("Server is running..."));
/*
let allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', "*");
    next();
}
app.use(allowCrossDomain);
*/
