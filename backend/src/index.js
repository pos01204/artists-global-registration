import express from 'express';
import cors from 'cors';
import { z } from 'zod';
import { appendEventRow, upsertOnboardingSnapshot } from './sheets.js';
import { EventSchema, OnboardingSnapshotSchema } from './types.js';

const app = express();

app.use(cors());
app.use(express.json({ limit: '1mb' }));

app.get('/health', (_req, res) => {
  res.json({ ok: true });
});

app.post('/v1/events', async (req, res) => {
  try {
    const { eventType, payload } = EventSchema.parse(req.body);
    const now = new Date().toISOString();

    if (eventType === 'onboarding_snapshot') {
      const snap = OnboardingSnapshotSchema.parse(payload);
      await upsertOnboardingSnapshot(snap, now);
      return res.json({ success: true });
    }

    // 기타 이벤트는 append-only로 보관
    await appendEventRow([now, eventType, JSON.stringify(payload ?? null)]);
    return res.json({ success: true });
  } catch (err) {
    const message = err instanceof z.ZodError ? err.message : err?.message;
    return res.status(400).json({ success: false, message: message || 'invalid request' });
  }
});

const port = Number(process.env.PORT || 8080);
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`✅ backend listening on :${port}`);
});


