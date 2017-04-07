/* global window, document */

'use strict';

function Pagination(currPage, totalPages) {
  this.currPage = currPage;
  this.totalPages = totalPages;
}
Pagination.prototype.hasNext = function () {
  return this.currPage < this.totalPages - 1;
};
Pagination.prototype.hasPrev = function () {
  return this.currPage > 0;
};
Pagination.prototype.nextPage = function () {
  if (this.hasNext()) {
    this.currPage++;
  }
};
Pagination.prototype.prevPage = function () {
  if (this.hasPrev()) {
    this.currPage--;
  }
};

var updateUIComponents = function updateUIComponents(sections, pagination, nextBtn, prevBtn) {
  setCurrentlyActiveDot(pagination.currPage);
  updateNavigationButtons(nextBtn, prevBtn, pagination);
  displayCurrentSection(sections, pagination);
};

var setBackgroundColor = function setBackgroundColor(body, color) {
  body.bgColor = color;
};

var createNavDotsForEachSection = function createNavDotsForEachSection(sections, colors, pagination) {
  var dots = document.getElementsByClassName('dots')[0];
  var sectionKeys = Object.keys(sections);
  var numOfSections = sectionKeys.filter(function (val) {
    return val.length > 1;
  });

  numOfSections.forEach(function () {
    var dot = document.createElement('div');
    dot.className = 'dot';
    dot.onclick = function () {
      setBackgroundColorTo(colors[i]);
      pagination.currPage = i;
      updateUIComponents(sections, pagination, nextBtn, prevBtn);
    };
    dots.append(dot);
  });
};

var setCurrentlyActiveDot = function setCurrentlyActiveDot(currentPage) {
  var dots = document.getElementsByClassName('dots')[0].childNodes;
  var dotKeys = Object.keys(dots);

  dotKeys.forEach(function (id) {
    dots[+id].className = 'dot';
  });
  dots[currentPage].className = 'dot active';
};

var updateNavigationButtons = function updateNavigationButtons(nextBtn, prevBtn, pagination) {
  nextBtn.className = '';
  prevBtn.className = '';

  if (!pagination.hasPrev()) {
    prevBtn.className = 'btn-not-active';
  }

  if (!pagination.hasNext()) {
    nextBtn.className = 'btn-not-active';
  }
};

var displayCurrentSection = function displayCurrentSection(sections, pagination) {
  for (var _i = 0; _i < pagination.currPage; _i++) {
    sections[_i].className = 'move-to-left';
  }

  for (var _i2 = pagination.currPage + 1; _i2 < sections.length; _i2++) {
    sections[_i2].className = 'move-to-right';
  }

  sections[pagination.currPage].className = 'active';
};

var applyBorderToHeadings = function applyBorderToHeadings(sections) {
  var colors = getColorsOfEachSection(sections);

  for (var _i3 = 0; _i3 < sections.length; _i3++) {
    var heading = sections[_i3].getElementsByTagName('h2');

    if (heading.length !== 0) {
      heading[0].style.borderBottom = '3px solid #' + colors[_i3];
    }
  }
};

var getColorsOfEachSection = function getColorsOfEachSection(sections) {
  var ids = Object.keys(sections);
  var hexValues = ids.filter(function (val) {
    return val.length > 1;
  });
  var colors = hexValues.map(function (hex) {
    return hex.slice(1);
  });

  return colors;
};

var addAnimationToInfoTips = function addAnimationToInfoTips() {
  var infoTips = document.getElementsByClassName('infotip');
  var itKeys = Object.keys(infoTips);

  itKeys.forEach(function (val) {
    var icon = infoTips[+val].childNodes[0];
    var details = infoTips[+val].childNodes[1];

    icon.onmouseenter = function () {
      details.style.opacity = '1';
    };

    icon.onmouseleave = function () {
      details.style.opacity = '0';
    };
  });
};

function initialize() {
  var body = document.getElementsByTagName('body')[0];
  var sections = document.getElementsByTagName('section');
  var navDots = document.getElementsByClassName('dots');
  var prevBtn = document.getElementsByTagName('button')[0];
  var nextBtn = document.getElementsByTagName('button')[1];
  var colors = getColorsOfEachSection(sections);
  var pagination = new Pagination(0, sections.length);

  setBackgroundColor(body, colors[pagination.currPage]);
  createNavDotsForEachSection(sections, colors, pagination);
  setCurrentlyActiveDot(pagination.currPage);
  updateNavigationButtons(nextBtn, prevBtn, pagination);
  displayCurrentSection(sections, pagination);
  applyBorderToHeadings(sections);
  addAnimationToInfoTips();

  nextBtn.onclick = function () {
    pagination.nextPage();
    setBackgroundColor(body, colors[pagination.currPage]);
    updateUIComponents(sections, pagination, nextBtn, prevBtn);
  };

  prevBtn.onclick = function () {
    pagination.prevPage();
    setBackgroundColor(body, colors[pagination.currPage]);
    updateUIComponents(sections, pagination, nextBtn, prevBtn);
  };
}

initialize();
//# sourceMappingURL=main.js.map
