/* ========= CONFIG ========= */
const IMAGES = [
  { file: "01.JPG", caption: "DISHA" },
  { file: "02.JPG", caption: "DISHA" },
  { file: "03.JPG", caption: "DISHA" },
  { file: "04.JPG", caption: "DISHA" },
  { file: "05.JPG", caption: "DISHA" },
  { file: "06.JPG", caption: "DISHA" },
  { file: "07.JPG", caption: "DISHA" },
  { file: "08.JPG", caption: "DISHA" },
  { file: "09.JPG", caption: "DISHA" },
  { file: "10.jpg", caption: "DISHA" },
  { file: "11.jpg", caption: "DISHA" },
  { file: "12.jpg", caption: "DISHA" },
  { file: "13.jpg", caption: "DISHA" },
  { file: "14.jpg", caption: "DISHA" },
  { file: "15.jpg", caption: "DISHA" },
  { file: "16.jpg", caption: "DISHA" },
  { file: "17.jpg", caption: "DISHA" },
  { file: "18.jpg", caption: "DISHA" },
  { file: "19.jpg", caption: "DISHA" },
  { file: "20.jpg", caption: "DISHA" },
  { file: "21.jpg", caption: "DISHA" },
  { file: "22.jpg", caption: "DISHA" },
  { file: "23.jpg", caption: "DISHA" },
  { file: "24.jpg", caption: "DISHA" },
  { file: "25.jpg", caption: "DISHA" }
];
const IMAGE_BASE = "images/";

/* ========= Hearts ========= */
(function spawnHearts(){
  const container = document.querySelector('.hearts');
  const count = 30;
  for (let i=0; i<count; i++){
    const s = document.createElement('span');
    s.className = 'heart';
    s.textContent = '❤';
    s.style.left = Math.random()*100 + 'vw';
    s.style.animationDuration = (10 + Math.random()*14) + 's';
    s.style.animationDelay = (-Math.random()*10) + 's';
    s.style.fontSize = (10 + Math.random()*22) + 'px';
    container.appendChild(s);
  }
})();

/* ========= Gallery ========= */
const gallery = document.getElementById('gallery');
function renderGallery(){
  gallery.innerHTML = '';
  for (const item of IMAGES){
    const fig = document.createElement('figure');
    fig.className = 'card';

    const wrap = document.createElement('div');
    wrap.className = 'thumb-wrap';

    const img = document.createElement('img');
    img.className = 'thumb';
    img.src = IMAGE_BASE + item.file;
    img.alt = item.caption;
    wrap.appendChild(img);

    const cap = document.createElement('figcaption');
    cap.textContent = item.caption;

    fig.appendChild(wrap);
    fig.appendChild(cap);

    fig.addEventListener('click', () => openLightbox(item));
    gallery.appendChild(fig);
  }
}

/* ========= Lightbox ========= */
const lb = document.getElementById('lightbox');
const lbImg = document.getElementById('lbImg');
const lbMeta = document.getElementById('lbMeta');
const lbClose = document.getElementById('lbClose');

function openLightbox(item){
  lbImg.src = IMAGE_BASE + item.file;
  lbMeta.textContent = item.caption;
  lb.classList.add('open');
}
function closeLightbox(){ lb.classList.remove('open'); }

lbClose.addEventListener('click', closeLightbox);
lb.addEventListener('click', e => { if (e.target === lb) closeLightbox(); });

/* ========= Music ========= */
const song = document.getElementById('song');
const playBtn = document.getElementById('playMusic');

playBtn.addEventListener('click', async () => {
  if (song.paused){
    await song.play();
    playBtn.textContent = '⏸️ Pause';
  } else {
    song.pause();
    playBtn.textContent = '▶️ Play our song';
  }
});

/* ========= Marquees ========= */
/* ========= Marquees ========= */
(function buildMarquees(){
  const layer = document.getElementById('marquees');
  if (!layer || IMAGES.length === 0) return;

  const rows = window.matchMedia('(max-width: 480px)').matches ? 2 : 3;
  layer.style.gridTemplateRows = `repeat(${rows}, var(--row-h))`;

  for (let r = 0; r < rows; r++){
    const row = document.createElement('div');
    row.className = 'marquee-row speed-' + ((r % 3) + 1);

    const track = document.createElement('div');
    track.className = 'marquee-track';

    const slide1 = document.createElement('div');
    slide1.className = 'marquee-slide';

    // staggered distribution
    const subset = [];
    for (let i = r; i < IMAGES.length; i += rows) subset.push(IMAGES[i]);

    // ensure enough images for smooth loop
    while (subset.length < 6) subset.push(...IMAGES);

    function makeCard(item){
      const card = document.createElement('div');
      card.className = 'polaroid';
      card.style.setProperty('--tilt', (Math.random()*6 - 3) + 'deg');

      const img = document.createElement('img');
      img.src = IMAGE_BASE + item.file;

      const cap = document.createElement('div');
      cap.className = 'cap';
      cap.textContent = item.caption;

      card.appendChild(img);
      card.appendChild(cap);

      // open lightbox
      card.addEventListener('click', e => {
        e.stopPropagation();
        openLightbox(item);
      });

      // pause marquee on hover
      card.addEventListener('mouseenter', () => row.classList.add('pause'));
      card.addEventListener('mouseleave', () => row.classList.remove('pause'));

      return card;
    }

    // build slides
    subset.forEach(item => slide1.appendChild(makeCard(item)));
    const slide2 = slide1.cloneNode(true);

    track.appendChild(slide1);
    track.appendChild(slide2);
    row.appendChild(track);
    layer.appendChild(row);
  }
})();


renderGallery();
