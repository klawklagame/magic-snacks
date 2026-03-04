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

const track = document.getElementById('track');
const dots = document.getElementById('dots');
const allGrid = document.getElementById('allGrid');

function chipHTML(c){ return `<span class="chip"><i class="${c.icon}"></i>${c.label}</span>`; }

SNACKS.forEach((it,i)=>{
  const slide = document.createElement('article');
  slide.className = 'slide';
  slide.dataset.id = it.id;
  
  // New Glass Card Structure matching magic-items
  slide.innerHTML = `
    <div class="magic-card">
        <div class="media">
            <img src="${it.image}" alt="${it.name}">
        </div>
        <section>
            <div class="h1">${it.name} <span class="badge">${it.tag}</span></div>
            <div class="meta">${it.headline||''}</div>
            <div class="desc">${it.desc||''}</div>
            ${it.tips?.length?`<ul class="tips">${it.tips.map(t=>`<li>${t}</li>`).join('')}</ul>`:''}
            <div class="infochips">${(it.chips||[]).map(chipHTML).join('')}</div>
        </section>
    </div>`;
  track.appendChild(slide);

  const d = document.createElement('div');
  d.className = 'dot'+(i===0?' active':'');
  d.addEventListener('click',()=>go(i));
  dots.appendChild(d);

  const tile = document.createElement('button');
  tile.className = 'tile';
  tile.setAttribute('role','listitem');
  tile.innerHTML = `<img src="${it.image}" alt=""><div class="tname">${it.name}</div>`;
  tile.addEventListener('click',()=>{ go(i); toggleAll(false); });
  allGrid.appendChild(tile);
});

const slides = Array.from(track.children);
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
let index = 0, startX = 0, currentX = 0, dragging = false, width = 0;

function clamp(n,min,max){ return Math.max(min, Math.min(n,max)); }
function setTransform(px){ track.style.transform = `translate3d(${px}px,0,0)`; }
function toX(i){ return -i * width; }
function size(){ width = track.clientWidth; go(index, false); }
function go(i, animate=true){
  index = clamp(i, 0, slides.length-1);
  track.classList.toggle('animating', animate);
  setTransform(toX(index));
  updateUI();
  if(animate){ setTimeout(()=>track.classList.remove('animating'), 280); }
}
function updateUI(){
  prevBtn.disabled = (index===0);
  nextBtn.disabled = (index===slides.length-1);
  Array.from(dots.children).forEach((d,di)=>d.classList.toggle('active', di===index));
}
prevBtn.addEventListener('click', ()=>go(index-1));
nextBtn.addEventListener('click', ()=>go(index+1));
window.addEventListener('keydown', (e)=>{
  if(allPanel.classList.contains('open') || infoModal.classList.contains('open')){
    if(e.key==='Escape') { if(allPanel.classList.contains('open')) toggleAll(false); if(infoModal.classList.contains('open')) closeInfo(); }
    return;
  }
  if(e.key==='ArrowLeft') go(index-1);
  if(e.key==='ArrowRight') go(index+1);
});

const THRESH = 80;
const TOUCH_THRESH = 50;
let touchStartX = 0;
let touchStartY = 0;
let touchCurrentX = 0;
let touchCurrentY = 0;
let isTouchSwiping = false;
let touchDirection = null;

track.addEventListener('pointerdown', (e)=>{
  if(allPanel.classList.contains('open') || infoModal.classList.contains('open')) return;
  dragging = true; startX = e.clientX; currentX = startX;
  track.setPointerCapture(e.pointerId);
  track.classList.remove('animating');
});
track.addEventListener('pointermove', (e)=>{
  if(!dragging) return;
  currentX = e.clientX;
  const delta = currentX - startX;
  setTransform(toX(index) + delta);
});
function endDrag(){
  if(!dragging) return;
  dragging = false;
  const delta = currentX - startX;
  if(Math.abs(delta) > THRESH){
    if(delta < 0) go(index+1); else go(index-1);
  }else{
    go(index);
  }
}
track.addEventListener('pointerup', endDrag);
track.addEventListener('pointercancel', endDrag);

// Touch events for mobile swipe
track.addEventListener('touchstart', (e) => {
  if(allPanel.classList.contains('open') || infoModal.classList.contains('open')) return;
  const touch = e.touches[0];
  touchStartX = touch.clientX;
  touchStartY = touch.clientY;
  touchCurrentX = touchStartX;
  touchCurrentY = touchStartY;
  isTouchSwiping = false;
  touchDirection = null;
  track.classList.remove('animating');
}, { passive: true });

track.addEventListener('touchmove', (e) => {
  if(allPanel.classList.contains('open') || infoModal.classList.contains('open')) return;
  const touch = e.touches[0];
  touchCurrentX = touch.clientX;
  touchCurrentY = touch.clientY;
  
  const deltaX = touchCurrentX - touchStartX;
  const deltaY = touchCurrentY - touchStartY;
  
  // Determine swipe direction on first significant move
  if(!touchDirection && (Math.abs(deltaX) > 10 || Math.abs(deltaY) > 10)) {
    touchDirection = Math.abs(deltaX) > Math.abs(deltaY) ? 'horizontal' : 'vertical';
  }
  
  // Only handle horizontal swipes
  if(touchDirection === 'horizontal') {
    isTouchSwiping = true;
    e.preventDefault();
    setTransform(toX(index) + deltaX);
  }
}, { passive: false });

track.addEventListener('touchend', (e) => {
  if(!isTouchSwiping) return;
  
  const deltaX = touchCurrentX - touchStartX;
  
  if(Math.abs(deltaX) > TOUCH_THRESH) {
    if(deltaX < 0) {
      go(index + 1);
    } else {
      go(index - 1);
    }
  } else {
    go(index);
  }
  
  isTouchSwiping = false;
  touchDirection = null;
}, { passive: true });

window.addEventListener('resize', size);

// Parallax Effect with Debouncing
let parallaxRaf = null;
function handleParallax(e) {
  if (parallaxRaf) return;
  
  parallaxRaf = requestAnimationFrame(() => {
    const shapes = document.querySelectorAll('.bg-shape');
    if (shapes.length === 0) {
      parallaxRaf = null;
      return;
    }

    shapes.forEach((shape, index) => {
      const speed = (index + 1) * 20;
      const xOffset = (window.innerWidth / 2 - e.clientX) / speed;
      const yOffset = (window.innerHeight / 2 - e.clientY) / speed;
      const rotate = index === 0 ? -15 : 0;
      
      shape.style.transform = `translate(${xOffset}px, ${yOffset}px) rotate(${rotate}deg)`;
    });
    
    parallaxRaf = null;
  });
}

document.addEventListener('mousemove', handleParallax, { passive: true });

// Handle window resize for parallax
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    // Reset parallax on resize
    document.querySelectorAll('.bg-shape').forEach(shape => {
      shape.style.transform = '';
    });
  }, 250);
}, { passive: true });

// Init
size();

const allPanel = document.getElementById('allPanel');
document.getElementById('btnAll').addEventListener('click', ()=>toggleAll(true));
document.getElementById('closeAll').addEventListener('click', ()=>toggleAll(false));
allPanel.addEventListener('click', (e)=>{ if(e.target===allPanel) toggleAll(false); });
function toggleAll(state){
  allPanel.classList.toggle('open', state);
  allPanel.setAttribute('aria-hidden', String(!state));
}

const infoModal = document.getElementById('infoModal');
const infoTitle = document.getElementById('infoTitle');
const infoBody  = document.getElementById('infoBody');
const infoClose = document.getElementById('infoClose');

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

document.querySelectorAll('.infobtn').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const key = btn.dataset.info;
    const data = INFO[key]; if(!data) return;
    infoTitle.textContent = data.title;
    infoBody.innerHTML = data.html;
    openInfo();
  });
});
function openInfo(){
  infoModal.classList.add('open');
  infoModal.setAttribute('aria-hidden','false');
}
function closeInfo(){
  infoModal.classList.remove('open');
  infoModal.setAttribute('aria-hidden','true');
}
infoClose.addEventListener('click', closeInfo);
infoModal.addEventListener('click', (e)=>{ if(e.target===infoModal) closeInfo(); });

/* ══════════════════════════════════════════════════
   ENHANCEMENTS
   ══════════════════════════════════════════════════ */

// 1. Patch go() to trigger card entrance animation on slide change
const _origGo = go;
go = function(i, animate) {
  if (animate === undefined) animate = true;
  _origGo(i, animate);
  if (animate && slides[index]) {
    const card = slides[index].querySelector('.magic-card');
    if (card) {
      card.classList.remove('card-entering');
      void card.offsetWidth; // force reflow
      card.classList.add('card-entering');
      setTimeout(() => card.classList.remove('card-entering'), 700);
    }
  }
};

// 2. Ripple effect on infobtn and showall clicks
document.querySelectorAll('.infobtn, .showall').forEach(btn => {
  btn.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    ripple.className = 'btn-ripple';
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top  - size / 2;
    ripple.style.cssText = `width:${size}px;height:${size}px;left:${x}px;top:${y}px;position:absolute;`;
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 700);
  });
});

// 3. Custom cursor — pointer devices only
if (window.matchMedia('(pointer: fine)').matches) {
  const cursorDot  = document.createElement('div');
  const cursorRing = document.createElement('div');
  cursorDot.className  = 'cursor-dot';
  cursorRing.className = 'cursor-ring';
  document.body.appendChild(cursorDot);
  document.body.appendChild(cursorRing);

  let mx = window.innerWidth / 2, my = window.innerHeight / 2;
  let rx = mx, ry = my;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    cursorDot.style.left = mx + 'px';
    cursorDot.style.top  = my + 'px';
  }, { passive: true });

  // Ring lags behind with spring easing
  (function ringLoop() {
    rx += (mx - rx) * 0.13;
    ry += (my - ry) * 0.13;
    cursorRing.style.left = rx.toFixed(2) + 'px';
    cursorRing.style.top  = ry.toFixed(2) + 'px';
    requestAnimationFrame(ringLoop);
  })();

  // Expand cursor on interactive elements
  const interactives = 'button, a, .dot, [role="listitem"], .tile, .infobtn';
  document.querySelectorAll(interactives).forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorDot.classList.add('cursor-hover');
      cursorRing.classList.add('cursor-hover');
    }, { passive: true });
    el.addEventListener('mouseleave', () => {
      cursorDot.classList.remove('cursor-hover');
      cursorRing.classList.remove('cursor-hover');
    }, { passive: true });
  });

  // Hide cursor when leaving window
  document.addEventListener('mouseleave', () => {
    cursorDot.style.opacity = '0';
    cursorRing.style.opacity = '0';
  }, { passive: true });
  document.addEventListener('mouseenter', () => {
    cursorDot.style.opacity = '1';
    cursorRing.style.opacity = '1';
  }, { passive: true });
}
