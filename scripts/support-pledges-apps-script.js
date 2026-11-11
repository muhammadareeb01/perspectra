/**
 * Google Sheet — support pledges (name + EUR amount)
 *
 * Setup:
 * 1. Create a Google Sheet (File → New → Google Sheets).
 * 2. Extensions → Apps Script, paste this file, save.
 * 3. Deploy → New deployment → Type: Web app.
 *    Execute as: Me | Who has access: Anyone
 * 4. Copy the Web app URL into .env.local:
 *    NEXT_PUBLIC_SUPPORT_SHEET_URL=<that URL>
 * 5. For GitHub Pages: add repo secret SUPPORT_SHEET_WEB_APP_URL with the same URL.
 */
const SHEET_NAME = 'Pledges';

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    const sheet = ensureSheet_();
    const ts = new Date();
    sheet.appendRow([
      ts,
      String(body.name || '').trim(),
      Number(body.amount) || '',
      body.currency || 'EUR',
      body.source || '',
      body.submittedAt || ts.toISOString()
    ]);
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

function doGet() {
  return ContentService.createTextOutput('Perspectra support pledge endpoint is running.');
}

function ensureSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(['Logged at', 'Name', 'Amount', 'Currency', 'Source', 'Submitted at (UTC)']);
    sheet.getRange(1, 1, 1, 6).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
