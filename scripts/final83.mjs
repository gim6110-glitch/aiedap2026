import {readFileSync,writeFileSync} from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
let html=readFileSync('dist/index.html','utf8');
function loc(n,next){let key='const '+n+'=',i=html.indexOf(key),j=html.indexOf(';\n'+next,i);if(i<0||j<0)throw Error('Cannot find '+n);return {key,i,j,raw:html.slice(i+key.length,j)}}
function read(n,next){return vm.runInNewContext('('+loc(n,next).raw+')')}
function put(n,next,value){let x=loc(n,next);html=html.slice(0,x.i)+x.key+JSON.stringify(value)+html.slice(x.j)}
const oldData=read('EMBEDDED_SLIDE_DATA','const SLIDE_IMAGES=');
const oldImg=read('SLIDE_IMAGES','const LESSONS=');
assert.equal(oldData.length,75);
const pairs=[[1,1],[2,2],[5,8],[6,9],[7,10],[8,11],[9,12],[10,13],[11,14],[12,15],[13,16],[14,17],[15,19],[16,20],[17,21],[18,23],[19,24],[20,25],[21,26],[22,27],[23,28],[24,29],[25,30],[26,31],[27,32],[28,33],[29,34],[30,36],[31,35],[32,37],[33,38],[34,39],[35,40],[36,41],[37,42],[38,43],[39,44],[40,46],[41,47],[42,45],[43,48],[44,49],[45,50],[46,51],[47,52],[48,53],[49,54],[50,55],[51,56],[52,57],[53,58],[54,59],[55,60],[56,61],[57,63],[58,62],[59,64],[60,65],[61,66],[62,67],[63,68],[64,69],[65,74],[66,77],[67,78],[68,70],[69,71],[70,72],[71,79],[72,80],[73,81],[74,82],[75,83]];
const back=Object.fromEntries(pairs.map(x=>[x[1],x[0]]));
const forward=Object.fromEntries(pairs);
const titles={
3:'AI 시대의 평가',4:'AI안경을 넘어 AI렌즈까지',5:'AI가 함께 수행하는 시대, 학생의 무엇을 평가할까?',6:'우리동네 스타트업 10',7:'AI 프로젝트 작품 사례',
18:'성취기준에 AI를 연결한 학생 수행(7분)',19:'스프레드시트 0단계: 성취기준과 학생 수행(10분)',
22:'기존 수업·AI 활용·AI 융합수업 비교',34:'나의 수업 체크리스트(5분)',35:'모듈1 성찰 돌아보기',36:'스프레드시트 1단계: 수업 유형 판단(6분)',37:'스프레드시트 2단계: 나의 수업 돌아보기(6분)',
43:'워밍업 퀴즈: 패들렛 Q1·Q2',45:'AI 코드 수정 수업 6렌즈 평가 예시',46:'스프레드시트 3단계: 6렌즈 자기평가(16분)',47:'스프레드시트 4단계: 강점·보완점 선정(6분)',
57:'AIEDAP 사례 2개 찾아보기(8분)',60:'바꿀 부분만 적기(10분)',62:'AIEDAP 내 수업 re-design(20분)',63:'6개 렌즈로 재구성안 최종 점검(6분)',
70:'발표 1장: 기존 수업',71:'발표 2장: 연수를 통해 수정한 부분',72:'발표 3장: 최종 재설계 수업',73:'인포그래픽 만들기',74:'동료 피드백 관점',75:'동료 피드백 예시',76:'발표 4분·피드백 2분',78:'모둠 우수사례 선정'
};
const notes={
6:'고등학생의 공공데이터·수학·AI 융합 창업 프로젝트',
7:'AI Safety Bus / AI Fire Detection / AI 개발 PT 서비스 / 스마트 AI 키오스크',
18:'기존 성취기준은 유지합니다.\nAI가 제안한 분석 방법을 탐구 질문과 데이터 특성에 비춰 검토합니다.\n자신의 방법과 비교하여 선택 이유를 설명합니다.\n평가 증거: 방법 선택 이유 · 실제 적용 · 해석 · 판단',
19:'지식·이해: 데이터 특성·통계·그래프의 의미\n과정·기능: 변수·분석 방법 선정·검증·시각화\n가치·태도: 출처 확인·과장 없는 해석·판단의 책임',
22:'기존: Python 직접 작성과 분석\nAI 활용: AI 도움으로 코드 작성·분석·제작\nAI 융합: 교과 지식을 근거로 데이터 선택·결과 해석·결론 판단',
43:'Q1: 평가 관점 / Q2: 윤리적 관점 / 패들렛 입력',
57:'AIEDAP 사이트에서 같은 유형을 포함하여 2개 수업 사례를 참고합니다.',
73:'PPT 3장으로 BEFORE → CHANGE → AFTER 인포그래픽 1장을 만드는 선택 활동',
76:'발표 4분·피드백 2분. 교과 정합성, AI 융합 실질성, 수행 증거, 책임성·환류 중 강점을 발견합니다.'
};
function placeholder(title,text){
 const esc=t=>String(t).replace(/&/g,'&amp;').replace(/</g,'&lt;');
 const lines=String(text||'최종 교안에서 새로 추가된 내용입니다.').split('\n').slice(0,6);
 const label=lines.map((v,i)=>'<text x="62" y="'+(165+i*50)+'" fill="#234" font-size="24" font-family="sans-serif">• '+esc(v.slice(0,55))+'</text>').join('');
 const svg='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 540"><rect width="960" height="540" fill="#b8d4f0"/><rect x="30" y="30" width="900" height="475" fill="white"/><rect x="30" y="30" width="900" height="14" fill="#14518b"/><text x="60" y="108" fill="#12345c" font-family="sans-serif" font-size="34" font-weight="bold">'+esc(title.slice(0,42))+'</text>'+label+'<text x="60" y="479" font-size="15" fill="#789">요약 화면 · 원본 PDF 선택 시 실제 슬라이드 표시</text></svg>';
 return 'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg);
}
const slides=Array.from({length:83},(_,i)=>{const n=i+1,p=back[n],d=p?oldData[p-1]:null,t=titles[n]||(d?d.title:'최종 교안 슬라이드 '+n);return {n,title:t,text:notes[n]||(d?d.text:t),notes:d?d.notes:''}});
const pictures=[null,...slides.map(x=>back[x.n]?oldImg[back[x.n]]:placeholder(x.title,x.text))];
put('EMBEDDED_SLIDE_DATA','const SLIDE_IMAGES=',slides);
put('SLIDE_IMAGES','const LESSONS=',pictures);
put('LESSONS','const STAGES=',[{from:1,to:27,title:'1차시 · 성취기준 기반 평가'},{from:28,to:47,title:'2차시 · 6개 렌즈로 자기진단'},{from:48,to:63,title:'3차시 · 실제 지도안 재설계'},{from:64,to:83,title:'4차시 · 공유·발표·확산'}]);
const stages=read('STAGES','const CHECKS='),s=Object.fromEntries(stages.map(x=>[x.id,x]));
s.s0.title='성취기준 분석 및 AI와 연결한 학생 수행';s.s0.slides=[17,18,19];s.s0.help='기존 성취기준을 유지하고 AI와 연결한 학생 수행을 작성합니다 (7분+10분).';
s.s0.fields.push(['aiStudentAction','AI를 결합한 학생 수행','textarea','AI와 교과 지식을 연결한 학생의 실제 선택·수행·판단'],['aiEvidence','AI 융합 학생 수행 증거','textarea','선택 근거·검증·적용 결과·해석']);
s.s11.n='체크';s.s11.title='AI 활용·융합 체크리스트 12문항';s.s11.slides=[34];s.s11.help='해당 장면과 근거를 함께 적습니다 (5분).';
s.s2.n='1단계';s.s2.title='학생 핵심 수행에 따른 수업 유형 판단';s.s2.slides=[36,57];s.s2.help='정보과 네 유형은 참고이며 다른 교과는 교과 성취기준과 핵심 수행을 기준으로 합니다 (6분).';
s.s2.fields[0][3]+='|기타(교과 중심)';s.s2.fields.push(['subjectPerformance','타 교과 핵심 수행 (선택)','textarea','예: 설계→제작→검증'],['secondReference','AIEDAP 참고 사례 2 (선택)','textarea','사례명과 참고할 점']);
s.s1.n='2단계';s.s1.title='유지할 강점·보완할 점·더하고 싶은 점';s.s1.slides=[35,37,38];s.s1.help='모듈1 성찰을 다시 쓰지 않고 강점·보완점·재설계 질문을 확인합니다 (6분).';
s.s3.n='3단계';s.s3.title='6개 렌즈 자기평가';s.s3.slides=[39,40,41,42,43,44,45,46,47];s.s3.help='실제 수업 근거를 바탕으로 6개 렌즈를 평가합니다 (16분).';
s.s3.fields.unshift(['quiz1','워밍업 Q1 (선택)','select','교육적 관점|평가 관점|기술적 관점|실행 관점'],['quiz2','워밍업 Q2 (선택)','select','학습자 관점|윤리적 관점|기술적 관점|교육적 관점']);
s.s4.n='4단계';s.s4.title='AI 융합수업 re-design과 최종 점검';s.s4.slides=[59,60,61,62,63];s.s4.help='Before/After 10분 → AIEDAP 실제 수정 20분 → 6개 렌즈 최종 점검 6분.';
s.s5.n='대조표';s.s5.title='지도안 수정 전후 비교';s.s5.slides=[60,61,71];
s.s6.n='발표';s.s6.title='발표 3장·인포그래픽·적용 계획';s.s6.slides=[69,70,71,72,73];s.s6.help='연수 전 수업 → 수정한 내용과 이유 → 최종 수업. 발표는 4분, 인포그래픽은 선택입니다.';
s.s6.fields.push(['infographic','인포그래픽 계획 (선택)','textarea','BEFORE → CHANGE → AFTER'],['padletUrl','패들렛 발표자료 공유 주소 (선택)','text','링크']);
const feedback={id:'s7',n:'피드백',title:'동료 피드백·우수 사례·확산',slides:[74,75,76,77,78,79,80,81],help:'발표 4분·피드백 2분. 강점 중심으로 4가지 관점 중 하나를 선택합니다.',fields:[
['feedbackLens','댓글 관점 (선택)','select','교과 정합성|AI 융합 실질성|수행 증거|책임성·환류'],['feedbackStrength','인상적인 변화 (선택)','textarea','관찰한 강점'],['feedbackLearning','학생의 배움에 도움이 되는 이유 (선택)','textarea','근거'],['feedbackIdea','함께 생각해 볼 아이디어 (선택)','textarea','부족한 점을 지적하지 않아도 됩니다'],['groupChoice','모둠 대표 사례 (선택)','text','수업명'],['groupWhy','대표 사례 선정 이유 (선택)','textarea','학생 수행과 평가 근거'],['peerApplication','내 수업에 적용할 아이디어 (선택)','textarea','한 가지 실천'],['shareUrl','수업 공유 링크 (선택)','text','패들렛·AIEDAP 링크']]};
put('STAGES','const CHECKS=',[s.s0,s.s11,s.s2,s.s1,s.s3,s.s4,s.s5,s.s6,feedback]);
const steps=read('TYPE_STEPS','const LENSES=');
steps['기타(교과 중심)']=['교과 성취기준과 학생 수행','AI 연계 핵심 학습활동','학생의 판단과 문제해결','평가 증거와 개선'];
put('TYPE_STEPS','const LENSES=',steps);
put('GUIDE_LINKS','const SLIDE_STAGE=',[['성취기준·AI 연결',18,'s0'],['0단계',19,'s0'],['12문항',34,'s11'],['1단계',36,'s2'],['2단계',37,'s1'],['워밍업',43,'s3'],['3단계',46,'s3'],['강점·보완점',47,'s3'],['사례 탐색',57,'s2'],['수정 전후',60,'s5'],['AIEDAP 재설계',62,'s4'],['최종 점검',63,'s4'],['발표',70,'s6'],['인포그래픽',73,'s6'],['동료 피드백',76,'s7']]);
put('SLIDE_STAGE','function sectionEntries',{17:'s0',18:'s0',19:'s0',34:'s11',35:'s1',36:'s2',37:'s1',38:'s1',43:'s3',44:'s3',45:'s3',46:'s3',47:'s3',57:'s2',60:'s5',61:'s5',62:'s4',63:'s4',69:'s6',70:'s6',71:'s6',72:'s6',73:'s6',74:'s7',75:'s7',76:'s7',78:'s7',80:'s7'});
html=html.replaceAll('Math.min(75,','Math.min(83,').replaceAll('currentSlide===75','currentSlide===83').replaceAll('75장','83장');
html=html.replaceAll(String.fromCharCode(36)+'{currentSlide} / 75',String.fromCharCode(36)+'{currentSlide} / 83');
html=html.replace('id="slide-range" type="range" min="1" max="75"','id="slide-range" type="range" min="1" max="83"');
html=html.replace('id="slide-count" class="pill">1 / 75','id="slide-count" class="pill">1 / 83');
html=html.replace('state.answers??={};state.profile=profile;currentSlide=','state.answers??={};if((state.version||1)<2){let map='+JSON.stringify(forward)+';state.slide=map[state.slide]||state.slide;state.version=2;}state.profile=profile;currentSlide=');
html=html.replace('<button class="outline" id="toggle-notes"','<label for="course-pdf" class="outline pdf-import">최종 PDF 연결</label><input id="course-pdf" type="file" accept="application/pdf,.pdf" hidden><span id="pdf-status">선택 가능</span><button class="outline" id="toggle-notes"');
html=html.replace('<div class="slide-stage"><img id="slide-img"','<div class="slide-stage"><iframe id="pdf-frame" title="최종 PDF 해당 페이지" hidden></iframe><img id="slide-img"');
html=html.replace('</style>','.pdf-import{display:inline-flex;align-items:center;cursor:pointer;font-size:12px;padding:9px}#pdf-status{font-size:11px;color:#667}#pdf-frame{width:100%;height:min(65vw,680px);border:0;background:white}#pdf-frame[hidden]{display:none!important}@media(max-width:800px){#pdf-frame{height:68vh}#pdf-status{display:none}}</style>');
html=html.replaceAll('15·29·30·32·40·55·57·69·70번째 슬라이드','18·19·34·36·37·43·46·60·62·70·76번째 슬라이드');
const extra=[
"let finalPdfUrl='';",
"function showPdfPage(){const f=document.getElementById('pdf-frame'),i=document.getElementById('slide-img');if(!finalPdfUrl){f.hidden=true;return;}f.hidden=false;i.style.display='none';f.src=finalPdfUrl+'#page='+currentSlide+'&view=FitH';}",
"const baseGo=goToSlide;goToSlide=function(n){baseGo(n);showPdfPage();};",
"async function restorePdf(){try{let s=await dbAction('read','course-final-v83');if(s&&s.bytes){finalPdfUrl=URL.createObjectURL(new Blob([s.bytes],{type:'application/pdf'}));document.getElementById('pdf-status').textContent='최종본 연결';showPdfPage();return;}let r=await fetch('/course-final.pdf',{method:'HEAD',cache:'no-store'});if(r.ok&&/pdf/i.test(r.headers.get('content-type')||'')){finalPdfUrl='/course-final.pdf';document.getElementById('pdf-status').textContent='83쪽 원본';showPdfPage();}}catch(e){}}",
"document.getElementById('course-pdf').addEventListener('change',async e=>{let f=e.target.files&&e.target.files[0];if(!f)return;if(!f.name.toLowerCase().endsWith('.pdf')||f.size>45e6){toast('45MB 이하 PDF를 선택해 주세요.');return;}try{let bytes=await f.arrayBuffer();await dbAction('put',{id:'course-final-v83',name:f.name,mime:'application/pdf',bytes});finalPdfUrl=URL.createObjectURL(new Blob([bytes],{type:'application/pdf'}));document.getElementById('pdf-status').textContent='최종본 연결';showPdfPage();toast('최종 PDF를 이 브라우저에 저장했습니다.');}catch(err){toast('PDF 연결 오류: '+err.message);}});",
"const oldStart=startProfile;startProfile=function(name,school){oldStart(name,school);if(profile)restorePdf();};"
].join('\n');
html=html.replace('initEvents();loadSlideData();',extra+'\ninitEvents();loadSlideData();');
assert(html.includes('course-final-v83'));assert(html.includes('max="83"'));assert.equal(slides.length,83);
writeFileSync('dist/index.html',html,'utf8');
console.log('Final module4: 83 pages, 9 steps, migrated legacy browser state, '+Buffer.byteLength(html)+' bytes');
