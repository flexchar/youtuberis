/*
 * Links with anchor for headers
 * based upon solution found at
 * https://github.com/gohugoio/hugoDocs/blob/master/themes/gohugoioTheme/src/js/anchorforid.js
 */
var anchorForId = function (id) {
  var anchor = document.createElement("a");
  anchor.href = "#" + id;
  return anchor;
};

var linkifyAnchors = function (level, containingElement) {
  var headers = containingElement.getElementsByTagName("h" + level);
  for (var h = 0; h < headers.length; h++) {
    var header = headers[h];

    if (typeof header.id !== "undefined" && header.id !== "") {
      header.prepend(anchorForId(header.id));
      header.className = 'is-anchor-link';
    }
  }
};

document.onreadystatechange = function () {
  if (this.readyState === "complete") {
    var contentBlock = document.getElementsByClassName("content")[0]
    if (!contentBlock) {
      return;
    }
    for (var level = 2; level <= 2; level++) {
      linkifyAnchors(level, contentBlock);
    }
  }
};
