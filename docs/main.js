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

var colors = ['#FF4040', '#5BCC1F', '#40B5FF', '#B273FF'];
var body = document.getElementsByTagName('body')[0];
var buttons = document.getElementsByTagName('button');
var dots = document.getElementsByClassName('dots');
var pagination = new Pagination(0, colors.length);
var nextPageBtn = buttons[1];
var prevPageBtn = buttons[0];

nextPageBtn.onclick = function () {
  pagination.nextPage();
  setBodyBgColorTo(colors[pagination.currPage]);
  setActiveDot(pagination.currPage);
  updateNavBtnStyles();
};

prevPageBtn.onclick = function () {
  pagination.prevPage();
  setBodyBgColorTo(colors[pagination.currPage]);
  setActiveDot(pagination.currPage);
  updateNavBtnStyles();
};

function createNavDots() {
  var dots = document.getElementsByClassName('dots')[0];

  var _loop = function _loop(i) {
    var dot = document.createElement('div');
    dot.className = 'dot';
    dot.onclick = function () {
      setBodyBgColorTo(colors[i]);
      pagination.currPage = i;
      setActiveDot(pagination.currPage);
      updateNavBtnStyles();
    };
    dots.append(dot);
  };

  for (var i = 0; i < colors.length; i++) {
    _loop(i);
  }
}

function setActiveDot(currPage) {
  var dots = document.getElementsByClassName('dots')[0].childNodes;
  for (var i = 0; i < dots.length; i++) {
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

function init() {
  setBodyBgColorTo(colors[0]);
  createNavDots();
  setActiveDot(pagination.currPage);
  updateNavBtnStyles();
}

init();
//# sourceMappingURL=main.js.map
