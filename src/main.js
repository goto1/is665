/* global window, document */

'use strict';

function Pagination(currPage, totalPages) {
  this.currPage = currPage;
  this.totalPages = totalPages;
}
Pagination.prototype.hasNext = function() {
  return this.currPage < this.totalPages - 1;
}
Pagination.prototype.hasPrev = function() {
  return this.currPage > 0;
}
Pagination.prototype.nextPage = function() {
  if (this.hasNext()) {
    this.currPage++;
  }
}
Pagination.prototype.prevPage = function() {
  if (this.hasPrev()) {
    this.currPage--;
  }
}

const updateUIComponents = (sections, pagination, nextBtn, prevBtn) => {
  setCurrentlyActiveDot(pagination.currPage);
  updateNavigationButtons(nextBtn, prevBtn, pagination);
  displayCurrentSection(sections, pagination);
};

const setBackgroundColor = (body, color) => {
  body.bgColor = color;
};

const createNavDotsForEachSection = (body, sections, colors, pagination, nextBtn, prevBtn) => {
  const dots = document.getElementsByClassName('dots')[0];
  const sectionKeys = Object.keys(sections);
  const numOfSections = sectionKeys.filter(val => val.length > 2);

  numOfSections.forEach((item, idx) => {
    const dot = document.createElement('div');
    dot.className = 'dot';
    dot.onclick = () => {
      setBackgroundColor(body, colors[idx]);
      pagination.currPage = idx;
      updateUIComponents(sections, pagination, nextBtn, prevBtn);
    };
    dots.append(dot);
  });
}

const setCurrentlyActiveDot = (currentPage) => {
  const dots = document.getElementsByClassName('dots')[0].childNodes;
  const dotKeys = Object.keys(dots);

  dotKeys.forEach((id) => {
    dots[+id].className = 'dot';
  });
  dots[currentPage].className = 'dot active';
}

const updateNavigationButtons = (nextBtn, prevBtn, pagination) => {
  nextBtn.className = '';
  prevBtn.className = '';

  if (!pagination.hasPrev()) {
    prevBtn.className = 'btn-not-active';
  }

  if (!pagination.hasNext()) {
    nextBtn.className = 'btn-not-active';
  }
}

const displayCurrentSection = (sections, pagination) => {
  for (let i = 0; i < pagination.currPage; i++) {
    sections[i].className = 'move-to-left';
  }

  for (let i = pagination.currPage + 1; i < sections.length; i++) {
    sections[i].className = 'move-to-right';
  }

  sections[pagination.currPage].className = 'active';
};

const getColorsOfEachSection = (sections) => {
  const ids = Object.keys(sections);
  const hexValues = ids.filter(val => val.length > 2);
  const colors = hexValues.map(hex => hex.slice(1));

  return colors;
};

const applyBorderToHeadings = (sections) => {
  const colors = getColorsOfEachSection(sections);

  for (let i = 0; i < sections.length; i++) {
    const heading = sections[i].getElementsByTagName('h2');

    if (heading.length !== 0) {
      heading[0].style.borderBottom = `3px solid #${colors[i]}`;
    }
  }
};

const addAnimationToInfoTips = () => {
  const infoTips = document.getElementsByClassName('infotip');
  const itKeys = Object.keys(infoTips);

  itKeys.forEach((val) => {
    const icon = infoTips[+val].childNodes[0];
    const details = infoTips[+val].childNodes[1];
    const text = details.childNodes[0];

    icon.onmouseenter = () => {
      details.style.opacity = '1';
      details.style.maxWidth = '700px';
      text.style.transitionDelay = '450ms';
      text.style.opacity = '1';
    };

    icon.onmouseleave = () => {
      details.style.opacity = '0';
      details.style.maxWidth = '0px';
      text.style.transitionDelay = '0ms';
      text.style.transitionDuration = '100ms';
      text.style.opacity = '0';
    };
  });
};

const createSlidesInsideSections = (sections) => {
  const secIDs = Object.keys(sections).filter(id => id.length > 2);

  secIDs.forEach((id) => {
    const slides = sections[id].getElementsByClassName('slide');
    const leftBtn = createNavBtn('left');
    const rightBtn = createNavBtn('right');

    if (slides.length !== 0) {
      const pagination = new Pagination(0, slides.length);
      const color = `#${id.slice(1, id.length)}`;

      sections[id].append(leftBtn);
      sections[id].append(rightBtn);

      hideInactiveSlides(slides, pagination.currPage);
      toggleSlideNavigation(pagination, leftBtn, rightBtn, color);

      leftBtn.onclick = () => {
        if (pagination.hasPrev()) {
          pagination.prevPage();
          hideInactiveSlides(slides, pagination.currPage);
        }
        toggleSlideNavigation(pagination, leftBtn, rightBtn, color);
      };
      rightBtn.onclick = () => {
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

    if (!pagination.hasPrev()) { lBtn.style.opacity = '0'; }
    if (!pagination.hasNext()) { rBtn.style.opacity = '0'; }
  }

  function hideInactiveSlides(slides, currSlide) {
    for (let i = 0; i < slides.length; i++) {
      if (i !== currSlide) {
        slides[i].className = 'slide slide-inactive';
      } else {
        slides[i].className = 'slide';
      }
    }
  }

  function createNavBtn(direction) {
    const btn = document.createElement('i');
    btn.className = `fa fa-arrow-${direction}`;

    return btn;
  }
};

const updateCounter = (pagination) => {
  const counter = document.getElementsByClassName('page-counter')[0];
  const currPage = counter.getElementsByTagName('span')[0];
  const totPages = counter.getElementsByTagName('span')[1];

  currPage.innerHTML = pagination.currPage + 1;
  totPages.innerHTML = pagination.totalPages;
};

function initialize() {
  const body = document.getElementsByTagName('body')[0];
  const sections = document.getElementsByTagName('section');
  const navDots = document.getElementsByClassName('dots');
  const prevBtn = document.getElementsByTagName('button')[0];
  const nextBtn = document.getElementsByTagName('button')[1];
  const pagination = new Pagination(0, sections.length);
  const colors = getColorsOfEachSection(sections);
  const colorsWithHashes = colors.map(color => `#${color}`);

  setBackgroundColor(body, colorsWithHashes[pagination.currPage]);
  createNavDotsForEachSection(body, sections, colorsWithHashes, pagination, nextBtn, prevBtn);
  setCurrentlyActiveDot(pagination.currPage);
  updateNavigationButtons(nextBtn, prevBtn, pagination);
  displayCurrentSection(sections, pagination);
  applyBorderToHeadings(sections);
  addAnimationToInfoTips();
  createSlidesInsideSections(sections);
  updateCounter(pagination);

  nextBtn.onclick = () => {
    pagination.nextPage();
    setBackgroundColor(body, colorsWithHashes[pagination.currPage]);
    updateUIComponents(sections, pagination, nextBtn, prevBtn);
    updateCounter(pagination);
  }

  prevBtn.onclick = () => {
    pagination.prevPage();
    setBackgroundColor(body, colorsWithHashes[pagination.currPage]);
    updateUIComponents(sections, pagination, nextBtn, prevBtn);
    updateCounter(pagination);
  }
}

initialize();
