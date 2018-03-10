var Butler = "butler";

function httpGet(theUrl){
  chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    var url = tabs[0].url;
    var xmlHttp = new XMLHttpRequest();
    var opening = xmlHttp.open( "POST", "http://localhost:3000/" + "?var1=" + url, true ); // false for synchronous request
    xmlHttp.send(null);
    xmlHttp.onreadystatechange = function() {
      if (xmlHttp.readyState == XMLHttpRequest.DONE) {
        console.log("Writing Ingredient List to Extension");
        // console.log(JSON.parse(xmlHttp.responseText));
        $("#ingredientsList")[0].append(xmlHttp.responseText);
        chrome.storage.sync.get("butler", function(item) {
          if( !item["butler"] ) {
            item["butler"] = {}
          }
          item["butler"][url] = null
          console.log(item);
          saveToStorage(item);
        } );
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
  var el = document.getElementById("push");
  el.addEventListener('click', httpGet, false);
  // document.getElementById("ingredientsList").innerHTML = JSON.stringify(httpGet);
});