var Butler = "butler";
var Ingredient = "ingredient";


function httpGet(theUrl){
  chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    var url = tabs[0].url;
    var xmlHttp = new XMLHttpRequest();
    var opening = xmlHttp.open( "POST", "https://butler-app-launch.herokuapp.com/", true ); // false for synchronous request
    xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    // chrome.storage.sync.get("butler", function(item) {
    //   xmlHttp.send(JSON.stringify(item));
    // } );

    console.log (tabs[0].url);
    try{
      xmlHttp.send(tabs[0].url);
    } catch (error) {
      console.error(error);
    }
    

    xmlHttp.onreadystatechange = function() {
      if (xmlHttp.readyState == XMLHttpRequest.DONE) {
        console.log("Writing Ingredient List to Extension");
        console.log (xmlHttp.responseText)
        saveToStorage({Ingredient: JSON.parse(xmlHttp.responseText)});
        chrome.storage.sync.get("butler", function(item) {
          if( !item["butler"] ) {
            item["butler"] = {}
          }
          item["butler"][url] = null;
          console.log(item);
          saveToStorage(item);
          console.log("Here:" + xmlHttp.responseText);
          
        } );
        chrome.storage.sync.get("Ingredient", function(item){
          console.log(item);
          item.Ingredient.forEach( function(object) {
            addToTable(object);
          })
        })
        return xmlHttp.responseText;
      }
    }
  });

}

function saveToStorage(value){
  if (!value){
    message('Error: No value specified');
    return;
  }
  console.log(value);
  chrome.storage.sync.set(value, function() {  });
} 

function storeIng(key, obj){
  var values = JSON.stringify(obj);
  localStorage.setItem(key,values);
} 



document.addEventListener('DOMContentLoaded', function () {
  var OnlyButton = document.getElementById("push");
  OnlyButton.addEventListener('click', httpGet, false);
  console.log(httpGet);
  // document.getElementById("ingredientsList").innerHTML = JSON.stringify(httpGet);
});

$('.table-remove').click(function () {
  chrome.storage.sync.get("Ingredient", function(item){
    item.forEach(function(element){
      if(this.textContent == element.ingredient){

      }
      console.log(element)
    })
  });
  $(this).parents('tr').detach();
});

function addToTable(object){
  $.each(object, function(index, jsonObject){     
    if(Object.keys(jsonObject).length > 0){
      var tableRow = '<tr>';
      $.each(Object.keys(jsonObject), function(i, key){
         tableRow += '<td contenteditable="true">' + jsonObject[key] + '</td>';
         // console.log(jsonObject[key])
      });
      tableRow += "<td><span class='table-remove'> X </span></td>"
      tableRow += "</tr>";
      $('#table tbody').append(tableRow);
      $('.table-remove').click(function () {
        $(this).parents('tr').detach();
      });
    }
  });
}


var $TABLE = $('#table');
var $BTN = $('#export-btn');
var $EXPORT = $('#export');



$('.table-add').click(function () {
  var $clone = $TABLE.find('tr.hide').clone(true).removeClass('hide table-line');
  $TABLE.find('table').append($clone);
});

$('.table-remove').click(function () {
  $(this).parents('tr').detach();
});

jQuery.fn.pop = [].pop;
jQuery.fn.shift = [].shift;

/*$BTN.click(function () {
  var $rows = $TABLE.find('tr:not(:hidden)');
  var headers = [];
  var data = [];
  
  // Get the headers (add special header logic here)
  $($rows.shift()).find('th:not(:empty)').each(function () {
    headers.push($(this).text().toLowerCase());
  });
  
  // Turn all existing rows into a loopable array
  $rows.each(function () {
    var $td = $(this).find('td');
    var h = {};
    
    // Use the headers from earlier to name our hash keys
    headers.forEach(function (header, i) {
      h[header] = $td.eq(i).text();   
    });
    
    data.push(h);
  });
  
  // Output the result
  // $EXPORT.text(JSON.stringify(data));
  // saveToStorage(data);
  chrome.runtime.sendMessage({ print: true, data: document });

}); */


// EXPORTING 


var getImageFromUrl = function(url, callback) {
    var img = new Image();

    img.onError = function() {
        alert('Cannot load image: "'+url+'"');
    };
    img.onload = function() {
        callback(img);
    };
    img.src = url;
}

var createPDF = function(imgData) {
    var doc = new jsPDF();

    // This is a modified addImage example which requires jsPDF 1.0+
    // You can check the former one at examples/js/basic.js

    doc.addImage(imgData, 'JPEG', 10, 10, 50, 50, 'monkey'); // Cache the image using the alias 'monkey'
    doc.addImage('monkey', 70, 10, 100, 120); // use the cached 'monkey' image, JPEG is optional regardless
    // As you can guess, using the cached image reduces the generated PDF size by 50%!

    // Rotate Image - new feature as of 2014-09-20
    doc.addImage({
        imageData : imgData,
        angle     : -20,
        x         : 10,
        y         : 78,
        w         : 45,
        h         : 58
    });

    // Output as Data URI
    doc.output('datauri');
}



$BTN.click(function(){
  var pdf = new jsPDF('p', 'pt', 'letter');
  pdf.setFont("Raleway");
    
    pdf.cellInitialize();
    pdf.setFontSize(12);

    $.each( $('#mainTable tr'), function (i, row){
        $.each( $(row).find("td, th"), function(j, cell){
          console.log(cell.innerText);
          var txt = $(cell).text().trim() || " ";
            var width = 210;
            // var width = (j==10) ? 40 : 70; //make with column smaller
            if (j == 4){
              width = 0;
            } else {
              width = 210
            }
            console.log(row)
            pdf.cell(0, 50, width, 30, txt, i);
        });
    });    
    getImageFromUrl('butler.png', createPDF);
    pdf.save('sample-file.pdf');
});



