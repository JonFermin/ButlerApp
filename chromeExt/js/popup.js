function httpGet(theUrl)
  {
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
      var url = tabs[0].url;
      var xmlHttp = new XMLHttpRequest();
      var opening = xmlHttp.open( "GET", "http://localhost:3000/" + "?var1=" + url, true ); // false for synchronous request
      xmlHttp.send(null);
      xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == XMLHttpRequest.DONE) {
          console.log("Writing Ingredient List to Extension");
          // console.log(JSON.parse(xmlHttp.responseText));
          $("#ingredientsList")[0].append(xmlHttp);
          return xmlHttp.responseText;
        }
      }
    });
  }




  document.addEventListener('DOMContentLoaded', function () {
    var el = document.getElementById("push");
    el.addEventListener('click', httpGet, false);
    // document.getElementById("ingredientsList").innerHTML = JSON.stringify(httpGet);
  });