(function () {

  var search_index,
    document_index;

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

  function initSearch() {
    var inp = document.querySelector('input#search');
    inp.addEventListener('keypress', function(ev) {
      if (ev.keyCode === 13) {
        doSearch(inp.value);
      }
    });
  }

  function doSearch(val) {
    if (search_index) {
      showSearchResults(val);
    }

    loadSearchIndex(val);
  }

  function showSearchResults(val) {
    var results = search_index.search(val);

    hideDocumentBody();
    emptySearchResults();
    buildSearchResults(val, results);

  }

  function hideDocumentBody() {
    document.querySelector('.ui-body').classList.add('is-hidden');
  }

  function showDocumentBody() {
    document.querySelector('.ui-body').classList.remove('is-hidden');
  }

  function emptySearchResults() {
    var holder = document.querySelector('.ui-search-results');
    while (holder.firstChild) {
      holder.removeChild(holder.firstChild);
    }
  }

  function buildSearchResults(query, results) {
    var holder = document.querySelector('.ui-search-results'),
      header,
      btn,
      hl,
      ul;

    header = document.createElement('div');
    header.classList.add('ui-header');
    btn = document.createElement('a');
    btn.textContent = 'back';
    btn.setAttribute('href', '#');
    btn.addEventListener('click', cancelSearch);
    header.appendChild(btn);

    hl = document.createElement('h1');
    hl.textContent = 'Search results: ' + query;

    ul = document.createElement('ul');

    results.forEach(function(result) {
      var li = document.createElement('li'),
        a = document.createElement('a'),
        doc = document_index[result.ref];

      a.textContent = doc;
      a.setAttribute('href', window.rootPath + result.ref);

      li.appendChild(a);
      ul.appendChild(li);
    });

    holder.appendChild(header);
    holder.appendChild(hl);
    holder.appendChild(ul);
  }

  function cancelSearch(ev) {
    ev.preventDefault();
    emptySearchResults();
    showDocumentBody();
  }

  function loadSearchIndex(val) {
    fetch(window.rootPath + 'lunr_index.json').then(function(r) {
      return r.text();
    }).then(function(text) {
      initIndex(JSON.parse(text));
      showSearchResults(val);
    });
  }

  function initIndex(data) {
    search_index = lunr(function() {
      this.ref('id');
      this.field('title');
      this.field('text');

      data.forEach(
        function(doc) {
          this.add(doc);
        },
        this
      );
    });

    // Build document index.
    document_index = [];
    data.forEach(function(doc) {
      document_index[doc.id] = doc.title;
    });
  }

  initSidebar();
  removeLinkStylesOnLinksContainImages();
  initSearch();

})();
