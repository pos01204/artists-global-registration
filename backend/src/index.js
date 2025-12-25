import express from 'express';
import cors from 'cors';
import { z } from 'zod';
import { appendEventRow, checkSheetsAccess, upsertOnboardingSnapshot } from './sheets.js';
import { EventSchema, OnboardingSnapshotSchema } from './types.js';

const app = express();

app.use(cors());
app.use(express.json({ limit: '1mb' }));

app.get('/health', async (_req, res) => {
  const pk = process.env.GOOGLE_SHEETS_PRIVATE_KEY || '';
  
  const env = {
    GOOGLE_SHEETS_SPREADSHEET_ID: Boolean(process.env.GOOGLE_SHEETS_SPREADSHEET_ID),
    GOOGLE_SHEETS_CLIENT_EMAIL: Boolean(process.env.GOOGLE_SHEETS_CLIENT_EMAIL),
    GOOGLE_SHEETS_PRIVATE_KEY: Boolean(pk),
    GOOGLE_SHEETS_MAIN_SHEET: process.env.GOOGLE_SHEETS_MAIN_SHEET || '전체데이터',
    GOOGLE_SHEETS_WAITLIST_SHEET: process.env.GOOGLE_SHEETS_WAITLIST_SHEET || '2026확장대기',
    GOOGLE_SHEETS_NO_BUSINESS_SHEET: process.env.GOOGLE_SHEETS_NO_BUSINESS_SHEET || '사업자미등록',
  };

  // Private Key 형식 진단 정보
  const privateKeyDiag = {
    length: pk.length,
    hasBeginMarker: pk.includes('-----BEGIN'),
    hasEndMarker: pk.includes('-----END'),
    hasEscapedNewline: pk.includes('\\n'),
    startsWithQuote: pk.startsWith('"') || pk.startsWith("'"),
    preview: pk.slice(0, 50) + '...',
  };

  let sheetsAccess = { ok: false, error: 'not checked' };
  if (env.GOOGLE_SHEETS_SPREADSHEET_ID && env.GOOGLE_SHEETS_CLIENT_EMAIL && env.GOOGLE_SHEETS_PRIVATE_KEY) {
    sheetsAccess = await checkSheetsAccess();
  }

  res.json({
    ok: true,
    env,
    privateKeyDiag,
    sheetsAccess,
  });
});

app.post('/v1/events', async (req, res) => {
  try {
    const { eventType, payload } = EventSchema.parse(req.body);
    const now = new Date().toISOString();

    if (eventType === 'onboarding_snapshot') {
      const snap = OnboardingSnapshotSchema.parse(payload);
      
      // 디버깅: 수신된 데이터 로깅
      // eslint-disable-next-line no-console
      console.log('📥 Received snapshot:', {
        artistName: snap.artistName,
        phoneNumber: snap.phoneNumber?.slice(-4), // 마지막 4자리만
        learningProgress: snap.learningProgress,
        registrationClicked: snap.registrationClicked,
      });
      
      await upsertOnboardingSnapshot(snap, now);
      return res.json({ success: true });
    }

    // 기타 이벤트는 append-only로 보관
    await appendEventRow([now, eventType, JSON.stringify(payload ?? null)]);
    return res.json({ success: true });
  } catch (err) {
    if (err instanceof z.ZodError) {
      // eslint-disable-next-line no-console
      console.error('Zod validation error:', err.errors);
      return res.status(400).json({ success: false, message: err.message || 'invalid request' });
    }
    // eslint-disable-next-line no-console
    console.error('server error:', err);
    return res.status(500).json({ success: false, message: err?.message || 'server error' });
  }
});

const port = Number(process.env.PORT || 8080);
app.listen(port, async () => {
  // eslint-disable-next-line no-console
  console.log(`✅ backend listening on :${port}`);
  
  // 시작 시 환경변수 상태 로깅 (디버깅용)
  const pk = process.env.GOOGLE_SHEETS_PRIVATE_KEY || '';
  const pkInfo = {
    length: pk.length,
    hasBegin: pk.includes('-----BEGIN'),
    hasEnd: pk.includes('-----END'),
    hasLiteralBackslashN: pk.includes('\\n'),
    first30: pk.slice(0, 30),
  };
  // eslint-disable-next-line no-console
  console.log('🔑 Private Key Info:', pkInfo);
  
  // 시작 시 Google Sheets 연결 테스트
  try {
    const { checkSheetsAccess } = await import('./sheets.js');
    const result = await checkSheetsAccess();
    // eslint-disable-next-line no-console
    console.log('📊 Sheets Access Test:', result);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('📊 Sheets Access Test Failed:', err.message);
  }
});



