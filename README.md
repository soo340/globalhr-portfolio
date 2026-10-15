# GlobalHR | Project Portfolio (최종 브랜치 반영)

## 사용 방법

1. ZIP을 압축 해제한 다음 `index.html`을 브라우저로 엽니다.
2. 오른쪽 상단 **JP / KO** 버튼으로 포트폴리오 설명과 스크린샷 언어를 함께 전환할 수 있습니다.
3. 화면 갤러리에서 직원 목록, 갱신 상세, 대시보드, 만료 알림, 등록 폼, 변경 이력, 설정 화면을 볼 수 있습니다.
4. 이미지를 클릭하면 크게 볼 수 있습니다. 키보드 Esc로 닫고 좌우 방향키로 이동할 수 있습니다.

## GitHub Pages에 배포

1. 개인 GitHub에서 **Public** 저장소 하나를 새로 만듭니다. 예: `globalhr-portfolio`.
2. 압축을 푼 `index.html`, `style.css`, `app.js`, `assets/`, `README.md`를 그대로 저장소 **최상위(root)**에 업로드합니다.
3. `Settings → Pages → Build and deployment → Deploy from a branch → main / (root) → Save`를 선택합니다.
4. 주소 형식은 `https://아이디.github.io/globalhr-portfolio/`입니다. 실제 게시 URL은 GitHub가 표시하는 주소로 확인합니다.
5. 개인 포트폴리오이므로 팀 저장소에 push하거나 팀장의 권한을 얻을 필요는 없습니다.

## 코드 분석 기준과 주의점

- 기준: 전달받은 `foreign-employee-management-fix-project-integration.zip` 내부의 `foreign-employee-management/` 폴더입니다.
- 우선 확인한 코드: `EmployeeService`, `EmployeeDao`, `AuditDao`, `EmployeeValidator`, `Csv`, `I18n`, 주요 JSP, SQL, 테스트 문서입니다.
- 단순한 콘셉트 화면이 아닌, 해당 브랜치의 **JSP를 mock request harness로 렌더링한 HTML**을 Chromium에서 찍은 정적 이미지 14개입니다. 언어별 7개(ja/ko).
- 스크린샷의 직원과 작업 이력은 가상의 테스트 자료입니다. 원본 화면과 동일한 DB 서비스가 실제 인터넷에서 작동한다는 의미는 아닙니다.
- 일본어 스크린샷의 테스트 데이터 문구와 일부 하드코딩된 헤더 표현은 일본어로 정돈했습니다. 실제 JSP의 `i18n/ja.properties`를 활용한 화면입니다.
- 기본 앱의 언어는 ko/ja/en 세 가지이지만, **포트폴리오 사이트의 전환 버튼은 JP/KO** 두 가지입니다.
- 포트폴리오는 정적 사이트입니다. 실제 직원 등록·검색·저장 등을 웹에서 시연하려면 Tomcat + Oracle의 안전한 외부 배포가 별도로 필요합니다.
- DB 실환경 및 Tomcat 통합 테스트는 이 결과물 작성 환경에서 수행하지 않았습니다. 내부 `docs/TEST_REPORT.md`의 264개 검사 항목은 단위/대체 DB/JSP 모의 검사 등을 합산한 수치입니다.
- 멤버별 개인 개발 담당 범위는 제공 자료에서 확인되지 않아 임의로 넣지 않았습니다. 실제 수행한 업무를 검증한 뒤 추가하는 것이 좋습니다.

## 보안 관련 중요 사항

**업로드한 개발 프로젝트 소스의 `src/main/resources/app.properties`에 DB 접속 계정·비밀번호가 평문으로 포함되어 있었습니다.**

- 이 포트폴리오 ZIP에는 원본 개발 프로젝트 또는 해당 설정 파일을 포함하지 않았습니다.
- 실제 비밀번호였다면 해당 DB 계정 자격증명을 **우선 변경(rotate)**하고, 공개 GitHub 코드/히스토리에서 비밀을 제거해야 합니다.
- 민감한 설정은 버전 관리에 넣지 말고 운영환경 변수나 Git에 추적되지 않는 로컬 설정을 사용하세요.
- 포트폴리오에서 링크한 팀 프로젝트 저장소가 Private이면 채용 담당자가 접근할 수 없으므로, 권한이나 공개 전용 저장소를 따로 확인하세요.

## 파일 구성

- `index.html`: 일본어/한국어 전환이 가능한 포트폴리오 본문
- `style.css`: PC·모바일 대응 디자인
- `app.js`: 언어, 화면 갤러리, 확대 모달, 모바일 내비게이션 동작
- `assets/favicon.svg`: 사이트 아이콘
- `assets/screens/*-ja.webp`: 일본어 JSP 렌더링 화면 7개
- `assets/screens/*-ko.webp`: 한국어 JSP 렌더링 화면 7개

## 추가로 입력하면 좋은 항목

- 팀원별 담당 기능과 개발 기간, 본인의 역할
- 실제 Oracle/Tomcat 통합 구동 여부 및 웹사이트 데모 주소
- ERD와 실제 문제 해결 사례(발생 상황, 원인, 해결 결과)
- 민감정보 정리 후 공개 가능한 GitHub 소스코드 링크
