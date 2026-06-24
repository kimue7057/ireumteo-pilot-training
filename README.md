# 이룸터 AX 플랫폼 리뉴얼 상태 메모

문서 업데이트 기준: 2026-06-24

이 저장소는 기존의 `Invest AX` 단일 랜딩 페이지에서, 이룸터 전체를 소개하는 **AX 교육·컨설팅 플랫폼 구조**로 전환 중입니다.  
기존 Invest AX 콘텐츠와 신청 시스템은 삭제하지 않고, 프로그램 상세 페이지와 재사용 가능한 신청 플로우로 재배치했습니다.

## 1. 현재 구조 요약

- 메인 홈 `/`
  - 이룸터 AX 플랫폼 소개
  - 문제 정의, 적용 방식, 적용 분야, 모집 프로그램, 후기, 기업교육 CTA
- 프로그램 목록 `/programs`
  - 전체 / 모집중 / 모집예정 / 기업교육 필터
- 프로그램 상세
  - `/programs/invest-ai-seminar`
  - `/programs/invest-ax-course`
- 기업교육 페이지 `/business`
- 후기 및 현장 스토리 `/reviews`
- 문의 페이지 `/contact`

## 2. 라우팅 방식

- 브라우저/배포 환경
  - History API 기반 라우팅
  - `vercel.json`에 페이지 경로용 rewrite 추가
- 로컬 `file://` 열기 환경
  - hash route fallback 사용
  - 예: `#/programs`, `#/business`

즉, **정적 구조를 유지하면서도 페이지 단위 탐색이 가능한 형태**로 구성되어 있습니다.

## 3. 핵심 파일

```text
.
├─ api/
│  └─ apply.js                     # 재사용 가능한 신청/문의 API
├─ assets/                         # 이미지/영상 자산
├─ docs/
│  └─ vercel-migration.md          # 기존 운영 문서 (보존)
├─ src/
│  ├─ components/
│  │  ├─ applyModal.js             # 프로그램 공용 신청 모달
│  │  ├─ sections.js               # 라우트별 페이지 렌더링
│  │  └─ shared.js                 # 헤더/푸터/공용 버튼/링크
│  ├─ data/
│  │  ├─ programs.js               # 프로그램 목록/상세 데이터
│  │  └─ siteContent.js            # 홈/후기/문의/기업교육 공용 콘텐츠
│  ├─ lib/
│  │  ├─ analytics.js              # GA 이벤트 훅
│  │  ├─ applyForm.js              # 신청 폼 상태/검증/페이로드 생성
│  │  └─ router.js                 # History/hash 하이브리드 라우터
│  └─ app.js                       # 앱 마운트/라우팅/모달 초기화
├─ styles/
│  ├─ platform.css                 # 멀티 페이지 플랫폼 UI 스타일
│  └─ apply-modal.css              # 신청 모달 스타일
├─ supabase/
│  ├─ applications.sql             # 기존 applications 테이블 생성 SQL
│  └─ add-program-fields.sql       # program 메타데이터용 추가 migration
├─ index.html
├─ script.js
└─ vercel.json
```

## 4. 프로그램 데이터 관리

- 프로그램 카드/상세 데이터는 `src/data/programs.js`로 분리했습니다.
- 홈/후기/기업교육/문의 공용 문구는 `src/data/siteContent.js`에 둡니다.
- Invest AX 기존 커리큘럼, FAQ, 결과물 설명은 `programs.js`의 `invest-ax-course` 상세 데이터로 이동했습니다.

## 5. 신청 모달 동작 방식

기존 단일 신청 모달을 **programId 기반 공용 모달**로 확장했습니다.

전달 가능한 주요 필드:

- `programId`
- `programTitle`
- `programType`
- `sourcePage`

예시:

- `invest-ai-seminar`
- `invest-ax-course`
- `ai-workflow-course`
- `business-consulting`
- `general-contact`

동작 원리:

- 페이지 버튼은 프로그램 문맥을 `data-*` 속성으로 모달에 전달
- 모달은 문맥에 따라 제목/설명/CTA 라벨을 변경
- 투자 관련 프로그램만 `investmentLevel` 입력을 요구
- API 요청에는 기존 필드와 함께 프로그램 메타데이터를 선택적으로 전달

## 6. `/api/apply` 호환성 메모

기존 기능은 유지합니다.

- Supabase 저장
- 중복 신청 방지
- Resend 관리자/신청자 메일
- Google Sheets 선택 연동

추가/변경된 점:

- `programId`, `programTitle`, `programType`, `sourcePage` 선택적 수신
- 동일 이메일이라도 **다른 프로그램이면 접수 가능**하도록 확장
- 단, Supabase migration이 아직 적용되지 않은 경우:
  - API는 자동으로 **레거시 email-only 방식**으로 폴백
  - 이 경우 프로그램별 중복 허용은 적용되지 않고 기존처럼 이메일 기준 중복으로 동작

즉, **마이그레이션 전에도 API는 깨지지 않도록 구현**되어 있습니다.

## 7. Supabase migration

기존 초기 스키마:

- `supabase/applications.sql`

이번 리뉴얼 추가 migration:

- `supabase/add-program-fields.sql`

추가 컬럼:

- `program_id`
- `program_title`
- `program_type`
- `source_page`

추가 index 정책:

- 기존 `applications_email_unique_idx` 제거
- `coalesce(program_id, 'legacy-general') + lower(email)` 기준 unique index 생성

권장 실행 순서:

1. 아직 테이블이 없다면 `supabase/applications.sql`
2. 이미 운영 중이라면 추가로 `supabase/add-program-fields.sql`

## 8. 환경변수

기존 환경변수명은 그대로 유지합니다.

```env
RESEND_API_KEY=
ADMIN_EMAIL=contact@eruty.co.kr
FROM_EMAIL=이룸터 <noreply@erumter.com>
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
GOOGLE_SHEETS_SPREADSHEET_ID=
GOOGLE_SHEETS_SHEET_NAME=applications
GOOGLE_SERVICE_ACCOUNT_EMAIL=
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY=
```

추가 환경변수는 없습니다.

## 9. 로컬 확인 방법

정적 화면만 확인:

- `index.html`을 브라우저에서 직접 열기
- 이 경우 hash route fallback 사용

배포와 유사하게 확인:

```bash
vercel dev
```

확인 포인트:

- `/`, `/programs`, `/programs/invest-ai-seminar`, `/programs/invest-ax-course`, `/business`, `/reviews`, `/contact`
- 프로그램 필터 동작
- 신청 버튼이 프로그램별 모달 문맥으로 열리는지
- 기존 Invest AX 과정 버튼도 여전히 모달을 여는지
- `/api/apply`가 기존 필드와 신규 프로그램 필드를 함께 처리하는지

## 10. 참고 문서

- `docs/vercel-migration.md`
- `supabase/applications.sql`
- `supabase/add-program-fields.sql`

## 11. 현재 상태 메모

코드 기준으로는:

- 단일 랜딩 -> AX 플랫폼 구조 전환 반영
- 프로그램 데이터 분리 반영
- 공용 신청 모달 반영
- 프로그램 메타데이터를 받는 API 반영
- Vercel rewrite 반영

운영에서 추가로 확인할 것:

1. `supabase/add-program-fields.sql` 실제 적용 여부
2. Resend 발신 도메인 검증 여부
3. Google Sheets 시트 헤더가 확장 컬럼에 맞는지
4. `vercel dev` 또는 실배포 환경에서 라우트 rewrite가 정상인지
5. 동일 이메일로 다른 프로그램 신청 시 기대대로 접수되는지
