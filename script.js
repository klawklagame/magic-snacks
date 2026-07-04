const IMG_BASE = "https://klawkla.com/content/images/2025/08/";
const SNACKS = [
  {
    id:"clancastlecake", name:"เค้กปราสาทแคลน", category:"กองกำลังเสริม",
    image: IMG_BASE+"clancastlecake-1.webp",
    headline:"เติมทหารแคลนด้วยตัวเองได้ฟรีเป็นเวลา 12 ชั่วโมง",
    desc:"ช่วยประหยัดเหรียญปล้นสะดมและอำนวยความสะดวกตอนโจมตียาว ๆ",
    tips:["กดรับตอนจะใช้งาน","เปิดใช้งานเวลาออกปล้นยาว ๆ"],
    chips:[{icon:"free",label:"ฟรี 12 ชม."}]
  },
  {
    id:"builderbite", name:"สเต็กช่างก่อสร้าง", category:"บูสต์",
    image: IMG_BASE+"builderbite-1.webp",
    headline:"เร่งความเร็วช่างก่อสร้าง 2 เท่า เป็นเวลา 1 ชั่วโมง",
    desc:"เหมาะกับช่วงอัปสิ่งก่อสร้างยาว ๆ และต้องการจบงานต่อเนื่อง",
    tips:["ไม่สามารถทำงานพร้อมกับน้ำยาช่างก่อสร้างได้","เลือกเวลาที่ช่างก่อสร้างทุกคนกำลังทำงาน"],
    chips:[{icon:"time",label:"1 ชม."}]
  },
  {
    id:"studysoup", name:"ซุปสมองใส", category:"บูสต์",
    image: IMG_BASE+"studysoup-1.webp",
    headline:"เร่งความเร็ววิจัยในห้องทดลอง 4 เท่า เป็นเวลา 1 ชั่วโมง",
    desc:"ดันวิจัยให้ทันฤดูกาล/อีเวนต์ ใช้ตอนมีทรัพยากรพร้อม",
    tips:["ไม่สามารถทำงานพร้อมกับน้ำยาวิจัยได้"],
    chips:[{icon:"time",label:"1 ชม."}]
  },
  {
    id:"mightymorsel", name:"บาร์บีคิวทรงพลัง", category:"บูสต์",
    image: IMG_BASE+"mightymorsel-1.webp",
    headline:"บูสต์ผู้กล้า สัตว์เลี้ยง อุปกรณ์ให้มีเลเวลสูงสุดของบ้านในการโจมตี 3 ครั้งถัดไป",
    desc:"เหมาะกับตีวอร์/ตีโหมดจัดอันดับที่ต้องการพลังฮีโร่สูงสุด",
    tips:["ไม่ทำงานในเมืองกลางคืน","ใช้ทดสอบอุปกรณ์เลเวลสูงสุด"],
    chips:[{icon:"attack",label:"3 ครั้งถัดไป"}]
  },
  {
    id:"powerpancakes", name:"แพนเค้กเพิ่มพลัง", category:"บูสต์",
    image: IMG_BASE+"powerpancakes-1.webp",
    headline:"บูสต์ทหาร อาคม เครื่องจักรให้มีเลเวลสูงสุดของบ้านในการโจมตี 3 ครั้งถัดไป",
    desc:"ใช้ตอนต้องการพลังรบสูง ๆ ชั่วคราว เช่น วอร์/วอร์ลีก",
    tips:["ไม่ทำงานในเมืองกลางคืน","ใช้คู่กับบาร์บีคิวทรงพลังเพื่อบูสต์ทั้งผู้กล้า สัตว์เลี้ยง และอุปกรณ์"],
    chips:[{icon:"attack",label:"3 ครั้งถัดไป"}]
  }
];

const CAT_CLASS = {
  'กองกำลังเสริม': 'reinforce',
  'บูสต์': 'boost',
};
const CAT_ORDER = ['กองกำลังเสริม', 'บูสต์'];
const CHIP_EMOJI = { free: '🆓', time: '⏱️', attack: '⚔️' };

const filters   = document.querySelector('.filters');
const filterCats = document.getElementById('filterCats');
const rail      = document.getElementById('rail');
const stage     = document.getElementById('stage');
const detail    = document.getElementById('detail');
const prevBtn   = document.getElementById('prev');
const nextBtn   = document.getElementById('next');
const infoModal = document.getElementById('infoModal');
const infoTitle = document.getElementById('infoTitle');
const infoBody  = document.getElementById('infoBody');
const infoClose = document.getElementById('infoClose');
const searchIn  = document.getElementById('search');

const escapeHtml = (s) => String(s).replace(/[&<>"']/g, (c) =>
  ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c])
);
const catKeyOf = (it) => CAT_CLASS[it.category] || 'boost';

function featChip(c) {
  const e = CHIP_EMOJI[c.icon];
  const icon = e ? `<span class="feat-ic" aria-hidden="true">${e}</span>` : '';
  return `<span class="feat">${icon}${escapeHtml(c.label)}</span>`;
}

/* ── Build category filter chips (with item counts) ── */
const catCounts = {};
SNACKS.forEach((it) => { catCounts[it.category] = (catCounts[it.category] || 0) + 1; });

function makeChip(cat, label, count) {
  const c = document.createElement('button');
  c.type = 'button';
  c.className = 'chip';
  c.dataset.cat = cat;
  c.append(label + ' ');
  const n = document.createElement('span');
  n.className = 'chip-n';
  n.textContent = count;
  c.appendChild(n);
  return c;
}

const chipFrag = document.createDocumentFragment();
const allChip = makeChip('all', 'ทั้งหมด', SNACKS.length);
allChip.classList.add('is-active');
chipFrag.appendChild(allChip);
CAT_ORDER.forEach((cat) => {
  const c = makeChip(cat, cat, catCounts[cat] || 0);
  c.style.setProperty('--c', `var(--cat-${CAT_CLASS[cat]})`);
  chipFrag.appendChild(c);
});
filterCats.appendChild(chipFrag);
const chips = Array.from(filterCats.children);

/* ── Build rail snack buttons ── */
const railFrag = document.createDocumentFragment();
SNACKS.forEach((it, i) => {
  const key = catKeyOf(it);
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'item';
  btn.dataset.index = i;
  btn.dataset.cat = it.category;
  btn.style.setProperty('--acc', `var(--cat-${key})`);
  btn.setAttribute('role', 'tab');
  btn.setAttribute('aria-label', `${it.name} · ${it.category}`);
  btn.innerHTML = `
    <span class="item-ico"><img src="${it.image}" alt="" width="46" height="46" loading="${i < 4 ? 'eager' : 'lazy'}" decoding="async"></span>
    <span class="item-text">
      <span class="item-name">${escapeHtml(it.name)}</span>
      <span class="item-cat">${escapeHtml(it.category)}</span>
    </span>`;
  railFrag.appendChild(btn);
});
rail.appendChild(railFrag);
const itemBtns = Array.from(rail.children);

/* ── State ── */
let index = 0;
let activeBtn = itemBtns[0];
let filterCat = 'all';
let query = '';
let visible = SNACKS.map((_, i) => i);   // visible indices in current filter + search

const isVisible = (i) => {
  const it = SNACKS[i];
  if (filterCat !== 'all' && it.category !== filterCat) return false;
  if (!query) return true;
  return it.name.toLowerCase().includes(query)
    || it.category.toLowerCase().includes(query)
    || (it.headline || '').toLowerCase().includes(query);
};

/* ── Render the stage detail with morph-in animation ── */
const eyebrowText = (i) => {
  const pos = visible.indexOf(i);
  return `${String(pos + 1).padStart(2, '0')} / ${String(visible.length).padStart(2, '0')} · ${SNACKS[i].category}`;
};

function renderDetail(i) {
  const it = SNACKS[i];
  const key = catKeyOf(it);

  const tipsHtml  = (it.tips  || []).map(t => `<li>${escapeHtml(t)}</li>`).join('');
  const chipsHtml = (it.chips || []).map(featChip).join('');

  stage.style.setProperty('--acc', `var(--cat-${key})`);

  detail.className = 'detail';   // reset → re-arm animation
  detail.innerHTML = `
    <div class="detail-media">
      <span class="media-glow" aria-hidden="true"></span>
      <span class="media-ring" aria-hidden="true"></span>
      <img class="media-img" src="${it.image}" alt="${escapeHtml(it.name)}" width="168" height="168"
           fetchpriority="high" decoding="async">
    </div>
    <div class="detail-head" style="--d:60ms">
      <span class="eyebrow">${escapeHtml(eyebrowText(i))}</span>
      <h2 class="detail-name">${escapeHtml(it.name)}</h2>
      <p class="detail-headline">${escapeHtml(it.headline || '')}</p>
    </div>
    <div class="detail-body" style="--d:130ms">
      <p class="detail-desc">${escapeHtml(it.desc || '')}</p>
      ${tipsHtml ? `<ul class="detail-tips">${tipsHtml}</ul>` : ''}
      ${chipsHtml ? `
      <div class="detail-feats">
        <div class="feats-label">คุณสมบัติ</div>
        <div class="feat-list">${chipsHtml}</div>
      </div>` : ''}
    </div>`;

  void detail.offsetWidth;       // force reflow
  detail.classList.add('is-in');
  stage.scrollTop = 0;
}

function updateNavButtons() {
  const pos = visible.indexOf(index);
  prevBtn.disabled = pos <= 0;
  nextBtn.disabled = pos >= visible.length - 1;
}

/* ── Select a snack by SNACKS index ── */
function select(i, { scrollIntoView = true } = {}) {
  if (i == null || i < 0 || i >= SNACKS.length) return;
  index = i;

  if (activeBtn !== itemBtns[i]) {
    activeBtn.classList.remove('is-active');
    activeBtn.removeAttribute('aria-selected');
    activeBtn = itemBtns[i];
  }
  activeBtn.classList.add('is-active');
  activeBtn.setAttribute('aria-selected', 'true');

  if (scrollIntoView) {
    activeBtn.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
  }

  renderDetail(i);
  updateNavButtons();
}

/* step through the currently visible snacks */
function step(dir) {
  const pos = visible.indexOf(index);
  const next = visible[pos + dir];
  if (next != null) select(next);
}

/* ── Empty state (no matches) ── */
function renderEmpty() {
  detail.className = 'detail is-empty';
  detail.innerHTML = `
    <div class="stage-empty">
      <p class="empty-title">ไม่พบของว่างที่ค้นหา</p>
      <p class="empty-hint">ลองพิมพ์คำอื่น หรือเปลี่ยนหมวดหมู่</p>
      <button class="empty-clear" type="button">แสดงของว่างทั้งหมด</button>
    </div>`;
}

/* ── Filtering + search ── */
function refreshVisibility() {
  const wasEmpty = detail.classList.contains('is-empty');

  visible = [];
  itemBtns.forEach((btn, i) => {
    const show = isVisible(i);
    btn.classList.toggle('hidden', !show);
    if (show) visible.push(i);
  });

  if (!visible.length) {
    renderEmpty();
  } else if (!isVisible(index)) {
    select(visible[0], { scrollIntoView: false });
  } else if (wasEmpty) {
    select(index, { scrollIntoView: false });
  } else {
    const eb = detail.querySelector('.eyebrow');
    if (eb) eb.textContent = eyebrowText(index);
  }
  updateNavButtons();
}

function applyFilter(cat) {
  filterCat = cat;
  chips.forEach(c => c.classList.toggle('is-active', c.dataset.cat === cat));
  refreshVisibility();
  rail.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
}

/* ── Info modal ── */
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

function openInfo(key) {
  const data = INFO[key];
  if (!data) return;
  infoTitle.textContent = data.title;
  infoBody.innerHTML = data.html;
  infoModal.classList.add('open');
  infoModal.setAttribute('aria-hidden', 'false');
}
function closeInfo() {
  infoModal.classList.remove('open');
  infoModal.setAttribute('aria-hidden', 'true');
}
const infoOpen = () => infoModal.classList.contains('open');

/* ── Events ── */
rail.addEventListener('click', (e) => {
  const btn = e.target.closest('.item');
  if (btn) select(parseInt(btn.dataset.index, 10));
});

filters.addEventListener('click', (e) => {
  const chip = e.target.closest('.chip');
  if (chip) { applyFilter(chip.dataset.cat); return; }
  const info = e.target.closest('.infobtn');
  if (info) openInfo(info.dataset.info);
});

infoClose.addEventListener('click', closeInfo);
infoModal.addEventListener('click', (e) => { if (e.target === infoModal) closeInfo(); });

prevBtn.addEventListener('click', () => step(-1));
nextBtn.addEventListener('click', () => step(1));

searchIn.addEventListener('input', () => {
  query = searchIn.value.trim().toLowerCase();
  refreshVisibility();
});
searchIn.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && searchIn.value) {
    searchIn.value = '';
    query = '';
    refreshVisibility();
    e.stopPropagation();
  }
});

detail.addEventListener('click', (e) => {
  if (e.target.closest('.empty-clear')) {
    searchIn.value = '';
    query = '';
    applyFilter('all');
  }
});

window.addEventListener('keydown', (e) => {
  if (infoOpen()) { if (e.key === 'Escape') closeInfo(); return; }
  if (e.target instanceof HTMLInputElement) return;   // don't hijack typing in search
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { step(1); e.preventDefault(); }
  else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { step(-1); e.preventDefault(); }
});

/* ── Swipe on the stage (prev/next within filtered list) ── */
const SWIPE_MIN = 45;
let sw = { active: false, dir: null, x0: 0, y0: 0 };

stage.addEventListener('touchstart', (e) => {
  if (infoOpen()) return;
  const t = e.touches[0];
  sw = { active: true, dir: null, x0: t.clientX, y0: t.clientY };
}, { passive: true });

stage.addEventListener('touchmove', (e) => {
  if (!sw.active || sw.dir) return;
  const t = e.touches[0];
  const dx = t.clientX - sw.x0, dy = t.clientY - sw.y0;
  if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
  sw.dir = Math.abs(dx) > Math.abs(dy) ? 'h' : 'v';
}, { passive: true });

stage.addEventListener('touchend', (e) => {
  if (!sw.active) return;
  sw.active = false;
  if (sw.dir !== 'h') return;
  const dx = e.changedTouches[0].clientX - sw.x0;
  if (Math.abs(dx) > SWIPE_MIN) step(dx < 0 ? 1 : -1);
}, { passive: true });

/* ── Init ── */
select(0, { scrollIntoView: false });
