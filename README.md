# 사회복지학 연구 아카이브

사회복지학(아동복지·행동과학) 교수의 연구·수업 자료를 모아 보여주고, 대학원생과 연구를 토론하는 웹사이트입니다.

> 코드는 Firebase(무료 Spark 요금제)의 Google 로그인과 Firestore 연동까지 준비되어 있습니다.
> **Firebase 설정값(환경변수)이 없으면 자동으로 "미리보기" 모드**(샘플 데이터, 새로고침 시 초기화)로 동작하고,
> 설정값을 넣으면 실제 로그인·저장 모드로 바뀝니다.

## 로컬에서 실행하기
```bash
npm install
npm run dev
```
터미널에 나오는 주소(보통 http://localhost:5173)를 브라우저에서 엽니다.

## 빌드와 배포
- 빌드 명령: `npm run build`
- 배포 폴더: `dist`
- `public/_redirects` 파일이 새로고침 시 404 오류를 막아 줍니다.

## 폴더 구조
```
src/
  pages/       화면(홈, 연구, 수업, 토론, 글 상세, 소개)
  components/  작은 화면 조각(헤더, 카드, 폼 등)
  services/    데이터를 가져오는 함수 모음 ← 2단계에서 여기만 교체
  data/        샘플 데이터 ← 내용을 바꾸는 곳
  types/       데이터 모양 정의
  context/     로그인 상태(AuthContext, 지금은 비로그인 껍데기)
public/        _redirects, 아이콘
```

## 내 연구 내용을 바꾸려면 (src/data 폴더)
| 바꾸고 싶은 내용 | 수정할 파일 |
|---|---|
| 연구 프로젝트 | `src/data/researchData.ts` |
| 수업·주차별 자료 | `src/data/teachingData.ts` |
| 소개(학력·경력·연락처·한 줄 소개) | `src/data/aboutData.ts` |
| 토론 샘플 글·주제 | `src/data/discussionData.ts` |

따옴표 안의 글자만 바꾸면 됩니다. 논문·자료는 파일 업로드가 아니라 **링크**(Google Drive 등)로 연결합니다.

## Firebase 연결하기 (무료 Spark 요금제)
1. https://console.firebase.google.com 에서 프로젝트를 만들고(요금제는 Spark 그대로), **웹 앱**을 추가해 설정값을 받습니다.
2. **Authentication → 로그인 방법 → Google**을 사용 설정합니다. 승인된 도메인에 Netlify 주소를 추가합니다.
3. **Firestore Database**를 만듭니다(프로덕션 모드). **규칙** 탭에 이 저장소의 `firestore.rules` 내용을 붙여넣고 게시합니다.
4. 설정값을 넣습니다.
   - 내 컴퓨터: `.env.example`을 복사해 `.env`를 만들고 값을 채웁니다(`.env`는 GitHub에 올라가지 않습니다).
   - Netlify: **Site configuration → Environment variables**에 같은 이름(`VITE_FIREBASE_...` 6개)으로 입력하고 다시 배포합니다.
5. 사이트에서 Google 로그인을 한 번 합니다. Firestore에 `users/내UID` 문서가 생깁니다.
6. **관리자 지정:** Firebase 콘솔 → Firestore → `users` → 내 문서에서 `allowed`를 `true`, `role`을 `admin`으로 바꿉니다.
7. **대학원생 승인:** 대학원생이 로그인하면 `users`에 문서가 생깁니다. `allowed`를 `true`로 바꿔 주면 토론에 참여할 수 있습니다.

### 권한 규칙
- 사이트 전체가 비공개입니다. 로그인하고 교수님이 승인(allowed: true)한 사용자만 볼 수 있습니다. (검색엔진 노출도 막아 두었습니다)
- 토론은 **로그인 + 교수님 승인(allowed: true)** 한 사용자만 읽고 쓸 수 있습니다.
- 글·댓글 삭제는 작성자 또는 관리자만 가능합니다(글 작성자는 자기 글의 댓글도 삭제 가능).
- 파일 업로드(Storage), Cloud Functions는 사용하지 않습니다. 논문·자료는 링크로 연결합니다.

## 구조 설명
- 화면은 `src/services/`의 함수만 호출합니다. 데이터 출처(Firestore/샘플)는 서비스 파일 안에서만 결정됩니다.
- 로그인 상태는 `src/context/AuthContext.tsx`, Firebase 초기화는 `src/firebase.ts`에 있습니다.
