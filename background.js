function getClickHandler() {
  return function(info, tab) {
    var url = 'main.html#' + info.srcUrl;
    chrome.windows.create({ url: url, width: 520, height: 660 });
  };
};

chrome.contextMenus.create({
  "title" : "Find tags",
  "type" : "normal",
  "contexts" : ["image"],
  "onclick" : getClickHandler()
});
