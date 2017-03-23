/* global window, document */

function getAllSections() {
  return document.getElementsByTagName('section');
}

function createLink(href, innerHTML, className) {
  const link = document.createElement('a');
  link.href = `#${href}`;
  link.innerHTML = innerHTML;
  link.className = className;

  link.onclick = (event) => {
    // const select = `#${href}`;
    // console.log(select);
    // console.log(document.getElementById(href));
    // document.getElementById.scrollIntoView({ behavior: 'smooth' });
    // document.querySelector(select).scrollIntoView({ behavior: 'smooth' });
    // document.querySelector('#\\4').scrollIntoView({ behavior: 'smooth' });
    // console.log(document.querySelector('[id="4"]').scrollIntoView({ behavior: 'smooth' }));
    // console.log(window.scrollBy());
    document.querySelector(`[id="${href}"]`).scrollIntoView({ behavior: 'smooth' });
  };

  return link;
}

function createBottomPaginationFor(sections) {
  for (let i = 0; i < sections.length; i++) {
    const btnWrap = sections[i].getElementsByClassName('btn-wrap')[0];
    const curr = i + 1;

    if (i === 0) {
      btnWrap.appendChild(
        createLink(curr + 1, 'Next &#8594;', 'btn btn-next')
      );
    } else if (i === sections.length - 1) {
      btnWrap.appendChild(
        createLink(curr - 1, '&#8592; Previous', 'btn btn-prev')
      );
    } else {
      btnWrap.appendChild(
        createLink(curr - 1, '&#8592; Previous', 'btn btn-prev')
      );
      btnWrap.appendChild(
        createLink(curr + 1, 'Next &#8594;', 'btn btn-next')
      );
    }
  }
}

window.onload = function init() {
  console.log('Hello');

  const sections = getAllSections();
  createBottomPaginationFor(sections);
};


// (() => {
//   'use strict';
//
//   let winY,
//       winH,
//       slideSpeed = 400;
//   const $pager = $('#pager');
//   const $section = $('.section');
//
//   // Elements Array
//   let sectionArray = [];
//   let currentSectionArray = [];
//   $section.each((idx) => {
//     currentSectionArray.push('');
//     sectionArray.push('');
//     sectionArray[idx] = $(this).offset();
//     // sectionArray[idx] = $(this).offset().top;
//   });
//
//   // Populate Dynamic Pager
//   $section.each((idx) => {
//     // const tooltip = $section[idx];
//     $pager.append(`<li><a href="#${idx}"><span>${idx}</span></a></li>`);
//   });
//
//   // Populate Section Navigation
//   $section.each((idx) => {
//     const btnWrap = $(this).find('.btn-wrap');
//
//     if (idx === 0) {
//       btnWrap.append('<a href="#" class="btn btn-next">Next &#8594;</a>');
//     } else if (idx === $section.length - 1) {
//       btnWrap.append('<a href="#" class="btn btn-prev">&#8592; Previous</a>');
//     } else {
//       btnWrap.append('<a href="#" class="btn btn-prev">&#8592; Previous</a><a href="#" class="btn btn-next">Next &#8594;</a>');
//     }
//   });
//
//   $('body').append('<div id="console"></div>');
//
//   // Update Data
//   function updateConsole() {
//     winH = Math.ceil($(window).innerHeight());
//     winY = Math.ceil($('body').scrollTop());
//
//     $section.each((idx) => {
//       currentSectionArray[idx] = winY - $(this).offset().top;
//
//       if (currentSectionArray[idx] < -(winH/2) || currentSectionArray[idx] >= winH) {
//         currentSectionArray[index] = Math.ceil(winY - $(this).offset().top);
//       } else if (currentSectionArray[idx] === 0) {
//         currentSectionArray[idx] = 'current';
//       } else {
//         currentSectionArray[idx] = 'visible';
//         $('#pager li').removeAttr('class');
//         index++;
//         $pager.find(`li:nth-child('${idx}')`).addClass('active');
//       }
//     });
//
//     $('#console').html(`${winH} / ${winY} / [${currentSectionArray}]`);
//   }
//   updateConsole();
//
//   // On Resize
//   $(window).on('resize scroll', () => {
//     updateConsole();
//   });
//
//   // Pager Navigation
//   $pager.find('a').on('click', (event) => {
//     event.preventDefault();
//     const pagerIndex = $(this).closest('li').index();
//     $('html', 'body').animate({
//       scrollTop: sectionArray[pagerIndex]
//     }, slideSpeed);
//   });
//
//   // In-slide Navigation
//   $('.box .btn').on('click', (event) => {
//     event.preventDefault();
//     if ($(this).hasClass('btn-prev')) {
//       $('html, body').animate({
//         scrollTop: sectionArray[$(this).closest('.section').index() - 1]
//       }, slideSpeed);
//     } else if ($(this).hasClass('btn-next')) {
//       $('html, body').animate({
//         scrollTop: sectionArray[$(this).closest('.section').index() + 1]
//       }, slideSpeed);
//     }
//   });
// })();
