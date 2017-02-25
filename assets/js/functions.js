(function () {

  function initSidebar() {
    var sections = document.querySelectorAll('.ui-sidebar .ui-section');
    sections.forEach(initSidebarSection);
  }

  function initSidebarSection(section) {
    var hl = section.querySelector('h3');
    if (!section.classList.contains('is-active')) {
      section.classList.add('hidden');
    }
    hl.addEventListener('click', toggleSection);
  }

  function toggleSection(ev) {
    var hl = ev.target;
    hl.parentElement.classList.toggle('hidden');
  }

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

  initSidebar();
  removeLinkStylesOnLinksContainImages();

})();
