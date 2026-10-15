/* GlobalHR team case study - public site only. No credentials, DB connection, or live app backend. */
(() => {
  'use strict';
  const screens = [
    ['list','社員台帳・検索','직원 목록·검색','氏名・国籍・在留資格・在籍状態で絞り込み、期限の近い順で確認。','이름·국적·재류자격·재직 상태를 검색하고 만료 임박순으로 확인합니다.'],
    ['detail','在留資格・更新詳細','재류자격·갱신 상세','在留情報、5段階の更新状況、書類・メモを一画面に集約。','재류 정보, 5단계 갱신 상태, 서류와 메모를 한 화면에서 관리합니다.'],
    ['workflow','担当者・対応予定一覧','담당자·업무 일정 목록','担当者・次回対応日・未割当・期限超過を業務一覧で把握。','담당자·다음 조치일·미배정·일정 초과를 업무 목록에서 확인합니다.'],
    ['workflow-edit','担当者・更新日程の編集','담당자·갱신 일정 편집','管理者が担当者を指定。担当人事職員は自分の案件の予定を更新。','관리자가 담당자를 지정하고, 담당 인사직원은 본인 업무 일정을 수정합니다.'],
    ['users','ユーザー・権限管理','사용자·권한 관리','ADMINが個人アカウント・役割・有効状態を管理。','ADMIN이 개인 계정·역할·활성 상태를 관리합니다.'],
    ['login','ログイン画面','로그인 화면','個人アカウントで認証。初回パスワード変更とセッション管理に対応。','개인 계정 인증, 최초 비밀번호 변경 및 세션 관리를 지원합니다.'],
    ['alerts','期限アラート','만료 알림','在留期限が近い社員や期限超過の社員を確認。','재류 만료 임박 및 기한 경과 직원을 확인합니다.'],
    ['dashboard','集計ダッシュボード','통계 대시보드','社員情報を状態別に集計し、対応優先度の把握を支援。','직원 현황을 상태별로 집계해 업무 우선순위를 파악합니다.'],
    ['form','社員登録フォーム','직원 등록 폼','必須項目・日付・重複社員番号をサーバー側で検証。','필수값·날짜·중복 사번을 서버에서 검증합니다.'],
    ['audit','社員の変更履歴','직원 변경 이력','誰が何を変更したかを記録。機密番号は生値を保存しない。','누가 무엇을 바꿨는지 기록하며 민감한 번호의 원문은 이력에 남기지 않습니다.'],
    ['security','アカウント操作ログ','계정 작업 로그','ログイン・権限変更・パスワード再発行等の監査記録。','로그인·권한 변경·비밀번호 재발급 등의 작업 이력을 기록합니다.'],
    ['settings','開発環境・接続確認','개발 환경·연결 확인','アプリモードとDBの接続・テーブル状態を確認。','애플리케이션 모드 및 DB 연결·테이블 상태를 확인합니다.']
  ];
  let language='ja',activeScreen=-1;
  const lightbox=document.getElementById('lightbox');
  const lightboxImg=document.getElementById('lightbox-image');
  const filteredKeys=()=>Array.from(document.querySelectorAll('.gallery-card:not([hidden])')).map(n=>n.dataset.screen);
  const screenByKey=(key)=>screens.find(s=>s[0]===key);
  const sourceNote=(key)=>{
    const reconstructed=['workflow','workflow-edit','users','login','security'].includes(key);
    return language==='ja' ? (reconstructed ? 'ソースに基づく再現プレビュー · 架空データ / 実サーバーの撮影ではありません。':'JSPテスト表示 · デモデータ / 本番Oracleの撮影ではありません。') : (reconstructed ? '소스 기반 재현 화면 · 가상 데이터 / 운영 서버 실촬영이 아닙니다.':'JSP 테스트 화면 · 데모 데이터 / 운영 Oracle 서버 실촬영이 아닙니다.');
  };
  function refreshLightbox(){
    const data=screens[activeScreen];if(!data)return;
    const ja=language==='ja';
    lightboxImg.src=`assets/screens/${data[0]}-${language}.webp`;
    lightboxImg.alt=ja?data[1]:data[2];
    document.getElementById('lightbox-title').textContent=ja?data[1]:data[2];
    document.getElementById('lightbox-description').textContent=ja?data[3]:data[4];
    document.getElementById('lightbox-index').textContent=String(activeScreen+1).padStart(2,'0')+' / '+screens.length;
    document.getElementById('lightbox-notice').textContent=sourceNote(data[0]);
  }
  function setLanguage(next){
    if(next!=='ja'&&next!=='ko')return;
    language=next;document.documentElement.lang=next;
    for(const el of document.querySelectorAll('[data-ja][data-ko]'))el.textContent=el.dataset[next];
    for(const img of document.querySelectorAll('.locale-img')){
      img.src=img.dataset['img'+next[0].toUpperCase()+next.slice(1)] || img.getAttribute('data-img-'+next);
      img.alt=img.getAttribute('data-alt-'+next) || img.alt;
    }
    for(const btn of document.querySelectorAll('[data-language]')){
      const isActive=btn.dataset.language===next;
      btn.classList.toggle('active',isActive);btn.setAttribute('aria-pressed',isActive?'true':'false');
    }
    document.title=next==='ja'?'GlobalHR — 外国人社員・在留資格管理':'GlobalHR — 외국인 직원·재류자격 관리';
    try{localStorage.setItem('globalhr_portfolio_lang',next)}catch(e){}
    if(activeScreen>=0)refreshLightbox();
  }
  document.querySelectorAll('[data-language]').forEach(btn=>btn.addEventListener('click',()=>setLanguage(btn.dataset.language)));
  try{const saved=localStorage.getItem('globalhr_portfolio_lang');if(saved==='ko')setLanguage('ko')}catch(e){}
  // filter gallery (stays independent of language)
  function filterGallery(category){
    let count=0;
    document.querySelectorAll('.gallery-card').forEach(item=>{
      const show=category==='all'||item.dataset.category===category;
      item.hidden=!show;if(show)count++;
    });
    document.getElementById('gallery-count').textContent=String(count).padStart(2,'0');
    document.querySelectorAll('.gallery-filter').forEach(item=>{
      const yes=item.dataset.filter===category;item.classList.toggle('selected',yes);item.setAttribute('aria-pressed',yes?'true':'false');
    });
  }
  document.querySelectorAll('.gallery-filter').forEach(btn=>btn.addEventListener('click',()=>filterGallery(btn.dataset.filter)));
  // gallery modal & keyboard navigation
  let lastFocus=null;
  function openScreen(key){
    const idx=screens.findIndex(s=>s[0]===key);if(idx<0)return;
    lastFocus=document.activeElement;
    activeScreen=idx;refreshLightbox();
    lightbox.setAttribute('aria-hidden','false');document.body.classList.add('is-modal-open');
    document.getElementById('lightbox-close').focus();
  }
  function closeScreen(){
    lightbox.setAttribute('aria-hidden','true');document.body.classList.remove('is-modal-open');
    activeScreen=-1;if(lastFocus&&typeof lastFocus.focus==='function')lastFocus.focus();
  }
  function shiftScreen(n){
    const visible=filteredKeys();
    if(!visible.length)return;
    const current=screens[activeScreen]?.[0];let index=visible.indexOf(current);
    index=(index+n+visible.length)%visible.length;
    activeScreen=screens.findIndex(s=>s[0]===visible[index]);refreshLightbox();
  }
  document.querySelectorAll('.gallery-card').forEach(btn=>btn.addEventListener('click',()=>openScreen(btn.dataset.screen)));
  document.getElementById('lightbox-close').addEventListener('click',closeScreen);
  document.getElementById('lightbox-next').addEventListener('click',()=>shiftScreen(1));
  document.getElementById('lightbox-prev').addEventListener('click',()=>shiftScreen(-1));
  lightbox.addEventListener('click',e=>{if(e.target===lightbox)closeScreen()});
  document.addEventListener('keydown',e=>{
    if(activeScreen<0)return;
    if(e.key==='Escape')closeScreen();
    else if(e.key==='ArrowRight')shiftScreen(1);
    else if(e.key==='ArrowLeft')shiftScreen(-1);
    else if(e.key==='Tab'){
      const focusables=Array.from(lightbox.querySelectorAll('button')).filter(x=>!x.disabled);
      if(e.shiftKey&&document.activeElement===focusables[0]){e.preventDefault();focusables.at(-1).focus()}
      else if(!e.shiftKey&&document.activeElement===focusables.at(-1)){e.preventDefault();focusables[0].focus()}
    }
  });
  // Engineering tabbed content
  function selectTech(id){
    document.querySelectorAll('[data-tech-tab]').forEach(btn=>{
      const yes=btn.dataset.techTab===id;btn.classList.toggle('selected',yes);btn.setAttribute('aria-selected',yes?'true':'false');btn.tabIndex=yes?0:-1;
    });
    document.querySelectorAll('.tech-panel').forEach(p=>{const yes=p.id==='panel-'+id;p.hidden=!yes;p.classList.toggle('active',yes)});
  }
  const techButtons=Array.from(document.querySelectorAll('[data-tech-tab]'));
  techButtons.forEach((b,index)=>{
    b.addEventListener('click',()=>selectTech(b.dataset.techTab));
    b.addEventListener('keydown',e=>{
      if(e.key==='ArrowDown'||e.key==='ArrowRight'||e.key==='ArrowUp'||e.key==='ArrowLeft'){
        e.preventDefault();const dir=e.key==='ArrowDown'||e.key==='ArrowRight'?1:-1;
        const next=techButtons[(index+dir+techButtons.length)%techButtons.length];selectTech(next.dataset.techTab);next.focus();
      }
    });
  });
  // mobile menu
  const nav=document.getElementById('site-nav'),toggle=document.getElementById('menu-toggle');
  toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',open?'true':'false')});
  nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');toggle.setAttribute('aria-expanded','false')}));
  // in-page navigation indicator
  if('IntersectionObserver' in window){
    const sectionNodes=document.querySelectorAll('section[id]');
    const obs=new IntersectionObserver(entries=>{
      entries.filter(e=>e.isIntersecting).forEach(e=>{
        nav.querySelectorAll('a').forEach(a=>a.classList.toggle('is-current',a.getAttribute('href')==='#'+e.target.id));
      });
    },{rootMargin:'-18% 0px -67% 0px'});
    sectionNodes.forEach(n=>obs.observe(n));
  }
})();
