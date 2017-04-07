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
  const numOfSections = sectionKeys.filter(val => val.length > 1);

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
}

const applyBorderToHeadings = (sections) => {
  const colors = getColorsOfEachSection(sections);

  for (let i = 0; i < sections.length; i++) {
    const heading = sections[i].getElementsByTagName('h2');

    if (heading.length !== 0) {
      heading[0].style.borderBottom = `3px solid #${colors[i]}`;
    }
  }
}

const getColorsOfEachSection = (sections) => {
  const ids = Object.keys(sections);
  const hexValues = ids.filter(val => val.length > 1);
  const colors = hexValues.map(hex => hex.slice(1));
  
  return colors;
}

const addAnimationToInfoTips = () => {
  const infoTips = document.getElementsByClassName('infotip');
  const itKeys = Object.keys(infoTips)

  itKeys.forEach((val) => {
    const icon = infoTips[+val].childNodes[0];
    const details = infoTips[+val].childNodes[1];

    icon.onmouseenter = () => {
      details.style.opacity = '1';
    };

    icon.onmouseleave = () => {
      details.style.opacity = '0';
    }
  });
}

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

  nextBtn.onclick = () => {
    pagination.nextPage();
    setBackgroundColor(body, colorsWithHashes[pagination.currPage]);
    updateUIComponents(sections, pagination, nextBtn, prevBtn);
  }

  prevBtn.onclick = () => {
    pagination.prevPage();
    setBackgroundColor(body, colorsWithHashes[pagination.currPage]);
    updateUIComponents(sections, pagination, nextBtn, prevBtn);
  }
}

initialize();