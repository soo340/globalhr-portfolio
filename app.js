'use strict';
const screens = [
 {key:'list',path:'/index.jsp',title:{ja:'外国人社員・在留管理台帳',ko:'외국인 직원 재류관리 대장'},desc:{ja:'実際の日付から期限状態を集計。30/60/90日フィルター、社員検索、10/20/50件の表示切替、CSV出力。',ko:'실제 날짜에서 만료 상태를 계산합니다. 30/60/90일 필터, 직원 검색, 10/20/50건 표시, CSV 내보내기.'},tags:{ja:['社員一覧','期限分類','検索 / CSV'],ko:['직원 목록','만료 분류','검색 / CSV']}},
 {key:'detail',path:'/visaDetail.jsp',title:{ja:'在留更新・詳細情報',ko:'재류 갱신·상세 정보'},desc:{ja:'社員の基本情報、在留期限、更新ステップ、書類チェック6項目、担当者メモをまとめた画面。',ko:'직원 기본 정보, 재류 만료일, 갱신 단계, 6개 서류 체크리스트와 담당자 메모를 보여줍니다.'},tags:{ja:['更新進捗','書類管理','メモ'],ko:['갱신 진행','서류 관리','메모']}},
 {key:'dashboard',path:'/dashboard.jsp',title:{ja:'集計ダッシュボード',ko:'통계 대시보드'},desc:{ja:'在留期限別の件数、国籍別の分布、対応優先社員をサービス層で集計した結果。',ko:'체류 만료 상태별 인원, 국적별 분포, 우선 대응 대상자를 서비스 계층에서 집계한 결과입니다.'},tags:{ja:['集計','国籍分布','優先度'],ko:['통계','국적 분포','우선순위']}},
 {key:'alerts',path:'/alerts.jsp',title:{ja:'期限アラート一覧',ko:'만료 기한 알림'},desc:{ja:'期限切れ・期限間近など、対応が必要な在職社員を重点的に確認できます。',ko:'기한 경과·만료 임박 등 조치가 필요한 재직 직원을 우선 확인합니다.'},tags:{ja:['期限切れ','通知対象','絞り込み'],ko:['만료 경과','알림 대상','필터']}},
 {key:'form',path:'/employeeForm.jsp',title:{ja:'社員登録フォーム',ko:'직원 등록 폼'},desc:{ja:'社員情報、在留資格、発給日・満了日を入力。サーバー側で必須項目・日付などを検証します。',ko:'직원 정보·재류자격·발급일·만료일을 입력하며 서버에서 필수값 및 날짜 등을 검증합니다.'},tags:{ja:['登録・更新','バリデーション'],ko:['등록·수정','입력 검증']}},
 {key:'audit',path:'/audit.jsp',title:{ja:'変更履歴 / 監査ログ',ko:'변경 이력 / 감사 로그'},desc:{ja:'変更日時、担当者、対象社員、項目、変更前後の内容を検索・確認します。',ko:'변경 시각·담당자·대상 직원·항목·변경 전후 내용을 검색하고 확인합니다.'},tags:{ja:['変更履歴','担当者','検索'],ko:['변경 이력','담당자','검색']}},
 {key:'settings',path:'/settings.jsp',title:{ja:'実行環境・設定の確認',ko:'실행 환경·설정 확인'},desc:{ja:'現在のモードとバージョン、接続状態を確認する開発用ページです。接続情報の秘匿にも配慮。',ko:'현재 모드·버전·연결 상태를 확인하는 개발용 페이지입니다. 접속정보 비표시를 고려했습니다.'},tags:{ja:['Demo / Oracle','バージョン'],ko:['Demo / Oracle','버전 확인']}}
];
const state={lang:'ja',screen:0};
const $=(s)=>document.querySelector(s);
function url(key){return 'assets/screens/'+key+'-'+state.lang+'.webp';}
function renderGallery(){const d=screens[state.screen];
 const img=$('#gallery-image'),light=$('#lightbox-image');img.src=url(d.key);light.src=url(d.key);
 img.alt=d.title[state.lang];light.alt=d.title[state.lang];
 $('#gallery-path').textContent=d.path;$('#gallery-title').textContent=d.title[state.lang];$('#gallery-desc').textContent=d.desc[state.lang];
 $('#gallery-number').textContent='SCREEN '+String(state.screen+1).padStart(2,'0')+' / 07';
 $('#gallery-tags').replaceChildren(...d.tags[state.lang].map(s=>{const e=document.createElement('span');e.textContent=s;return e;}));
 document.querySelectorAll('.gallery-tab').forEach((tab,i)=>{const on=i===state.screen;tab.classList.toggle('is-active',on);tab.setAttribute('aria-selected',String(on));tab.tabIndex=on?0:-1;});
}
function setLang(lang){if(!['ja','ko'].includes(lang))return;state.lang=lang;document.documentElement.lang=lang;
 document.querySelectorAll('[data-ja][data-ko]').forEach(e=>{e.textContent=e.getAttribute('data-'+lang);});
 document.querySelectorAll('[data-shot]').forEach(img=>{img.src=url(img.dataset.shot);img.alt=lang==='ja'?'GlobalHR '+img.dataset.shot+'画面（日本語のJSPテストレンダリング）':'GlobalHR '+img.dataset.shot+' 화면(한국어 JSP 테스트 렌더링)';});
 document.querySelectorAll('.lang').forEach(b=>{const active=b.dataset.lang===lang;b.classList.toggle('is-active',active);b.setAttribute('aria-pressed',String(active));});
 renderGallery();
}
function showScreen(n){state.screen=(n+screens.length)%screens.length;renderGallery();}
document.querySelectorAll('.lang').forEach(b=>b.addEventListener('click',()=>setLang(b.dataset.lang)));
document.querySelectorAll('.gallery-tab').forEach(b=>b.addEventListener('click',()=>showScreen(Number(b.dataset.screen))));
$('#prev-screen').addEventListener('click',()=>showScreen(state.screen-1));$('#next-screen').addEventListener('click',()=>showScreen(state.screen+1));
const dialog=$('#lightbox'),close=$('#close-lightbox');let prior=null;
$('#open-image').addEventListener('click',()=>{prior=document.activeElement;dialog.hidden=false;document.body.style.overflow='hidden';close.focus();});
function hide(){if(dialog.hidden)return;dialog.hidden=true;document.body.style.overflow='';prior?.focus();}
close.addEventListener('click',hide);dialog.addEventListener('click',e=>{if(e.target===dialog)hide();});
document.addEventListener('keydown',e=>{if(!dialog.hidden&&e.key==='Escape')hide();else if(!dialog.hidden&&['ArrowLeft','ArrowRight'].includes(e.key))showScreen(state.screen+(e.key==='ArrowRight'?1:-1));});
const toggle=$('#menu-toggle'),nav=$('#main-nav');
toggle.addEventListener('click',()=>{const visible=nav.classList.toggle('is-open');toggle.setAttribute('aria-expanded',String(visible));toggle.setAttribute('aria-label',visible?'Close menu':'Open menu');});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('is-open');toggle.setAttribute('aria-expanded','false');}));
if('IntersectionObserver' in window){const links=nav.querySelectorAll('a');const observer=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting)links.forEach(a=>a.classList.toggle('is-active',a.getAttribute('href')==='#'+e.target.id));});},{rootMargin:'-25% 0px -60% 0px'});document.querySelectorAll('main section[id]').forEach(s=>observer.observe(s));}
renderGallery();
