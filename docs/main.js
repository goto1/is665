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

var createNavDotsForEachSection = function createNavDotsForEachSection(body, sections, colors, pagination, nextBtn, prevBtn) {
  var dots = document.getElementsByClassName('dots')[0];
  var sectionKeys = Object.keys(sections);
  var numOfSections = sectionKeys.filter(function (val) {
    return val.length > 2;
  });

  numOfSections.forEach(function (item, idx) {
    var dot = document.createElement('div');
    dot.className = 'dot';
    dot.onclick = function () {
      setBackgroundColor(body, colors[idx]);
      pagination.currPage = idx;
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
  for (var i = 0; i < pagination.currPage; i++) {
    sections[i].className = 'move-to-left';
  }

  for (var _i = pagination.currPage + 1; _i < sections.length; _i++) {
    sections[_i].className = 'move-to-right';
  }

  sections[pagination.currPage].className = 'active';
};

var getColorsOfEachSection = function getColorsOfEachSection(sections) {
  var ids = Object.keys(sections);
  var hexValues = ids.filter(function (val) {
    return val.length > 2;
  });
  var colors = hexValues.map(function (hex) {
    return hex.slice(1);
  });

  return colors;
};

var applyBorderToHeadings = function applyBorderToHeadings(sections) {
  var colors = getColorsOfEachSection(sections);

  for (var i = 0; i < sections.length; i++) {
    var heading = sections[i].getElementsByTagName('h2');

    if (heading.length !== 0) {
      heading[0].style.borderBottom = '3px solid #' + colors[i];
    }
  }
};

var addAnimationToInfoTips = function addAnimationToInfoTips() {
  var infoTips = document.getElementsByClassName('infotip');
  var itKeys = Object.keys(infoTips);

  itKeys.forEach(function (val) {
    var icon = infoTips[+val].childNodes[0];
    var details = infoTips[+val].childNodes[1];
    var text = details.childNodes[0];

    icon.onmouseenter = function () {
      details.style.opacity = '1';
      details.style.maxWidth = '700px';
      text.style.transitionDelay = '450ms';
      text.style.opacity = '1';
    };

    icon.onmouseleave = function () {
      details.style.opacity = '0';
      details.style.maxWidth = '0px';
      text.style.transitionDelay = '0ms';
      text.style.transitionDuration = '100ms';
      text.style.opacity = '0';
    };
  });
};

var createSlidesInsideSections = function createSlidesInsideSections(sections) {
  var secIDs = Object.keys(sections).filter(function (id) {
    return id.length > 2;
  });
  var leftBtn = createNavBtn('left');
  var rightBtn = createNavBtn('right');

  secIDs.forEach(function (id) {
    var slides = sections[id].getElementsByClassName('slide');

    if (slides.length !== 0) {
      var pagination = new Pagination(0, slides.length);
      var color = '#' + id.slice(1, id.length);

      sections[id].append(leftBtn);
      sections[id].append(rightBtn);

      hideInactiveSlides(slides, pagination.currPage);
      toggleSlideNavigation(pagination, leftBtn, rightBtn, color);

      leftBtn.onclick = function () {
        if (pagination.hasPrev()) {
          pagination.prevPage();
          hideInactiveSlides(slides, pagination.currPage);
        }
        toggleSlideNavigation(pagination, leftBtn, rightBtn, color);
      };
      rightBtn.onclick = function () {
        if (pagination.hasNext()) {
          pagination.nextPage();
          hideInactiveSlides(slides, pagination.currPage);
        }
        toggleSlideNavigation(pagination, leftBtn, rightBtn, color);
      };
    }
  });

  function toggleSlideNavigation(pagination, lBtn, rBtn, color) {
    lBtn.style.opacity = rBtn.style.opacity = '1';
    lBtn.style.color = rBtn.style.color = color;

    if (!pagination.hasPrev()) {
      lBtn.style.opacity = '0';
    }
    if (!pagination.hasNext()) {
      rBtn.style.opacity = '0';
    }
  }

  function hideInactiveSlides(slides, currSlide) {
    for (var i = 0; i < slides.length; i++) {
      if (i !== currSlide) {
        slides[i].className = 'slide slide-inactive';
      } else {
        slides[i].className = 'slide';
      }
    }
  }

  function createNavBtn(direction) {
    var btn = document.createElement('i');
    btn.className = 'fa fa-arrow-' + direction;

    return btn;
  }
};

var updateCounter = function updateCounter(pagination) {
  var counter = document.getElementsByClassName('page-counter')[0];
  var currPage = counter.getElementsByTagName('span')[0];
  var totPages = counter.getElementsByTagName('span')[1];

  currPage.innerHTML = pagination.currPage + 1;
  totPages.innerHTML = pagination.totalPages;
};

function initialize() {
  var body = document.getElementsByTagName('body')[0];
  var sections = document.getElementsByTagName('section');
  var navDots = document.getElementsByClassName('dots');
  var prevBtn = document.getElementsByTagName('button')[0];
  var nextBtn = document.getElementsByTagName('button')[1];
  var pagination = new Pagination(0, sections.length);
  var colors = getColorsOfEachSection(sections);
  var colorsWithHashes = colors.map(function (color) {
    return '#' + color;
  });

  setBackgroundColor(body, colorsWithHashes[pagination.currPage]);
  createNavDotsForEachSection(body, sections, colorsWithHashes, pagination, nextBtn, prevBtn);
  setCurrentlyActiveDot(pagination.currPage);
  updateNavigationButtons(nextBtn, prevBtn, pagination);
  displayCurrentSection(sections, pagination);
  applyBorderToHeadings(sections);
  addAnimationToInfoTips();
  createSlidesInsideSections(sections);
  updateCounter(pagination);

  nextBtn.onclick = function () {
    pagination.nextPage();
    setBackgroundColor(body, colorsWithHashes[pagination.currPage]);
    updateUIComponents(sections, pagination, nextBtn, prevBtn);
    updateCounter(pagination);
  };

  prevBtn.onclick = function () {
    pagination.prevPage();
    setBackgroundColor(body, colorsWithHashes[pagination.currPage]);
    updateUIComponents(sections, pagination, nextBtn, prevBtn);
    updateCounter(pagination);
  };
}

initialize();
//# sourceMappingURL=main.js.map
