var Butler = "butler";

function httpGet(theUrl){
  chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    var url = tabs[0].url;
    var xmlHttp = new XMLHttpRequest();
    var opening = xmlHttp.open( "POST", "http://localhost:3000/", true ); // false for synchronous request
    xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    chrome.storage.sync.get("butler", function(item) {
      xmlHttp.send(JSON.stringify(item));
    } );

    xmlHttp.onreadystatechange = function() {
      if (xmlHttp.readyState == XMLHttpRequest.DONE) {
        console.log("Writing Ingredient List to Extension");
        // console.log(JSON.parse(xmlHttp.responseText));
        // $("#ingredientsList")[0].append(xmlHttp.responseText);
        chrome.storage.sync.get("butler", function(item) {
          if( !item["butler"] ) {
            item["butler"] = {}
          }
          item["butler"][url] = null;
          console.log(item);
          saveToStorage(item);
        } );
        addToTable(JSON.parse(xmlHttp.responseText));
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
  chrome.storage.sync.set(value)
} 


document.addEventListener('DOMContentLoaded', function () {
  var OnlyButton = document.getElementById("push");
  OnlyButton.addEventListener('click', httpGet, false);
  console.log(httpGet);
  // document.getElementById("ingredientsList").innerHTML = JSON.stringify(httpGet);
});


var object = [
  {
    "Ingredient": 1,
    "Quantity": "rooter",
    "Unit": "12345",
  },
];

function addToTable(object){
  // $('#mainTable').append('<table id="jsonTable"><thead><tr></tr></thead><tbody></tbody></table>');
  
  // $.each(Object.keys(object[0]), function(index, key){
  //   $('#mainTable thead tr').append('<th>' + key + '</th>');
  // }); 
  $.each(object, function(index, jsonObject){     
    if(Object.keys(jsonObject).length > 0){
      var tableRow = '<tr>';
      $.each(Object.keys(jsonObject), function(i, key){
         tableRow += '<td contenteditable="true">' + jsonObject[key] + '</td>';
         console.log(jsonObject[key])
      });
      tableRow += "<td><span class='table-remove'> X </span></td>"
      tableRow += "</tr>";
      $('#table tbody').append(tableRow);
    }
  });
}

// $(document).ready(function(){
//   addToTable();
// });

// https://stackoverflow.com/questions/42558090/how-to-create-html-table-based-on-json

