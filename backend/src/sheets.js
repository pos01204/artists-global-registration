import { google } from 'googleapis';

function requireEnv(name) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
}

function getPrivateKey() {
  return requireEnv('GOOGLE_SHEETS_PRIVATE_KEY').replace(/\\n/g, '\n');
}

function sheetNames() {
  return {
    MAIN: process.env.GOOGLE_SHEETS_MAIN_SHEET || '전체데이터',
    WAITLIST_2026: process.env.GOOGLE_SHEETS_WAITLIST_SHEET || '2026확장대기',
    NO_BUSINESS: process.env.GOOGLE_SHEETS_NO_BUSINESS_SHEET || '사업자미등록',
  };
}

async function getSheets() {
  const auth = new google.auth.JWT({
    email: requireEnv('GOOGLE_SHEETS_CLIENT_EMAIL'),
    key: getPrivateKey(),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });
  return { sheets, spreadsheetId: requireEnv('GOOGLE_SHEETS_SPREADSHEET_ID') };
}

const HEADERS = {
  MAIN: [
    '타임스탬프', '작가명', '연락처', '사업자보유', '카테고리',
    '자격상태', '식품관심', '디지털관심', 'STEP1완료', 'STEP2완료',
    'STEP3완료', '퀴즈완료', '퀴즈점수', '등록클릭', 'UTM_SOURCE',
    'UTM_MEDIUM', 'UTM_CAMPAIGN',
  ],
  WAITLIST_2026: ['타임스탬프', '작가명', '연락처', '관심카테고리', '비고'],
  NO_BUSINESS: ['타임스탬프', '작가명', '연락처', '관심카테고리'],
};

async function ensureHeader(sheetName, headers) {
  const { sheets, spreadsheetId } = await getSheets();
  const head = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${sheetName}!A1:Z1`,
  });
  const row1 = head.data.values?.[0] ?? [];
  if (row1.length === 0) {
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${sheetName}!A1`,
      valueInputOption: 'USER_ENTERED',
      requestBody: { values: [headers] },
    });
  }
}

async function findRowIndexByPhone(sheetName, phoneNumber, columnLetter) {
  const { sheets, spreadsheetId } = await getSheets();
  const col = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${sheetName}!${columnLetter}:${columnLetter}`,
  });

  const values = col.data.values ?? [];
  const target = normalizePhone(phoneNumber);
  for (let i = 1; i < values.length; i++) {
    const v = values[i]?.[0];
    if (v && normalizePhone(v) === target) {
      return i + 1; // 1-based row index
    }
  }
  return null;
}

async function getCell(sheetName, a1) {
  const { sheets, spreadsheetId } = await getSheets();
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${sheetName}!${a1}`,
  });
  return res.data.values?.[0]?.[0] ?? null;
}

function boolToYN(v) {
  return v ? 'Y' : 'N';
}

function normalizePhone(raw) {
  if (!raw) return '';
  let digits = String(raw).replace(/[^\d]/g, '');
  // 구글시트가 숫자 형식으로 저장하면 선행 0이 사라지는 케이스 보정
  // 예: 01012345678 -> 1012345678
  if (digits.length === 10 && digits.startsWith('10')) {
    digits = `0${digits}`;
  }
  return digits;
}

function formatPhoneForSheet(raw) {
  const digits = normalizePhone(raw);
  if (!digits) return '';
  const pretty =
    digits.length === 11 ? `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}` : digits;
  // 텍스트로 강제 저장(숫자 변환/선행0 제거 방지)
  return `'${pretty}`;
}

function normalizeSnapshot(snapshot) {
  const interestedFood =
    snapshot.interestedIn2026?.food ?? snapshot.interested2026Food ?? false;
  const interestedDigital =
    snapshot.interestedIn2026?.digital ?? snapshot.interested2026Digital ?? false;

  const lp = snapshot.learningProgress || {};
  const step1Completed = lp.step1Completed ?? snapshot.step1Completed ?? false;
  const step2Completed = lp.step2Completed ?? snapshot.step2Completed ?? false;
  const step3Completed = lp.step3Completed ?? snapshot.step3Completed ?? false;
  const quizCompleted = lp.quizCompleted ?? snapshot.quizCompleted ?? false;
  const quizScore = lp.quizScore ?? snapshot.quizScore ?? 0;

  return {
    interestedFood,
    interestedDigital,
    step1Completed,
    step2Completed,
    step3Completed,
    quizCompleted,
    quizScore,
  };
}

async function upsertRow(sheetName, headers, phoneNumber, phoneColumnLetter, rowValues, nowIso) {
  await ensureHeader(sheetName, headers);

  const { sheets, spreadsheetId } = await getSheets();
  const rowIndex = await findRowIndexByPhone(sheetName, phoneNumber, phoneColumnLetter);

  // A열(타임스탬프)은 최초 값 유지
  const existingTimestamp = rowIndex ? await getCell(sheetName, `A${rowIndex}:A${rowIndex}`) : null;
  const timestamp = existingTimestamp || nowIso;

  const finalRow = [timestamp, ...rowValues];

  if (rowIndex) {
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${sheetName}!A${rowIndex}`,
      valueInputOption: 'RAW',
      requestBody: { values: [finalRow] },
    });
    return { mode: 'updated', rowIndex };
  }

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${sheetName}!A1`,
    valueInputOption: 'RAW',
    insertDataOption: 'INSERT_ROWS',
    requestBody: { values: [finalRow] },
  });
  return { mode: 'inserted' };
}

export async function upsertOnboardingSnapshot(snapshot, nowIso) {
  const names = sheetNames();
  const n = normalizeSnapshot(snapshot);

  // MAIN (전체데이터) - 연락처는 C열
  await upsertRow(
    names.MAIN,
    HEADERS.MAIN,
    snapshot.phoneNumber,
    'C',
    [
      snapshot.artistName || '',
      formatPhoneForSheet(snapshot.phoneNumber),
      boolToYN(snapshot.hasBusinessNumber),
      (snapshot.categories ?? []).join(', '),
      snapshot.qualificationStatus || '',
      boolToYN(n.interestedFood),
      boolToYN(n.interestedDigital),
      boolToYN(n.step1Completed),
      boolToYN(n.step2Completed),
      boolToYN(n.step3Completed),
      boolToYN(n.quizCompleted),
      Number(n.quizScore) || 0,
      boolToYN(snapshot.registrationClicked),
      snapshot.utmSource || '',
      snapshot.utmMedium || '',
      snapshot.utmCampaign || '',
    ],
    nowIso
  );

  // NO_BUSINESS (사업자미등록)
  if (snapshot.qualificationStatus === 'no_business') {
    await upsertRow(
      names.NO_BUSINESS,
      HEADERS.NO_BUSINESS,
      snapshot.phoneNumber,
      'C',
      [
        snapshot.artistName || '',
        formatPhoneForSheet(snapshot.phoneNumber),
        (snapshot.categories ?? []).join(', '),
      ],
      nowIso
    );
  }

  // WAITLIST_2026 (2026확장대기)
  if (n.interestedFood || n.interestedDigital) {
    const interests = [];
    if (n.interestedFood) interests.push('식품');
    if (n.interestedDigital) interests.push('디지털작품');

    await upsertRow(
      names.WAITLIST_2026,
      HEADERS.WAITLIST_2026,
      snapshot.phoneNumber,
      'C',
      [
        snapshot.artistName || '',
        formatPhoneForSheet(snapshot.phoneNumber),
        interests.join(', '),
        '2026년 확장 시 연락 예정',
      ],
      nowIso
    );
  }
}

export async function appendEventRow(row) {
  const { sheets, spreadsheetId } = await getSheets();
  const sheetName = process.env.GOOGLE_SHEETS_EVENTS_SHEET || 'events';

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${sheetName}!A1`,
    valueInputOption: 'RAW',
    insertDataOption: 'INSERT_ROWS',
    requestBody: {
      values: [row],
    },
  });
}


