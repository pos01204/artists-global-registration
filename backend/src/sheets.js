import { google } from 'googleapis';

function requireEnv(name) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
}

function getPrivateKey() {
  return requireEnv('GOOGLE_SHEETS_PRIVATE_KEY').replace(/\\n/g, '\n');
}

function getSheetName() {
  return process.env.GOOGLE_SHEETS_SHEET_NAME || 'events';
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

const SNAPSHOT_HEADER = [
  'createdAt',
  'updatedAt',
  'artistName',
  'phoneNumber',
  'hasBusinessNumber',
  'qualificationStatus',
  'categories',
  'interested2026Food',
  'interested2026Digital',
  'step1Completed',
  'step2Completed',
  'step3Completed',
  'quizCompleted',
  'quizScore',
  'learningCompletedAt',
  'registrationClicked',
  'utmSource',
  'utmMedium',
  'utmCampaign',
  'totalTimeMinutes',
];

export async function ensureSnapshotHeader() {
  const { sheets, spreadsheetId } = await getSheets();
  const sheetName = getSheetName();

  const head = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${sheetName}!A1:T1`,
  });

  const row1 = head.data.values?.[0] ?? [];
  if (row1.length === 0) {
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${sheetName}!A1:T1`,
      valueInputOption: 'USER_ENTERED',
      requestBody: { values: [SNAPSHOT_HEADER] },
    });
  }
}

async function findRowIndexByPhone(phoneNumber) {
  const { sheets, spreadsheetId } = await getSheets();
  const sheetName = getSheetName();

  // D열(phoneNumber). 1행은 header로 간주.
  const col = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${sheetName}!D:D`,
  });

  const values = col.data.values ?? [];
  for (let i = 1; i < values.length; i++) {
    const v = values[i]?.[0];
    if (v && String(v).trim() === String(phoneNumber).trim()) {
      return i + 1; // 1-based row index
    }
  }
  return null;
}

async function getCreatedAt(rowIndex) {
  const { sheets, spreadsheetId } = await getSheets();
  const sheetName = getSheetName();
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${sheetName}!A${rowIndex}:A${rowIndex}`,
  });
  return res.data.values?.[0]?.[0] ?? null;
}

export async function upsertOnboardingSnapshot(snapshot, nowIso) {
  await ensureSnapshotHeader();

  const { sheets, spreadsheetId } = await getSheets();
  const sheetName = getSheetName();

  const lp = snapshot.learningProgress;
  const rowIndex = await findRowIndexByPhone(snapshot.phoneNumber);

  const createdAt = rowIndex ? (await getCreatedAt(rowIndex)) || nowIso : nowIso;

  const row = [
    createdAt,
    nowIso,
    snapshot.artistName,
    snapshot.phoneNumber,
    snapshot.hasBusinessNumber ? 'Y' : 'N',
    snapshot.qualificationStatus,
    (snapshot.categories ?? []).join(', '),
    snapshot.interestedIn2026?.food ? 'Y' : 'N',
    snapshot.interestedIn2026?.digital ? 'Y' : 'N',
    lp?.step1Completed ? 'Y' : 'N',
    lp?.step2Completed ? 'Y' : 'N',
    lp?.step3Completed ? 'Y' : 'N',
    lp?.quizCompleted ? 'Y' : 'N',
    lp?.quizScore ?? 0,
    lp?.completedAt ? String(lp.completedAt) : '',
    snapshot.registrationClicked ? 'Y' : 'N',
    snapshot.utmSource ?? '',
    snapshot.utmMedium ?? '',
    snapshot.utmCampaign ?? '',
    lp?.totalTimeMinutes ?? 0,
  ];

  if (rowIndex) {
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${sheetName}!A${rowIndex}:T${rowIndex}`,
      valueInputOption: 'USER_ENTERED',
      requestBody: { values: [row] },
    });
    return { mode: 'updated', rowIndex };
  }

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${sheetName}!A1`,
    valueInputOption: 'USER_ENTERED',
    insertDataOption: 'INSERT_ROWS',
    requestBody: { values: [row] },
  });

  return { mode: 'inserted' };
}

export async function appendEventRow(row) {
  const { sheets, spreadsheetId } = await getSheets();
  const sheetName = getSheetName();

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${sheetName}!A1`,
    valueInputOption: 'USER_ENTERED',
    insertDataOption: 'INSERT_ROWS',
    requestBody: {
      values: [row],
    },
  });
}


