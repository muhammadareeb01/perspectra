import {
  appendLocalPledge,
  createSupportPledge,
  savePledgeToServer,
  type SupportPledge
} from '@/lib/pledges';

export type SupportPledgePayload = {
  name: string;
  amountEur: number;
  source?: string;
};

export function isSupportPledgeStorageConfigured(): boolean {
  return true;
}

/** Saves locally (every visitor sees on Funding page) and to pledges.json + pledges.txt when the API is available. */
export async function recordSupportPledge(payload: SupportPledgePayload): Promise<SupportPledge> {
  const pledge = createSupportPledge(payload.name, payload.amountEur);
  const saved = await savePledgeToServer(pledge);
  const row = saved ?? pledge;
  appendLocalPledge(row);
  return row;
}
