# GlobalHR — 일본 취업용 팀 프로젝트 포트폴리오

> 최종 프로젝트 ZIP(2026-10-16)에서 확인한 구현을 바탕으로 제작한 **정적 소개 웹사이트**입니다.
> 실제 Oracle/JSP 애플리케이션을 GitHub Pages에서 구동하는 것이 아닙니다.

## 1. 구성

- `index.html`: 사이트 진입점 (GitHub Pages 저장소 최상위에 위치)
- `styles.css`: 반응형 디자인 및 레이아웃
- `site.js`: JP/KO 전환, 화면 필터/확대, 기술 탭, 모바일 메뉴
- `assets/screens/*-ja.webp`: 일본어 화면 이미지 12장
- `assets/screens/*-ko.webp`: 한국어 화면 이미지 12장
- `assets/favicon.svg`: 파비콘
- `screen-data.json`: 화면 설명/출처 구분을 위한 참조 데이터

## 2. GitHub Pages 기존 사이트에 반영하는 법

기존 계정: `soo340`
저장소: `https://github.com/soo340/globalhr-portfolio`
공개 주소: `https://soo340.github.io/globalhr-portfolio/`

1. 이 ZIP을 **압축 해제**합니다. ZIP 파일 자체를 저장소에 업로드하지 마세요.
2. 이 폴더 안의 `index.html`, `styles.css`, `site.js`, `assets` 폴더를 저장소 **main 브랜치 최상위(root)**에 반영합니다.
3. 예전 `index.html`은 새 것으로 교체하고, 이전 `style.css`/`app.js`는 더 이상 필요하지 않습니다. `assets/screens` 파일도 새 파일로 바꾸세요.
4. GitHub `Settings → Pages`에서 `Deploy from a branch → main / (root)` 설정을 유지합니다.
5. `Actions` 탭에서 Pages 배포가 성공한 뒤 위 주소를 새로고침합니다. 이전 버전이 보이면 `Ctrl+Shift+R`을 눌러 강력 새로고침합니다.
6. JP/KO 변경 시 모든 화면 이미지가 바뀌는지, 12개 갤러리, 모바일 보기, 화면 확대를 확인합니다.

기존 파일 삭제/교체가 익숙하지 않다면 먼저 기존 저장소를 로컬에 백업하고, GitHub Desktop 또는 Git 명령으로 커밋/푸시하는 것이 안전합니다.

## 3. 기능 근거

- `EmployeeService`, `EmployeeDao`, `EmployeeValidator`: 사원 등록, 갱신, 퇴사 상태 처리, 원자적 감사 이력
- `WorkServlet`, `WorkRepository`, `WorkRules`: 담당자 배정, 업무 일정, 이력 기록, 충돌 감지
- `AuthFilter`, `AccessPolicy`, `AuthSession`, `AuthRepository`: 로그인, RBAC, 세션, CSRF, 비밀번호 해시
- `Csv.cell`, `PageSlice`, `EmployeeService.filter`: CSV 안전 처리, 페이지 분할, 30/60/90일 만료 필터
- `db/01_schema.sql`, `04_audit_history.sql`, `07_auth_rbac.sql`, `09_assignment_dates.sql`: 주요 DB 테이블
- `docs/WORKFLOW_TEAM_MERGE_TEST_REPORT_KO.md`: 합계 393 검증 항목 기록과 테스트 제한 사항

## 4. 정확성 및 보안 고지

- **화면 이미지 24개는 모두 가상 데이터**를 사용합니다. 기존 7쌍은 JSP 테스트 표시, 신규 5쌍은 최신 JSP/Java 소스 기반 UI 재현 화면입니다. 실제 Oracle 운영 서버 접속 화면은 아닙니다.
- 첨부 프로젝트의 로그인/RBAC/워크플로 등은 코드 구현과 로컬 테스트가 확인되었지만, 실제 Oracle Cloud 및 Tomcat 환경에서 종단간 통합 검증을 마쳤다는 증거는 아닙니다.
- 포트폴리오 ZIP에는 원본 Java 소스·DB 접속정보·비밀번호·Wallet을 포함하지 않았습니다.
- 사원 정보, 비자, 계정 이력을 공개할 때 실제 개인정보가 포함되지 않았는지 재확인하세요.
- 페이지 하단 프로젝트 원본 GitHub 링크는 저장소가 Private이면 면접관에게 열리지 않습니다. 공개 전 팀원과 공개 범위 협의 및 비밀정보 검사가 필요합니다.
- 소스코드에 사용 중인 DB 비밀번호가 노출되었을 경우 반드시 자격증명 교체와 Git 이력 정리를 먼저 진행하세요.
- 프로젝트 담당자와 작업 기여도를 본인의 작업에 맞게 추가하려면 사실 확인 후 수정해야 합니다. 이 포트폴리오는 팀 프로젝트로 소개합니다.

## 5. 개인 취업용으로 추가하면 좋은 항목

- 본인이 직접 개발한 기능 2~3개 및 담당 소스 파일
- 겪은 문제, 재현 조건, 해결 코드 및 검증 결과
- 실제 서비스 배포 후 Live Demo 링크 (별도의 Tomcat/Oracle 서버 필요)

---
2026-10-16 · GlobalHR final portfolio · Static HTML/CSS/JS
