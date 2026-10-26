import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
const source=readFileSync('index.html','utf8');
const CSS=`
[hidden]{display:none!important}
body{background:#f2f5fb}
.site-head{background:#213369;color:#fff;box-shadow:0 2px 12px rgba(21,42,90,.14)}
.site-head .brand strong,.site-head .brand .eyebrow,.site-head .identity,.site-head .save-status{color:#fff!important}
.site-head .brand-mark{background:#3f57a2}
.site-head .save-status .dot{background:#3cdf8e}
.site-head .outline{background:#293f7a;color:#fff;border-color:#7890ce}
.layout{grid-template-columns:288px minmax(0,1fr)}
.sidebar{background:#fff;padding:12px 8px}
.sidebar .sidetitle{font-size:14px;font-weight:900;color:#2f4788;padding:12px 14px}
.lesson-group{border:1px solid #dae2f4;border-radius:10px;overflow:hidden;margin:5px 0 12px;background:#fff}
.lesson-group>summary{padding:12px 13px;background:#eaf0ff;font-weight:800;color:#2a4385;cursor:pointer;list-style:none;line-height:1.45}
.lesson-group>summary::-webkit-details-marker{display:none}
.lesson-group>summary:before{content:'▾';display:inline-block;margin-right:8px}
.lesson-group:not([open])>summary:before{content:'▸'}
.slide-list{padding:5px 0}
.sidebar button.slide-link{border:0;background:#fff;color:#35466a;padding:8px 11px;display:flex;align-items:flex-start;gap:9px;width:100%;text-align:left;font-size:12px;line-height:1.52;border-radius:0}
.sidebar button.slide-link:hover{background:#f0f3ff;color:#1f449b}
.sidebar button.slide-link.active{background:#e3eaff;border-left:4px solid #4b66db;padding-left:7px;color:#25459d;font-weight:800}
.slide-num{min-width:21px;color:#6c7b9e;font-variant-numeric:tabular-nums;flex-shrink:0}
.slide-label{flex:1;min-width:0;overflow-wrap:anywhere}
.slide-activity{font-size:10px;background:#e4f7ec;color:#198554;border-radius:99px;padding:1px 6px;white-space:nowrap}
.main{padding:0 clamp(15px,3vw,43px) 86px}
.main-tabs{position:sticky;top:78px;z-index:12;background:#f2f5fb}
.lesson-grid{display:flex;flex-direction:column;gap:18px;max-width:1120px;margin:0 auto}
.slides-card,.activity-card{width:100%;flex:none}
.activity-card{max-height:none;padding:23px 29px}
.slide-stage{background:#eaf0ff;min-height:0}
.slide-stage img{width:100%;height:auto;aspect-ratio:16/9;object-fit:contain;max-height:none}
.slide-controls{justify-content:space-between}
.slide-controls input{max-width:650px}
.activity-header{border-bottom:1px solid #e0e6f6;padding-bottom:10px}
.activity-card .form-elements{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));column-gap:18px;align-items:start}
.activity-card .form-elements>p,.activity-card .form-elements>h4,.activity-card .form-elements .wide{grid-column:1/-1}
.activity-card .field textarea{min-height:116px}
#notes-box{max-height:none}
#view-lesson .topbar{max-width:1120px;margin:0 auto}
#slide-title{font-size:22px}
@media(max-width:1200px){.layout{grid-template-columns:265px minmax(0,1fr)}.lesson-grid{display:flex}}
@media(max-width:800px){.layout{display:block}.sidebar{height:auto;max-height:340px;position:relative;top:auto}.site-head{height:auto;padding:11px 13px}.main-tabs{top:0}.lesson-grid{display:flex}.activity-card .form-elements{display:block}}
`;
const JS=`
const originalRenderNavigation=renderNavigation;
renderNavigation=function(){
  originalRenderNavigation();
  $('lessons').innerHTML=LESSONS.map((s,i)=>{
    const links=Array.from({length:s.to-s.from+1},(_,idx)=>{
      const n=s.from+idx;
      const title=(slideData[n-1]?.title||('슬라이드 '+n)).slice(0,72);
      return '<button type="button" class="slide-link" data-slide="'+n+'" title="'+esc(title)+'"><span class="slide-num">'+n+'</span><span class="slide-label">'+esc(title)+'</span>'+(SLIDE_STAGE[n]?'<span class="slide-activity">활동</span>':'')+'</button>';
    }).join('');
    return '<details class="lesson-group" open><summary>'+(i+1)+'차시 · '+esc(s.title.split(' · ').slice(1).join(' · '))+' <small>('+s.from+'~'+s.to+'장)</small></summary><div class="slide-list">'+links+'</div></details>';
  }).join('');
  $('lessons').querySelectorAll('[data-slide]').forEach(b=>b.addEventListener('click',()=>{setView('lesson');goToSlide(+b.dataset.slide)}));
};
const originalGoToSlide=goToSlide;
goToSlide=function(n){
  originalGoToSlide(n);
  document.querySelector('.activity-card').hidden=!SLIDE_STAGE[currentSlide];
  document.querySelectorAll('.sidebar .slide-link').forEach(b=>b.classList.toggle('active',+b.dataset.slide===currentSlide));
};
`;
if(!source.includes('</style>')||!source.includes('initEvents();loadSlideData();'))throw Error('Unexpected source format');
let result=source.replace('</style>',CSS+'</style>');
result=result.replace('initEvents();loadSlideData();',JS+'\ninitEvents();loadSlideData();');
if((result.match(/data:image\/webp;base64/g)||[]).length!==75)throw Error('Slide count mismatch');
mkdirSync('dist',{recursive:true});
writeFileSync('dist/index.html',result,'utf8');
console.log('Login and 75-slide navigation repaired',Buffer.byteLength(result));
