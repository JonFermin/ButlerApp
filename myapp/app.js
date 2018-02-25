var spawn = require("child_process").spawn;
//var url = 'http://allrecipes.com/Recipe/Apple-Cake-Iv/Detail.aspx';
var url = 'http://allrecipes.com/recipe/79543/fried-rice-restaurant-style/';
var pythonProcess = spawn('python3.6',["../recipe-scrapers/run.py", url]);


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
  
  pythonProcess.stdout.on('data', function (data){
	// Do something with the data returned from python script
		console.log("I'm here");
		var arr = JSON.stringify(data.toString('utf8'),null,2).replace(']\\n"','').replace("'\\'","");
		var arr2 = data.toString('utf8');
		var arrSplit = arr.split(',')

		console.log(arrSplit[7])


// ' \'4 teaspoons ground cinnamon\''
		//jsonObj = JSON.parse(data.toString('utf8'))
		//console.log(jsonObj[0])
		//console.log(JSON.stringify(data.toString('utf8')))
		for (i = 4; i < arrSplit.length; i++) {
			var string = arrSplit[i].replace(" \'",'').replace("''","").replace("\\","").replace(" ", "").replace("\'","");
    		//console.log(ingredients.parse(arrSplit[i]));
    		console.log(ingredients.parse(string));

    		/*if (i==5){
    			console.log(arrSplit[i]);
    		}*/

		}
	});
  /*
  for (i = 0; i < inputStr.length; i++) { 
    console.log(ingredients.parse(inputStr[i]))
	}*/
  
});