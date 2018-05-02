function httpGet(theUrl){
  chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    var url = tabs[0].url;
    var xmlHttp = new XMLHttpRequest();
    var opening = xmlHttp.open( "POST", "https://butler-app-launch.herokuapp.com/", true ); // false for synchronous request
    xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlHttp.send(tabs[0].url);
    xmlHttp.onreadystatechange = function() {
      if (xmlHttp.readyState == XMLHttpRequest.DONE) {
        console.log("Writing Ingredient List to Extension");
        console.log (xmlHttp.responseText)
        addToTable(JSON.parse(xmlHttp.responseText))
        return xmlHttp.responseText;
      }
    }
  });