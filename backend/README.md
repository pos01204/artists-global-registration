## Railway Backend (Sheets 아카이빙 전용)

### 목적
- **Apps Script의 처리 역할을 Railway 백엔드로 이관**합니다.
- Google Sheets는 **아카이빙(로그)** 역할만 수행합니다.

### 엔드포인트
- `GET /health`
- `POST /v1/events`
  - Body 예시:

```json
{
  "eventType": "onboarding_snapshot",
  "payload": {
    "artistName": "홍길동",
    "phoneNumber": "010-1234-5678",
    "hasBusinessNumber": true,
    "categories": ["accessory"],
    "interestedIn2026": { "food": false, "digital": false },
    "qualificationStatus": "qualified",
    "learningProgress": {
      "step1Completed": true,
      "step2Completed": true,
      "step3Completed": true,
      "quizCompleted": true,
      "quizScore": 4
    },
    "registrationClicked": false
  }
}
```

### Railway 환경변수
- **필수**
  - `GOOGLE_SHEETS_SPREADSHEET_ID`
  - `GOOGLE_SHEETS_CLIENT_EMAIL`
  - `GOOGLE_SHEETS_PRIVATE_KEY` (줄바꿈은 `\\n` 형태로 넣어도 자동 변환)
- **선택**
  - `GOOGLE_SHEETS_SHEET_NAME` (기본값: `events`)

### 배포 팁
- Railway에서 **Root Directory를 `backend/`**로 지정해 배포하세요.
- 스프레드시트는 서비스 계정 이메일에 **편집 권한 공유**가 필요합니다.



