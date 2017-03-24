/* global window, document */

function createLink(href, innerHTML, className) {
  const link = document.createElement('a');
  link.href = `#${href}`;
  link.innerHTML = innerHTML;
  link.className = className;

  link.onclick = () => {
    document
      .querySelector(`[id="${href}"]`)
      .scrollIntoView({ behavior: 'smooth' });
  };

  return link;
}

function createBottomPaginationFor(sections) {
  for (let i = 0; i < sections.length; i++) {
    const btnWrap = sections[i].getElementsByClassName('btn-wrap')[0];

    if (i === 0) {
      btnWrap.appendChild(
        createLink(sections[i + 1].id, 'Next &#8594;', 'btn btn-next')
      );
    } else if (i === sections.length - 1) {
      btnWrap.appendChild(
        createLink(sections[i - 1].id, '&#8592; Previous', 'btn btn-prev')
      );
    } else {
      btnWrap.appendChild(
        createLink(sections[i - 1].id, '&#8592; Previous', 'btn btn-prev')
      );
      btnWrap.appendChild(
        createLink(sections[i + 1].id, 'Next &#8594;', 'btn btn-next')
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
    const listItem = document.createElement('li');
    listItem.appendChild(createLinkForSideNavigation(sections[i].id));
    pager.appendChild(listItem);

    listItem.onclick = () => {
      document
        .querySelector(`[id="${sections[i].id}"]`)
        .scrollIntoView({ behavior: 'smooth' });
    };
  }
}

function removeActiveClassFromList() {
  const pager = document.getElementById('pager');

  for (let i = 0; i < pager.children.length; i++) {
    pager.children[i].className = '';
  }
}

window.onload = function init() {
  const sections = document.getElementsByTagName('section');
  const pager = document.getElementById('pager');
  const sectionsPositions = [];

  createBottomPaginationFor(sections);
  createSidePaginationFor(sections);

  for (let i = 0; i < sections.length; i++) {
    const pos = sections[i].getBoundingClientRect();
    sectionsPositions.push(pos.top);
  }

  pager.children[0].className = 'active';

  window.onscroll = () => {
    const found = sectionsPositions.find((sectionPosition) => {
      return sectionPosition === window.scrollY;
    });

    if (found >= 0) {
      const idx = sectionsPositions.indexOf(found);
      const listItems = pager.children;

      removeActiveClassFromList();

      listItems[idx].className = 'active';
    }
  };
};
