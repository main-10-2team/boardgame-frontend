# Externship Project

## 📖 프로젝트 소개

> 보드게임 입문자부터 마니아까지, 이용자의 취향과 상황에 맞는 보드게임을 손쉽게 추천받을 수 있는 **보드게임 추천 플랫폼**입니다.
> 단순한 게임 정보 나열이 아닌, **검색 → 추천 → 리뷰 → 소통**으로 이어지는 흐름을 제공하며, 사용자 경험을 극대화하는 것을 목표로 합니다.

## ⭐️ 주요목표

> 1. **맞춤형 추천**: 인원 수, 플레이 시간, 난이도, 장르를 고려한 개인화된 추천 시스템 구축
> 2. **실사용 데이터 기반**: 리뷰, 평점, 좋아요 데이터를 활용하여 신뢰도 높은 게임 추천 제공
> 3. **실무 협업 경험**: API 연동, 공통 컴포넌트 설계, 배포 및 린트/포매터 환경 세팅을 통해 실제 서비스 개발과 유사한 경험 추구

## 🔗 배포 링크

[> ### https://oz-team2.kro.kr/](https://boardque.vercel.app/)

## 🖥️ 서비스 소개

- 보드게임 필터 및 검색 기능
- 개인화 추천 시스템
- 리뷰 및 평점 등록
- 좋아요/북마크 기능
- 마이페이지에서 내가 작성한 리뷰/좋아요 게임 관리

> (영상 넣을 자리)

## 🛠️ 사용 기술 스택 (Tech Stack)

#### 프론트엔드

<img src="https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white">
<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=React&logoColor=61DAFB">
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white">

#### 상태 관리

<img src="https://img.shields.io/badge/Zustand-000000?style=for-the-badge&logo=Zustand&logoColor=white">

#### 폼 관리

<img src="https://img.shields.io/badge/TanStack%20Query-FF4154?style=for-the-badge&logo=ReactQuery&logoColor=white">

#### 스타일링

<img src="https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=for-the-badge&logo=TailwindCSS&logoColor=white">
<img src="https://img.shields.io/badge/clsx-000000?style=for-the-badge">
<img src="https://img.shields.io/badge/tailwind--merge-06B6D4?style=for-the-badge">

#### 배포

<img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=Vercel&logoColor=white">

#### 기타

<img src="https://img.shields.io/badge/swiper-66ccff.svg?&logo=swiper&logoColor=fff">

## 💪🏻 팀 구성 및 역할

## 🖤 팀장: 김하연

> 프로젝트 관리 & 기술 전반 가이드

### UI 구현 및 API 연동

- 마이페이지 담당
- 랭킹페이지 담당
- 오늘뭐하지(보드픽) 추천 서비스
- 공통컴포넌트 - 레이아웃, 헤더, 푸터, 모달

### 문서 작성

- 플로우차트, 화면 정의서

## 🤍 팀원: 지정민

> 질문/답변 등록 및 수정

### UI 구현 및 API 연

- 게임리스트, 상세
- 리뷰 등록, 수정, 삭제 기능
- 검색 기능
- 메인페이지 등 UI
- 공통 컴포넌트 개발

### 문서 작성

- Figma 와이어프레임/디자인

## 🤍 팀원: 윤강혁

> 인증 및 계정 관련 기능

### UI 구현 및 API 연동

- 사용자 인증로직 구현
- 로그인, 회원가입
- 아이디, 비밀번호 찾기
- 초기 취향 설문조사

### 문서 작성

- 플로우차트, 화면 정의서

## ✅ Commit Convention (커밋 메시지 규칙)

```markdown
- **형식**: `이모지 + 타입 + 메시지 (#이슈번호)`
- **예시**: `✨ feat: 로그인 API 연동 (#23)`
- **허용된 타입 목록**

| 이모지 | 타입     | 설명                |
| ------ | -------- | ------------------- |
| ✨     | feat     | 새로운 기능         |
| 🐛     | fix      | 버그 수정           |
| ♻️     | refactor | 리팩토링            |
| ✅     | test     | 테스트 코드         |
| 💡     | chore    | 기타 작업 (빌드 등) |
| 📝     | docs     | 문서 작성 및 수정   |
| 🚚     | build    | 빌드 관련 작업      |
| 🚑     | hotfix   | 긴급 수정           |

> 커밋 메시지는 [Husky](https://typicode.github.io/husky) + 커스텀 훅으로 검사되며, 형식이 맞지 않으면 커밋이 차단됩니다.
```

## 🗂️ Issue 템플릿 규칙

- GitHub 이슈 생성 시 템플릿에 따라 작성해야 합니다.
- 포함 항목:

```markdown
## Description

## To-do

- [ ] 항목 1
- [ ] 항목 2

## References

- 참고 링크 또는 자료

## 기타

- 유의 사항

## 🔧 관련 이슈

- 이 PR은 다음 이슈와 관련 있습니다: `#123`

## 🔄 변경 사항

- [ ] 기능 추가
- [ ] 버그 수정
- [ ] 리팩토링
- [ ] 문서화
- [ ] 스타일 수정
- [ ] 테스트 코드 작성
- [ ] 기타 (환경설정, 의존성 업데이트 등)

## ✔️ 변경 사항 상세 설명

- 변경된 파일:
- 주요 구현/수정 내용:

## 📸 스크린샷 (UI 변경 시 필수)

<!-- 예시: ![스크린샷](링크) -->

## 📝 문서화

- [ ] 관련 문서가 업데이트되었습니다.

## 🔍 리뷰어에게 요청 사항 (선택)

<!-- 예: 에러 핸들링 방식 괜찮을지 확인 부탁드립니다. -->

## ⚠️ 기타 주의 사항

<!-- 예: 이 PR은 hotfix이므로 빠른 병합이 필요합니다. -->
```

## 🔃 Pull Request (PR) 템플릿 규칙

```markdown
## 🔧 관련 이슈

- 이 PR은 다음 이슈와 관련 있습니다: `#123`

## 🔄 변경 사항

- [ ] 기능 추가
- [ ] 버그 수정
- [ ] 리팩토링
- [ ] 문서화
- [ ] 스타일 수정
- [ ] 테스트 코드 작성
- [ ] 기타 (환경설정, 의존성 업데이트 등)

## ✔️ 변경 사항 상세 설명

- 변경된 파일:
- 주요 구현/수정 내용:

## 📸 스크린샷 (UI 변경 시 필수)

<!-- 예시: ![스크린샷](링크) -->

## 📝 문서화

- [ ] 관련 문서가 업데이트되었습니다.

## 🔍 리뷰어에게 요청 사항 (선택)

<!-- 예: 에러 핸들링 방식 괜찮을지 확인 부탁드립니다. -->

## ⚠️ 기타 주의 사항

<!-- 예: 이 PR은 hotfix이므로 빠른 병합이 필요합니다. -->
```
