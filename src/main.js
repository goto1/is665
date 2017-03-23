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

function createLinkForSideNavigation(href) {
  const link = document.createElement('a');

  link.href = `#${href}`;

  return link;
}

function createSidePaginationFor(sections) {
  const pager = document.getElementById('pager');

  for (let i = 0; i < sections.length; i++) {
    const curr = i + 1;
    const listItem = document.createElement('li');

    listItem.appendChild(createLinkForSideNavigation(curr));
    pager.appendChild(listItem);

    listItem.onclick = () => {
      document.querySelector(`[id="${curr}"]`).scrollIntoView({ behavior: 'smooth' });
    };
  }
}

window.onload = function init() {
  const sections = getAllSections();
  const sectionsPositions = [];
  const pager = document.getElementById('pager');

  createBottomPaginationFor(sections);
  createSidePaginationFor(sections);

  for (let i = 0; i < sections.length; i++) {
    const pos = sections[i].getBoundingClientRect();
    sectionsPositions.push(pos.top);
  }

  pager.children[0].className='active';

  window.onscroll = () => {

    const found = sectionsPositions.find((sectionPosition) => {
      return sectionPosition === window.pageYOffset;
    });

    if (found >= 0) {
      const idx = sectionsPositions.indexOf(found);
      const listItems = pager.children;

      for (let i = 0; i < pager.children.length; i++) {
        pager.children[i].className = '';
      }

      listItems[idx].className = 'active';
    }
  };
};
