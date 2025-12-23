import { google } from 'googleapis';

function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
}

function getPrivateKey(): string {
  // Railway/Vercel 등에서 private key는 줄바꿈이 \\n 형태로 들어오는 경우가 많음
  return requireEnv('GOOGLE_SHEETS_PRIVATE_KEY').replace(/\\n/g, '\n');
}

export async function appendEventRow(row: (string | number | boolean)[]) {
  const spreadsheetId = requireEnv('GOOGLE_SHEETS_SPREADSHEET_ID');
  const sheetName = process.env.GOOGLE_SHEETS_SHEET_NAME || 'events';

  const clientEmail = requireEnv('GOOGLE_SHEETS_CLIENT_EMAIL');
  const privateKey = getPrivateKey();

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });

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


