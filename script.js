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
  slide.innerHTML = `
    <div class="media"><img src="${it.image}" alt="${it.name}"></div>
    <section>
      <div class="h1">${it.name} <span class="badge">${it.tag}</span></div>
      <div class="meta">${it.headline||''}</div>
      <div class="desc">${it.desc||''}</div>
      ${it.tips?.length?`<ul class="tips">${it.tips.map(t=>`<li>${t}</li>`).join('')}</ul>`:''}
      <div class="infochips">${(it.chips||[]).map(chipHTML).join('')}</div>
    </section>`;
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
window.addEventListener('resize', size);
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