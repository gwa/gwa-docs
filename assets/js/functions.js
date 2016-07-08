(function () {

  function removeLinkStylesOnLinksContainImages() {
    var i, l, item,
      anchors = document.getElementsByTagName('a');

    for (i = 0, l = anchors.length; i < l; i++) {
      item = anchors[i];
      if (item.childNodes.length === 1 && item.childNodes[0].nodeName.toLowerCase() === 'img') {
        item.className += 'has-image';
      }
    }
  }

  removeLinkStylesOnLinksContainImages();

})();
