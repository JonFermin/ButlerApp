var express = require('express');
var app = express();
var ingredients = require('recipe-ingredient-parser');
var str = '100 liters of white milk, 1 cup of water,  2 1/2 cups all-purpose flour'
var inputStr = str.split(',')
app.get('/', function (req, res) {
  res.send('Hello World!');
});
app.listen(3000, function () {
console.log(inputStr)
  console.log('Example app listening on port 3000!');
  for (i = 0; i < inputStr.length; i++) { 
    console.log(ingredients.parse(inputStr[i]))
	}
  
});