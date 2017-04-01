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

// '#F35138', '#CC1FCB', '#FFB040', '#FF5A59', '#33FFE1', '#FF6F33', '#FF8873'

const colors = [
  '#FF4040', '#5BCC1F', '#40B5FF', '#B273FF', 
  '#FF8873', '#2EE5CA'
];
const body = document.getElementsByTagName('body')[0];
const buttons = document.getElementsByTagName('button');
const dots = document.getElementsByClassName('dots');
const pagination = new Pagination(4, colors.length);
const nextPageBtn = buttons[1];
const prevPageBtn = buttons[0];
const sections = document.getElementsByTagName('section');

function showCurrentSection() {
  for (let i = 0; i < pagination.currPage; i++) {
    sections[i].className = 'move-to-left';
  }
  for (let i = pagination.currPage + 1; i < sections.length; i++) {
    sections[i].className = 'move-to-right';
  }
  sections[pagination.currPage].className = 'active';
}

nextPageBtn.onclick = () => {
  pagination.nextPage();
  setBodyBgColorTo(colors[pagination.currPage]);
  updateUI();
};

prevPageBtn.onclick = () => {
  pagination.prevPage();
  setBodyBgColorTo(colors[pagination.currPage]);
  updateUI();
};

function createNavDots() {
  const dots = document.getElementsByClassName('dots')[0];

  for (let i = 0; i < colors.length; i++) {
    const dot = document.createElement('div');
    dot.className = 'dot';
    dot.onclick = () => {
      setBodyBgColorTo(colors[i]);
      pagination.currPage = i;
      updateUI();
    }
    dots.append(dot);
  }
}

function setActiveDot(currPage) {
  const dots = document.getElementsByClassName('dots')[0].childNodes;
  for (let i = 0; i < dots.length; i++) {
    dots[i].className = 'dot';
  }
  dots[currPage].className = 'dot active';
}

function setBodyBgColorTo(color) {
  body.bgColor = color;
}

function updateNavBtnStyles() {
  nextPageBtn.className = '';
  prevPageBtn.className = '';
  if (!pagination.hasPrev()) {
    prevPageBtn.className = 'btn-not-active';
  }
  if (!pagination.hasNext()) {
    nextPageBtn.className = 'btn-not-active';
  }
}

function updateUI() {
  setActiveDot(pagination.currPage);
  updateNavBtnStyles();
  showCurrentSection();
}

function init() {
  setBodyBgColorTo(colors[pagination.currPage]);
  createNavDots();
  setActiveDot(pagination.currPage);
  updateNavBtnStyles();
  showCurrentSection();
}

init();