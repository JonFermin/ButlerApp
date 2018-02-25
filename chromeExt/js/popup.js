function httpGet(theUrl)
  {

    var xmlHttp = new XMLHttpRequest();
    // if ("withCredentials" in xhr){
    //     xmlHttp.open(method, url, true)
    // }
    xmlHttp.open( "GET", "http://10.203.148.230:3000/" + "?var1=http://allrecipes.com/recipe/79543/fried-rice-restaurant-style/", true ); // false for synchronous request
    xmlHttp.send( "http://allrecipes.com/recipe/79543/fried-rice-restaurant-style/" );
    console.log(JSON.stringify(xmlHttp.responseText));
    return xmlHttp.responseText;

  }
  document.addEventListener('DOMContentLoaded', function () {
    var el = document.getElementById("push");
    el.addEventListener('click', httpGet, false);
  });


// chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
//     var url = tabs[0].url;
// });
// console.log(url);


// function hello() {
//   chrome.tabs.executeScript({
//     file: 'alert.js'
//   }); 
// }

// document.getElementById('clickme').addEventListener('click', hello());
