# 사회복지학 연구 아카이브

사회복지학(아동복지·행동과학) 교수의 연구·수업 자료를 모아 보여주고, 대학원생과 연구를 토론하는 웹사이트입니다.

> **현재는 1단계(미리보기)입니다.** Firebase·로그인 없이 동작하며, 토론 글은 새로고침하면 사라집니다.
> 2단계에서 Firebase(무료 Spark 요금제)의 Google 로그인과 Firestore를 연결할 예정입니다.

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

## 2단계 대비 설계
- 화면은 `src/services/`의 함수(`getProjects`, `getPosts`, `addPost`, `addComment` 등)만 호출합니다.
- Firebase 연동 시 `services/` 안의 파일과 `context/AuthContext.tsx`만 교체하면 됩니다.
- 사용할 변수 이름은 `.env.example`에 있습니다. 실제 값은 `.env`에 적고 GitHub에는 올리지 않습니다.
