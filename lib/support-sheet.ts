export type SupportPledgePayload = {
  name: string;
  amountEur: number;
  source?: string;
};

export function isSupportSheetConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPPORT_SHEET_URL?.trim();
  return Boolean(url);
}

/** Append a pledge row via Google Apps Script web app (static-site friendly). */
export async function recordSupportPledge(payload: SupportPledgePayload): Promise<boolean> {
  const url = process.env.NEXT_PUBLIC_SUPPORT_SHEET_URL?.trim();
  if (!url) return false;

  const body = JSON.stringify({
    name: payload.name.trim(),
    amount: payload.amountEur,
    currency: 'EUR',
    source: payload.source ?? 'perspectra-site',
    submittedAt: new Date().toISOString()
  });

  try {
    // Apps Script web apps: no-cors still delivers the POST; we do not rely on reading the response.
    await fetch(url, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body
    });
    return true;
  } catch {
    return false;
  }
}
