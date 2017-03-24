'use strict';

/* global window, document */

function createLink(href, innerHTML, className) {
  var link = document.createElement('a');
  link.href = '#' + href;
  link.innerHTML = innerHTML;
  link.className = className;

  link.onclick = function () {
    document.querySelector('[id="' + href + '"]').scrollIntoView({ behavior: 'smooth' });
  };

  return link;
}

function createBottomPaginationFor(sections) {
  for (var i = 0; i < sections.length; i++) {
    var btnWrap = sections[i].getElementsByClassName('btn-wrap')[0];

    if (i === 0) {
      btnWrap.appendChild(createLink(sections[i + 1].id, 'Next &#8594;', 'btn btn-next'));
    } else if (i === sections.length - 1) {
      btnWrap.appendChild(createLink(sections[i - 1].id, '&#8592; Previous', 'btn btn-prev'));
    } else {
      btnWrap.appendChild(createLink(sections[i - 1].id, '&#8592; Previous', 'btn btn-prev'));
      btnWrap.appendChild(createLink(sections[i + 1].id, 'Next &#8594;', 'btn btn-next'));
    }
  }
}

function createLinkForSideNavigation(href) {
  var link = document.createElement('a');

  link.href = '#' + href;

  return link;
}

function createSidePaginationFor(sections) {
  var pager = document.getElementById('pager');

  var _loop = function _loop(i) {
    var listItem = document.createElement('li');
    listItem.appendChild(createLinkForSideNavigation(sections[i].id));
    pager.appendChild(listItem);

    listItem.onclick = function () {
      document.querySelector('[id="' + sections[i].id + '"]').scrollIntoView({ behavior: 'smooth' });
    };
  };

  for (var i = 0; i < sections.length; i++) {
    _loop(i);
  }
}

function removeActiveClassFromList() {
  var pager = document.getElementById('pager');

  for (var i = 0; i < pager.children.length; i++) {
    pager.children[i].className = '';
  }
}

window.onload = function init() {
  var sections = document.getElementsByTagName('section');
  var pager = document.getElementById('pager');
  var sectionsPositions = [];

  createBottomPaginationFor(sections);
  createSidePaginationFor(sections);

  for (var i = 0; i < sections.length; i++) {
    var pos = sections[i].getBoundingClientRect();
    sectionsPositions.push(pos.top);
  }

  pager.children[0].className = 'active';

  window.onscroll = function () {
    var found = sectionsPositions.find(function (sectionPosition) {
      return sectionPosition === window.scrollY;
    });

    if (found >= 0) {
      var idx = sectionsPositions.indexOf(found);
      var listItems = pager.children;

      removeActiveClassFromList();

      listItems[idx].className = 'active';
    }
  };
};
//# sourceMappingURL=main.js.map
