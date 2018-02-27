var spawn = require("child_process").spawn;
// node package for running python script
var url = 'http://allrecipes.com/recipe/79543/fried-rice-restaurant-style/';
// example url
var pythonProcess = spawn('python3.5',["../recipe-scrapers/run.py", url]);
var express = require('express');
// create server using express
var app = express();
var ingredients = require('recipe-ingredient-parser');
//node package for ingredient grabber
var str = '100 liters of white milk, 1 cup of water,  2 1/2 cups all-purpose flour'
var inputStr = str.split(',')

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function (req, res) { // req is object containing information about the HTTP request
								   // res is used to send back the desired HTTP response
	var spawn = require("child_process").spawn;
	var url = req.query.var1;
	var pythonProcess = spawn('python3.5',["../recipe-scrapers/run.py", url]);
 	pythonProcess.stdout.on('data', function (data){
	// Do something with the data returned from python script
		var arr = JSON.stringify(data.toString('utf8'),null,2).replace(']\\n"','').replace("'\\'","");
		var arr2 = data.toString('utf8');

		//Python provides string array of ingredients
		//String array converted to a string, then parsed and converted to JSON

		var arrSplit = arr.split(',')
		var concatstring = "";
		for (i = 4; i < arrSplit.length; i++) {
			var string = arrSplit[i].replace(" \'",'').replace("''","").replace("\\","").replace(" ", "").replace("\'","");
    		concatstring = concatstring + JSON.stringify(ingredients.parse(string));
		}
		console.log("ping!!!")
		res.send(concatstring)

	});
});

app.listen(3000, function () {
    pythonProcess.stdout.on('data', function (data){
	// Do something with the data returned from python script
		console.log("I'm here");
		var arr = JSON.stringify(data.toString('utf8'),null,2).replace(']\\n"','').replace("'\\'","");
		var arr2 = data.toString('utf8');
		var arrSplit = arr.split(',')
		console.log(arr);

	});
});