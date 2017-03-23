'use strict';

/* global window, document */

function getAllSections() {
  return document.getElementsByTagName('section');
}

function createLink(href, innerHTML, className) {
  var link = document.createElement('a');
  link.href = '#' + href;
  link.innerHTML = innerHTML;
  link.className = className;

  link.onclick = function (event) {
    document.querySelector('[id="' + href + '"]').scrollIntoView({ behavior: 'smooth' });
  };

  return link;
}

function createBottomPaginationFor(sections) {
  for (var i = 0; i < sections.length; i++) {
    var btnWrap = sections[i].getElementsByClassName('btn-wrap')[0];
    var curr = i + 1;

    if (i === 0) {
      btnWrap.appendChild(createLink(curr + 1, 'Next &#8594;', 'btn btn-next'));
    } else if (i === sections.length - 1) {
      btnWrap.appendChild(createLink(curr - 1, '&#8592; Previous', 'btn btn-prev'));
    } else {
      btnWrap.appendChild(createLink(curr - 1, '&#8592; Previous', 'btn btn-prev'));
      btnWrap.appendChild(createLink(curr + 1, 'Next &#8594;', 'btn btn-next'));
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
    var curr = i + 1;
    var listItem = document.createElement('li');

    listItem.appendChild(createLinkForSideNavigation(curr));
    pager.appendChild(listItem);

    listItem.onclick = function () {
      document.querySelector('[id="' + curr + '"]').scrollIntoView({ behavior: 'smooth' });
    };
  };

  for (var i = 0; i < sections.length; i++) {
    _loop(i);
  }
}

window.onload = function init() {
  var sections = getAllSections();
  var sectionsPositions = [];
  var pager = document.getElementById('pager');

  createBottomPaginationFor(sections);
  createSidePaginationFor(sections);

  for (var i = 0; i < sections.length; i++) {
    var pos = sections[i].getBoundingClientRect();
    sectionsPositions.push(pos.top);
  }

  pager.children[0].className = 'active';

  window.onscroll = function () {

    var found = sectionsPositions.find(function (sectionPosition) {
      return sectionPosition === window.pageYOffset;
    });

    if (found >= 0) {
      var idx = sectionsPositions.indexOf(found);
      var listItems = pager.children;

      for (var _i = 0; _i < pager.children.length; _i++) {
        pager.children[_i].className = '';
      }

      listItems[idx].className = 'active';
    }
  };
};
//# sourceMappingURL=main.js.map
