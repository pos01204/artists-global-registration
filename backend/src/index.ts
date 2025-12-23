import express from 'express';
import cors from 'cors';
import { z } from 'zod';
import { appendEventRow } from './sheets.js';
import { EventSchema, OnboardingSnapshotSchema } from './types.js';

const app = express();

app.use(cors());
app.use(express.json({ limit: '1mb' }));

app.get('/health', (_req, res) => {
  res.json({ ok: true });
});

/**
 * 이벤트 수집 (Sheets는 아카이빙 용도)
 * - eventType: string
 * - payload: any (권장: onboarding_snapshot)
 */
app.post('/v1/events', async (req, res) => {
  try {
    const { eventType, payload } = EventSchema.parse(req.body);
    const now = new Date().toISOString();

    // onboarding_snapshot은 컬럼화해서 기록 (리포트/필터링 편의)
    if (eventType === 'onboarding_snapshot') {
      const snap = OnboardingSnapshotSchema.parse(payload);
      const lp = snap.learningProgress;

      const row = [
        now,
        eventType,
        snap.artistName,
        snap.phoneNumber,
        snap.hasBusinessNumber ? 'Y' : 'N',
        snap.qualificationStatus,
        (snap.categories ?? []).join(', '),
        snap.interestedIn2026.food ? 'Y' : 'N',
        snap.interestedIn2026.digital ? 'Y' : 'N',
        lp?.step1Completed ? 'Y' : 'N',
        lp?.step2Completed ? 'Y' : 'N',
        lp?.step3Completed ? 'Y' : 'N',
        lp?.quizCompleted ? 'Y' : 'N',
        lp?.quizScore ?? 0,
        snap.registrationClicked ? 'Y' : 'N',
        snap.utmSource ?? '',
        snap.utmMedium ?? '',
        snap.utmCampaign ?? '',
        lp?.completedAt ? String(lp.completedAt) : '',
        lp?.totalTimeMinutes ?? 0,
      ];

      await appendEventRow(row);
      return res.json({ success: true });
    }

    // 그 외 이벤트는 JSON 문자열로 보관 (누락 없이 아카이빙)
    const row = [now, eventType, JSON.stringify(payload ?? null)];
    await appendEventRow(row);
    return res.json({ success: true });
  } catch (err) {
    const message = err instanceof z.ZodError ? err.message : (err as Error)?.message;
    return res.status(400).json({ success: false, message: message || 'invalid request' });
  }
});

const port = Number(process.env.PORT || 8080);
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`✅ backend listening on :${port}`);
});


