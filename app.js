function resizeWindow() {
  window.setTimeout(function() {
    chrome.tabs.getCurrent(function (tab) {
      var newHeight = Math.min(document.body.offsetHeight + 140, 700);
      chrome.windows.update(tab.windowId, {
        height: newHeight,
        width: 520
      });
    });
  }, 150);
};

function renderTags(res) {
  var divloader = document.querySelector('#loader');
  var divoutput = document.querySelector('#output');
  divloader.style.display = "none";
  divoutput.style.display = "block";

  if(res.error) {

  }

  var table = document.getElementById("table");
  res.labels.forEach(function(val){
    var row = table.insertRow(-1);
    row.insertCell(0).innerHTML = val.label;
    row.insertCell(1).innerHTML = val.probability;
  });


};

function renderUrl(url) {
  var divurl = document.querySelector('#url');
  var urltext = (url.length < 45) ? url : url.substr(0, 42) + '...';
  var anchor = document.createElement('a');
  anchor.href = url;
  anchor.innerText = urltext;
  divurl.appendChild(anchor);
};

function renderThumbnail(url) {
  var canvas = document.querySelector('#thumbnail');
  var context = canvas.getContext('2d');

  canvas.width = 100;
  canvas.height = 100;

  var image = new Image();
  image.addEventListener('load', function() {
    var src_w = image.width;
    var src_h = image.height;
    var new_w = canvas.width;
    var new_h = canvas.height;
    var ratio = src_w / src_h;
    if (src_w > src_h) {
      new_h /= ratio;
    } else {
      new_w *= ratio;
    }
    canvas.width = new_w;
    canvas.height = new_h;
    context.drawImage(image, 0, 0, src_w, src_h, 0, 0, new_w, new_h);
  });
  image.src = url;
};

function callAPI(imageUrl) {
  var url = "https://marin-basic.com/api/ml/recognize?url="+imageUrl;
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", url, false);
  xmlHttp.send(null);
  return JSON.parse(xmlHttp.responseText);
}

document.addEventListener("DOMContentLoaded", function () {
  var imageUrl = window.location.hash.substring(1);
  if (imageUrl) {
    var response = callAPI(imageUrl);
    renderUrl(imageUrl);
    renderThumbnail(imageUrl);
    renderTags(response);
    resizeWindow();
  }
});
