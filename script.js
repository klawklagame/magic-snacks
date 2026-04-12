const IMG_BASE = "https://klawkla.com/content/images/2025/08/";
const SNACKS = [
  {
    id:"clancastlecake", name:"เค้กปราสาทแคลน", tag:"กองกำลังเสริม",
    image: IMG_BASE+"clancastlecake-1.webp",
    headline:"เติมทหารแคลนด้วยตัวเองได้ฟรีเป็นเวลา 12 ชั่วโมง",
    desc:"ช่วยประหยัดเหรียญปล้นสะดมและอำนวยความสะดวกตอนโจมตียาว ๆ",
    tips:["กดรับตอนจะใช้งาน","เปิดใช้งานเวลาออกปล้นยาว ๆ"],
    chips:[{icon:"free",label:"ฟรี 12 ชม."}]
  },
  {
    id:"builderbite", name:"สเต็กช่างก่อสร้าง", tag:"บูสต์",
    image: IMG_BASE+"builderbite-1.webp",
    headline:"เร่งความเร็วช่างก่อสร้าง 2 เท่า เป็นเวลา 1 ชั่วโมง",
    desc:"เหมาะกับช่วงอัปสิ่งก่อสร้างยาว ๆ และต้องการจบงานต่อเนื่อง",
    tips:["ใช้คู่กับน้ำยาช่างก่อสร้างเพื่อเร่งรวมถึง ×11","เลือกเวลาที่ช่างก่อสร้างทุกคนกำลังทำงาน"],
    chips:[{icon:"time",label:"1 ชม."}]
  },
  {
    id:"studysoup", name:"ซุปสมองใส", tag:"บูสต์",
    image: IMG_BASE+"studysoup-1.webp",
    headline:"เร่งความเร็ววิจัยในห้องทดลอง 4 เท่า เป็นเวลา 1 ชั่วโมง",
    desc:"ดันวิจัยให้ทันฤดูกาล/อีเวนต์ ใช้ตอนมีทรัพยากรพร้อม",
    tips:["ซ้อนกับน้ำยาวิจัยเพื่อเร่งรวมสูงสุด"],
    chips:[{icon:"time",label:"1 ชม."}]
  },
  {
    id:"mightymorsel", name:"บาร์บีคิวทรงพลัง", tag:"บูสต์",
    image: IMG_BASE+"mightymorsel-1.webp",
    headline:"บูสต์ผู้กล้า สัตว์เลี้ยง อุปกรณ์ให้มีเลเวลสูงสุดของบ้านในการโจมตี 3 ครั้งถัดไป",
    desc:"เหมาะกับลงวอร์/ดันถ้วยที่ต้องการพลังฮีโร่สูงสุดแบบเร่งด่วน",
    tips:["ไม่ทำงานในเมืองกลางคืน","ใช้ทดสอบอุปกรณ์เลเวลสูงสุด"],
    chips:[{icon:"attack",label:"3 ครั้งถัดไป"}]
  },
  {
    id:"powerpancakes", name:"แพนเค้กเพิ่มพลัง", tag:"บูสต์",
    image: IMG_BASE+"powerpancakes-1.webp",
    headline:"บูสต์ทหาร อาคม เครื่องจักรให้มีเลเวลสูงสุดของบ้านในการโจมตี 3 ครั้งถัดไป",
    desc:"ใช้ตอนต้องการพลังรบสูง ๆ ชั่วคราว เช่น วอร์/วอร์ลีก",
    tips:["ไม่ทำงานในเมืองกลางคืน","ใช้คู่กับบาร์บีคิวทรงพลังเพื่อบูสต์ทั้งทหารและฮีโร่"],
    chips:[{icon:"attack",label:"3 ครั้งถัดไป"}]
  }
];

const track    = document.getElementById('track');
const dotsWrap = document.getElementById('dots');
const allGrid  = document.getElementById('allGrid');
const allPanel = document.getElementById('allPanel');
const btnAll   = document.getElementById('btnAll');
const closeAll = document.getElementById('closeAll');
const prevBtn  = document.getElementById('prev');
const nextBtn  = document.getElementById('next');
const infoModal = document.getElementById('infoModal');
const infoTitle = document.getElementById('infoTitle');
const infoBody  = document.getElementById('infoBody');
const infoClose = document.getElementById('infoClose');

const escapeHtml = (s) => String(s).replace(/[&<>"']/g, (c) =>
  ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c])
);

function chipHTML(c) { return `<span class="chip"><i class="${escapeHtml(c.icon)}"></i>${escapeHtml(c.label)}</span>`; }

// Batch-build DOM with DocumentFragment (single reflow)
const slideFrag = document.createDocumentFragment();
const dotFrag   = document.createDocumentFragment();
const tileFrag  = document.createDocumentFragment();

SNACKS.forEach((it, i) => {
  const tips = (it.tips || []).map(t => `<li>${escapeHtml(t)}</li>`).join('');
  const chips = (it.chips || []).map(chipHTML).join('');
  const loadAttr = i === 0 ? 'eager" fetchpriority="high' : 'lazy';

  const slide = document.createElement('article');
  slide.className = 'slide';
  slide.dataset.id = it.id;
  slide.innerHTML = `
    <div class="magic-card">
      <div class="media">
        <img src="${it.image}" alt="${escapeHtml(it.name)}" width="240" height="240" loading="${loadAttr}" decoding="async">
      </div>
      <section>
        <div class="h1">${escapeHtml(it.name)} <span class="badge">${escapeHtml(it.tag)}</span></div>
        <div class="meta">${escapeHtml(it.headline || '')}</div>
        <div class="desc">${escapeHtml(it.desc || '')}</div>
        ${tips ? `<ul class="tips">${tips}</ul>` : ''}
        <div class="infochips">${chips}</div>
      </section>
    </div>`;
  slideFrag.appendChild(slide);

  const d = document.createElement('button');
  d.type = 'button';
  d.className = 'dot' + (i === 0 ? ' active' : '');
  d.setAttribute('aria-label', `ไปยังรายการที่ ${i + 1}`);
  d.dataset.index = i;
  dotFrag.appendChild(d);

  const tile = document.createElement('button');
  tile.type = 'button';
  tile.className = 'tile';
  tile.setAttribute('role', 'listitem');
  tile.dataset.index = i;
  tile.innerHTML = `<img src="${it.image}" alt="" width="80" height="80" loading="lazy" decoding="async"><div class="tname">${escapeHtml(it.name)}</div>`;
  tileFrag.appendChild(tile);
});

track.appendChild(slideFrag);
dotsWrap.appendChild(dotFrag);
allGrid.appendChild(tileFrag);

const slides = Array.from(track.children);
const dots   = Array.from(dotsWrap.children);

let index = 0, width = 0, activeDot = dots[0];

const clamp = (n, min, max) => Math.max(min, Math.min(n, max));
const setTransform = (px) => { track.style.transform = `translate3d(${px}px,0,0)`; };
const toX = (i) => -i * width;

function size() {
  width = track.clientWidth;
  setTransform(toX(index));
}

function updateActiveDot(next) {
  if (activeDot === next) return;
  activeDot.classList.remove('active');
  next.classList.add('active');
  activeDot = next;
}

function triggerCardEntrance() {
  const card = slides[index]?.querySelector('.magic-card');
  if (!card) return;
  card.classList.remove('card-entering');
  void card.offsetWidth;
  card.classList.add('card-entering');
}

function go(i, animate = true) {
  const newIndex = clamp(i, 0, slides.length - 1);
  const changed = newIndex !== index;
  index = newIndex;
  track.classList.toggle('animating', animate);
  setTransform(toX(index));
  prevBtn.disabled = index === 0;
  nextBtn.disabled = index === slides.length - 1;
  updateActiveDot(dots[index]);
  if (animate && changed) triggerCardEntrance();
}

track.addEventListener('transitionend', (e) => {
  if (e.propertyName === 'transform') track.classList.remove('animating');
});

// Delegated handlers
dotsWrap.addEventListener('click', (e) => {
  const d = e.target.closest('.dot');
  if (d) go(parseInt(d.dataset.index, 10));
});
allGrid.addEventListener('click', (e) => {
  const t = e.target.closest('.tile');
  if (t) { go(parseInt(t.dataset.index, 10)); toggleAll(false); }
});

prevBtn.addEventListener('click', () => go(index - 1));
nextBtn.addEventListener('click', () => go(index + 1));

window.addEventListener('keydown', (e) => {
  const anyOpen = allPanel.classList.contains('open') || infoModal.classList.contains('open');
  if (anyOpen) {
    if (e.key === 'Escape') {
      if (allPanel.classList.contains('open')) toggleAll(false);
      if (infoModal.classList.contains('open')) closeInfo();
    }
    return;
  }
  if (e.key === 'ArrowLeft')  go(index - 1);
  else if (e.key === 'ArrowRight') go(index + 1);
});

// ── Swipe ──
const SWIPE_MIN = 35, SWIPE_VEL = 0.28, DIR_LOCK = 7, EDGE_RESIST = 0.18;
let sw = { active: false, dragging: false, dir: null, x0: 0, y0: 0, x: 0, t0: 0 };

function swipeStart(x, y) {
  if (allPanel.classList.contains('open') || infoModal.classList.contains('open')) return;
  sw = { active: true, dragging: false, dir: null, x0: x, y0: y, x, t0: performance.now() };
  track.classList.remove('animating');
}

function swipeMove(x, y) {
  if (!sw.active) return;
  const dx = x - sw.x0, dy = y - sw.y0;
  if (!sw.dir) {
    if (Math.abs(dx) < DIR_LOCK && Math.abs(dy) < DIR_LOCK) return;
    sw.dir = Math.abs(dx) >= Math.abs(dy) ? 'h' : 'v';
    if (sw.dir === 'v') { sw.active = false; return; }
    sw.dragging = true;
  }
  if (!sw.dragging) return;
  sw.x = x;
  let d = dx;
  if ((index === 0 && dx > 0) || (index === slides.length - 1 && dx < 0)) {
    d = dx * EDGE_RESIST;
  }
  setTransform(toX(index) + d);
}

function swipeEnd() {
  if (!sw.dragging) { sw.active = false; return; }
  sw.active = false;
  sw.dragging = false;
  const dx = sw.x - sw.x0;
  const vel = Math.abs(dx) / Math.max(1, performance.now() - sw.t0);
  if (Math.abs(dx) > SWIPE_MIN || vel > SWIPE_VEL) {
    go(dx < 0 ? index + 1 : index - 1);
  } else {
    go(index);
  }
}

track.addEventListener('pointerdown', (e) => {
  if (e.pointerType === 'touch') return;
  swipeStart(e.clientX, e.clientY);
  track.setPointerCapture(e.pointerId);
});
track.addEventListener('pointermove', (e) => {
  if (e.pointerType === 'touch') return;
  swipeMove(e.clientX, e.clientY);
});
track.addEventListener('pointerup',     (e) => { if (e.pointerType !== 'touch') swipeEnd(); });
track.addEventListener('pointercancel', (e) => { if (e.pointerType !== 'touch') swipeEnd(); });

track.addEventListener('touchstart', (e) => {
  const t = e.touches[0];
  swipeStart(t.clientX, t.clientY);
}, { passive: true });
track.addEventListener('touchmove', (e) => {
  if (!sw.active) return;
  const t = e.touches[0];
  swipeMove(t.clientX, t.clientY);
  if (sw.dragging) e.preventDefault();
}, { passive: false });
track.addEventListener('touchend',    swipeEnd, { passive: true });
track.addEventListener('touchcancel', swipeEnd, { passive: true });

// ── Parallax (hover-capable only) ──
const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const bgShapes = [...document.querySelectorAll('.bg-shape')];
let parallaxRaf = null, pxX = 0, pxY = 0;

function runParallax() {
  parallaxRaf = null;
  const cx = window.innerWidth / 2, cy = window.innerHeight / 2;
  for (let i = 0; i < bgShapes.length; i++) {
    const speed = (i + 1) * 20;
    const rotate = i === 0 ? -15 : 0;
    bgShapes[i].style.transform = `translate3d(${(cx - pxX) / speed}px, ${(cy - pxY) / speed}px, 0) rotate(${rotate}deg)`;
  }
}

if (canHover && bgShapes.length) {
  document.addEventListener('mousemove', (e) => {
    pxX = e.clientX; pxY = e.clientY;
    if (!parallaxRaf) parallaxRaf = requestAnimationFrame(runParallax);
  }, { passive: true });
}

// Unified resize
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    size();
    bgShapes.forEach((s) => { s.style.transform = ''; });
  }, 150);
}, { passive: true });

// ── Show-all panel ──
function toggleAll(state) {
  allPanel.classList.toggle('open', state);
  allPanel.setAttribute('aria-hidden', String(!state));
}
btnAll.addEventListener('click',   () => toggleAll(true));
closeAll.addEventListener('click', () => toggleAll(false));
allPanel.addEventListener('click', (e) => { if (e.target === allPanel) toggleAll(false); });

// ── Info modal ──
const INFO = {
  source: {
    title: 'ได้จากไหน?',
    html: `
      <ul>
        <li>อีเวนต์ล่าสมบัติ</li>
        <li>อีเวนต์ชุมชน</li>
        <li>อีเวนต์เหรียญ</li>
        <li>แจกจากเกม</li>
      </ul>`
  },
  storage: {
    title: 'การเก็บ',
    html: `
      <p>เมื่อได้รับของว่างเวทมนตร์แล้ว จะถูกเก็บไว้ที่ <strong>คลังชั่วคราว</strong></p>
      <p><strong>หมดอายุภายใน 24 ชั่วโมง</strong> หากไม่ได้เปิดใช้งาน</p>`
  },
  usage: {
    title: 'วิธีใช้งาน',
    html: `
      <p><strong>ใช้ได้ทันทีหลังเปิดใช้งาน</strong> — บัฟจะเริ่มตามเงื่อนไขของของว่างนั้น ๆ</p>
      <p>แนะนำให้วางแผนก่อนกดใช้ เพื่อดึงมูลค่าสูงสุด</p>`
  }
};

function openInfo() {
  infoModal.classList.add('open');
  infoModal.setAttribute('aria-hidden', 'false');
}
function closeInfo() {
  infoModal.classList.remove('open');
  infoModal.setAttribute('aria-hidden', 'true');
}

document.querySelectorAll('.infobtn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const data = INFO[btn.dataset.info];
    if (!data) return;
    infoTitle.textContent = data.title;
    infoBody.innerHTML = data.html;
    openInfo();
  });
});
infoClose.addEventListener('click', closeInfo);
infoModal.addEventListener('click', (e) => { if (e.target === infoModal) closeInfo(); });

// Ripple on infobtn + showall (delegated in place)
document.querySelectorAll('.infobtn, .showall').forEach((btn) => {
  btn.addEventListener('click', function (e) {
    const ripple = document.createElement('span');
    ripple.className = 'btn-ripple';
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    ripple.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - rect.left - size / 2}px;top:${e.clientY - rect.top - size / 2}px;position:absolute;`;
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 700);
  });
});

// ── Custom cursor (hover-capable, idle-aware) ──
if (canHover) {
  const cursorDot  = document.createElement('div');
  const cursorRing = document.createElement('div');
  cursorDot.className  = 'cursor-dot';
  cursorRing.className = 'cursor-ring';
  document.body.append(cursorDot, cursorRing);

  let mx = window.innerWidth / 2, my = window.innerHeight / 2;
  let rx = mx, ry = my;
  let running = false, idleTimer = null;

  function ringLoop() {
    rx += (mx - rx) * 0.13;
    ry += (my - ry) * 0.13;
    cursorRing.style.transform = `translate3d(${rx.toFixed(2)}px, ${ry.toFixed(2)}px, 0) translate(-50%, -50%)`;
    if (Math.abs(mx - rx) > 0.1 || Math.abs(my - ry) > 0.1) {
      requestAnimationFrame(ringLoop);
    } else {
      running = false;
    }
  }

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    cursorDot.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
    if (!running) { running = true; requestAnimationFrame(ringLoop); }
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => { running = false; }, 2000);
  }, { passive: true });

  const HOVER_SEL = 'button, a, .dot, [role="listitem"], .tile, .infobtn';
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(HOVER_SEL)) {
      cursorDot.classList.add('cursor-hover');
      cursorRing.classList.add('cursor-hover');
    }
  }, { passive: true });
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(HOVER_SEL)) {
      cursorDot.classList.remove('cursor-hover');
      cursorRing.classList.remove('cursor-hover');
    }
  }, { passive: true });

  document.addEventListener('mouseleave', () => {
    cursorDot.style.opacity = '0';
    cursorRing.style.opacity = '0';
  }, { passive: true });
  document.addEventListener('mouseenter', () => {
    cursorDot.style.opacity = '1';
    cursorRing.style.opacity = '1';
  }, { passive: true });
}

// Init
size();
