/* global window, document */

const slides = document.querySelectorAll('.slide');
const tl = new TimelineLite({ paused: true });

for (let i = 0; i < slides.length; i++) {
  const d = document.createElement('div');
  d.className = 'dot';
  d.id = `dot${i}`;

  d.addEventListener('click', () => {
    tl.seek(d.id).pause();
  });
  document.getElementById('dots').appendChild(d);

  if (i !== 0) {
    tl.addPause(`dot${i}`);
  }

  if (i !== slides.length - 1) {
    tl
      .to(slides[i], 0.5, { scale: 0.8, ease: Back.easeOut })
      .to(slides[i], 0.7, { xPercent: -100, rotationY: 80 }, `L${i}`)
      .from(slides[i + 1], 0.7, { xPercent: 100, rotationY: -80 }, `L${i}`)
      .to(`#dot${i}`, 0.7, { backgroundColor: 'rgba(255, 255, 255, 0.2)' }, `L${i}`)
      .from(slides[i + 1], 0.5, { scale: 0.8, ease: Back.easeIn })
  };
}

function go(e) {
  const sd = isNaN(e) ? e.wheelDelta || -e.detail : e;
  if (sd < 0) {
    tl.play();
  } else {
    tl.reverse();
  }
}

document.addEventListener('mousewheel', go);
document.addEventListener('DOMMouseScroll', go);
document.getElementById('nextBtn').addEventListener('click', () => {
  go(-1);
});
document.getElementById('prevBtn').addEventListener('click', () => {
  go(1);
});
